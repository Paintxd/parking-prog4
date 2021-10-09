import {
  Body,
  Controller,
  Logger,
  Post,
  Redirect,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  private logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger();
  }

  @Post('/login')
  @Redirect('/home')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    this.logger.log(
      `Beginning user authentication - ${JSON.stringify(loginDto.login)}`,
      'AuthController - login',
    );
    const user = await this.authService.validateUser(loginDto);

    return this.authService.login(user, session);
  }

  @Post('/logout')
  @Redirect('/')
  async logout(@Session() session: Record<string, any>) {
    session.destroy();
    return;
  }
}
