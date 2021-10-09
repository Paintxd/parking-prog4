import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const session = context.switchToHttp().getRequest().session;

    if (!session?.user) {
      this.logger.warn(
        `Request received on guarded route with no user on session: ${JSON.stringify(
          session,
        )}`,
      );
      return false;
    }

    if (
      new Date().getTime() - new Date(session.createAt).getTime() >
      parseInt(process.env.SESSION_MAXAGE)
    ) {
      this.logger.warn(
        `Request received on guarded route with expired session: ${JSON.stringify(
          session,
        )}`,
      );
      session.destroy();
      return false;
    }

    session.touch();
    return true;
  }
}
