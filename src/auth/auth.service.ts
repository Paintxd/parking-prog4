import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { LoginDto } from './login.dto';
import { LoginPayload } from './interfaces/loginPayload';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger();
  }

  async validateUser(loginDto: LoginDto): Promise<LoginPayload> {
    this.logger.log(
      `Begging user validation - ${JSON.stringify(loginDto)}`,
      'AuthService - validateUser',
    );

    const user = await this.userService.getUserByLogin(loginDto.login);

    this.logger.log('Comparing password - hash', 'AuthService - validateUser');

    const passwordCompare = await this.userService.comparePassword(
      user.password,
      loginDto.password,
    );

    if (user && passwordCompare) {
      return { name: user.name, email: user.email, id: user['_id'] };
    }

    this.logger.error(
      'Authentication failed',
      null,
      'AuthService - validateUser',
    );
    throw new UnauthorizedException();
  }

  async login(
    user: LoginPayload,
    session: Record<string, any>,
  ): Promise<LoginPayload> {
    session.user = user;
    session.createdAt = new Date(Date.now());

    this.logger.log(
      `Finished login - user: ${JSON.stringify(session.user)}`,
      'AuthService - login',
    );

    return user;
  }
}
