import { Controller, Get, Logger, Render, Session, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../auth/auth.guard';
import { ParkService } from '../parks/park.service';
import { AuthFilter } from './filters/auth.filter';

@Controller('')
export class ViewsController {
  constructor(
    private readonly userService: UserService,
    private readonly parkService: ParkService,
  ) {}

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
    const { id, document } = session.user;
    const [user, parks] = await Promise.all([
      this.userService.getUserById(id),
      this.parkService.userParkedVehicles(document),
    ]);

    return {
      user,
      parks,
    };
  }

  @Render('usuario')
  @Get('/register')
  register() {
    return {};
  }
}
