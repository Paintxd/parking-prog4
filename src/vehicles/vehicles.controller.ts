import {
  Body,
  Controller,
  Logger,
  Post,
  Redirect,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { VehicleDto } from './vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('/vehicles')
export class VehiclesController {
  private logger: Logger;
  constructor(private readonly vehiclesService: VehiclesService) {
    this.logger = new Logger();
  }

  @UseGuards(AuthGuard)
  @Post('/add')
  @Redirect('/home')
  async registerVehicle(
    @Session() session: Record<string, any>,
    @Body() vehicleDto: VehicleDto,
  ) {
    const userId = session.user.id;
    this.logger.log(
      `Saving new vehicle userId:  ${userId} - vehicle: ${JSON.stringify(
        vehicleDto,
      )}`,
      'VehiclesService - registerVehicle',
    );

    return this.vehiclesService.registerVehicle(userId, vehicleDto);
  }
}
