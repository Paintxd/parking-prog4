import { Body, Controller, Delete, Get, Logger, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AddTimeDto } from './dtos/add-time.dto';
import { RemoveParkDto } from './dtos/remove-park.dto';
import { RequestParkDto } from './dtos/request-park.dto';
import { ParkService } from './park.service';

@Controller('/park')
export class ParkController {
  private logger: Logger;
  constructor(private readonly parkService: ParkService) {
    this.logger = new Logger();
  }

  @UseGuards(AuthGuard)
  @Get('/actives')
  async activeParks(@Session() session: Record<string, any>) {
    return this.parkService.userParkedVehicles(session.user.document);
  }

  @UseGuards(AuthGuard)
  @Post('/request')
  async requestPark(
    @Session() session: Record<string, any>,
    @Body() requestParkDto: RequestParkDto,
  ) {
    const userId = session.user.id;
    this.logger.log(
      `Request parking userId: ${userId} - requestParkDto: ${JSON.stringify(requestParkDto)}`,
      'ParkController - requestPark',
    );
    return this.parkService.parkVehicle(requestParkDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/addTime')
  async addTime(@Session() session: Record<string, any>, @Body() addTimeDto: AddTimeDto) {
    const userId = session.user.id;
    this.logger.log(
      `Adding time to park userId: ${userId} - addTimeDto: ${JSON.stringify(addTimeDto)}`,
      'ParkController - addTime',
    );
    return this.parkService.addTime(addTimeDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove')
  removePark(@Body() removeParkDto: RemoveParkDto) {
    this.logger.log(
      `Removing park - removeParkDto: ${JSON.stringify(removeParkDto)}`,
      'ParkController - removePark',
    );
    return this.parkService.removeVehicle(removeParkDto);
  }
}
