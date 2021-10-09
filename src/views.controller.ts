import { Controller, Get, Render } from '@nestjs/common';

@Controller('')
export class ViewsController {
  @Render('index')
  @Get('/')
  test() {
    return {};
  }
}
