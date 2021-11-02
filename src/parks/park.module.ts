import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { rabbitmqConnection } from '../rabbitmq/connection';
import { UserModule } from '../user/user.module';
import { ParkController } from './park.controller';
import { Park, ParkSchema } from './park.schema';
import { ParkService } from './park.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Park.name, schema: ParkSchema }]), UserModule],
  providers: [
    ParkService,
    {
      provide: 'PARK_SERVICE',
      useValue: rabbitmqConnection(process.env.EXCHANGE_NAME),
    },
  ],
  controllers: [ParkController],
})
export class ParkModule {}
