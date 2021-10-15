import {
  Body,
  Controller,
  Delete,
  Logger,
  Patch,
  Post,
  Redirect,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RemoveVehicleDto } from './dtos/remove-vehicle.dto';
import { VehicleDto } from './dtos/vehicle.dto';
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
  async registerVehicle(@Session() session: Record<string, any>, @Body() vehicleDto: VehicleDto) {
    const userId = session.user.id;
    this.logger.log(
      `Saving new vehicle userId:  ${userId} - vehicle: ${JSON.stringify(vehicleDto)}`,
      'VehiclesController - registerVehicle',
    );

    return this.vehiclesService.registerVehicle(userId, vehicleDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove')
  async deleteVehicle(
    @Session() session: Record<string, any>,
    @Body() removeVehicleDto: RemoveVehicleDto,
  ) {
    const userId = session.user.id;
    const licensePlate = removeVehicleDto.licensePlate;
    this.logger.log(
      `Deleting vehicle userId:  ${userId} - licensePlate: ${licensePlate}`,
      'VehiclesController - deleteVehicle',
    );

    return this.vehiclesService.deleteVehicle(userId, licensePlate);
  }

  @UseGuards(AuthGuard)
  @Patch('/update')
  async updateVehicle(@Session() session: Record<string, any>, @Body() vehicleDto: VehicleDto) {
    const userId = session.user.id;
    this.logger.log(
      `Updating vehicle userId:  ${userId} - vehicle: ${JSON.stringify(vehicleDto)}`,
      'VehiclesController - updateVehicle',
    );

    return this.vehiclesService.updateVehicle(userId, vehicleDto);
  }
}
