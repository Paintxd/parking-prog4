import { Controller, Get, Render, Session, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthFilter } from './filters/auth.filter';

@Controller('')
export class ViewsController {
  constructor(private readonly userService: UserService) {}

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
    const { id } = session.user;
    const user = await this.userService.getUserById(id);

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
