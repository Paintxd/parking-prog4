import { Session, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  private logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger();
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getSessionUser(@Session() session: Record<string, any>,) {
    const user = session.user;
    this.logger.log(`Buscando usuario da sessao - id - ${user.id}`);

    return this.userService.getUserById(user.id);
  }

  @Post('/register')
  async registerUser(@Body() userDto: UserDto) {
    this.logger.log(
      `Registering user - userDto: ${JSON.stringify(userDto)}`,
      'UserController - registerUser',
    );
    return this.userService.registerUser(userDto);
  }
}
