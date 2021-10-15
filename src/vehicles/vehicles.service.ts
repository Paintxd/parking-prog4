import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/user.schema';
import { VehicleDto } from './dtos/vehicle.dto';

@Injectable()
export class VehiclesService {
  private logger: Logger;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger();
  }

  async registerVehicle(userId: string, vehicleDto: VehicleDto) {
    const user = await this.userService.getUserById(userId);
    const vehicles = [...user.vehicles, vehicleDto];

    return await this.userModel.findByIdAndUpdate(userId, { vehicles }).lean();
  }

  async deleteVehicle(userId: string, licensePlate: string) {
    const user = await this.userService.getUserById(userId);
    const vehicles = user.vehicles.filter((vehicle) => vehicle.licensePlate !== licensePlate);

    return await this.userModel.findByIdAndUpdate(userId, { vehicles }).lean();
  }

  async updateVehicle(userId: string, vehicleDto: VehicleDto) {
    const user = await this.userService.getUserById(userId);
    const vehicles = [
      ...user.vehicles.filter((vehicle) => vehicle.licensePlate !== vehicleDto.licensePlate),
      vehicleDto,
    ];

    return await this.userModel.findByIdAndUpdate(userId, { vehicles }).lean();
  }
}
