import {
  Controller,
  Get,
  Logger,
  Render,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthFilter } from './filters/auth.filter';

@Controller('')
export class ViewsController {
  private logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger();
  }

  @Render('index')
  @Get('/')
  test() {
    return {};
  }

  @Render('home')
  @Get('/home')
  @UseGuards(AuthGuard)
  @UseFilters(AuthFilter)
  async home(@Session() session: Record<string, any>) {
    const user = await this.userService.getUserById(session.user.id);
    return {
      user,
    };
  }

  @Render('usuario')
  @Get('/register')
  register() {
    return {};
  }
}
