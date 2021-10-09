import {
  Controller,
  Get,
  Render,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthFilter } from './filters/auth.filter';

@Controller('')
export class ViewsController {
  @Render('index')
  @Get('/')
  test() {
    return {};
  }

  @Render('home')
  @Get('/home')
  @UseGuards(AuthGuard)
  @UseFilters(AuthFilter)
  home(@Session() session: Record<string, any>) {
    return {
      user: session.user,
    };
  }
}
