import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from 'amqplib';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { AddTimeDto } from './dtos/add-time.dto';
import { RemoveParkDto } from './dtos/remove-park.dto';
import { RequestParkDto } from './dtos/request-park.dto';
import { Park, ParkDocument } from './park.schema';

@Injectable()
export class ParkService {
  private logger: Logger;
  private exchange: string;

  constructor(
    @Inject('PARK_SERVICE') private readonly queueConnection: Channel,
    @InjectModel(Park.name) private readonly parkModel: Model<ParkDocument>,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger();
    this.exchange = process.env.EXCHANGE_NAME;
  }

  async userParkedVehicles(userDocument: string) {
    const userParks = await this.parkModel.find({ vehicleOwnerDocument: userDocument });
    const now = new Date(Date.now());

    return userParks.filter((park) => park.parkEndTime > now);
  }

  async parkVehicle(requestParkDto: RequestParkDto, userId: string) {
    const chargedAmount = Number((requestParkDto.parkedTime * 0.02).toFixed(2));
    const user = await this.userService.getUserById(userId);

    if (user.currency < chargedAmount) {
      this.logger.log(
        `Payment error - chargedAmount: ${chargedAmount} - userCurrency: ${user.currency}`,
        'ParkService - parkVehicle',
      );
      throw new HttpException(
        {
          status: 402,
          message: 'Usuario não possui creditos suficientes',
        },
        402,
      );
    }

    const park = {
      ...requestParkDto,
      chargedAmount,
    };

    this.queueConnection.publish(this.exchange, 'new.parking', Buffer.from(JSON.stringify(park)));

    this.logger.log(`Message posted - park: ${JSON.stringify(park)}`, 'ParkService - parkVehicle');

    return {
      message: 'Vehicle parked',
    };
  }

  async addTime(addTimeDto: AddTimeDto, userId: string) {
    const chargedAmount = Number((addTimeDto.parkedTime * 0.02).toFixed(2));
    const user = await this.userService.getUserById(userId);

    if (user.currency < chargedAmount) {
      this.logger.log(
        `Payment error - chargedAmount: ${chargedAmount} - userCurrency: ${user.currency}`,
        'ParkService - addTime',
      );
      throw new HttpException(
        {
          status: 402,
          message: 'Usuario não possui creditos suficientes',
        },
        402,
      );
    }

    const park = {
      ...addTimeDto,
      chargedAmount,
    };

    this.logger.log(`Message posted - park: ${JSON.stringify(park)}`, 'ParkService - addTime');

    return {
      message: 'Time added to park',
    };
  }

  removeVehicle(removeParkDto: RemoveParkDto) {
    this.queueConnection.publish(
      this.exchange,
      'vehicle.remove',
      Buffer.from(JSON.stringify(removeParkDto)),
    );

    this.logger.log(
      `Message posted - removeParkDto: ${JSON.stringify(removeParkDto)}`,
      'ParkService - removeVehicle',
    );

    return {
      message: 'Vehicle removed',
    };
  }
}
