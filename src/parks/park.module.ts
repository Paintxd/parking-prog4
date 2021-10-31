import { Module } from '@nestjs/common';
import { rabbitmqConnection } from '../rabbitmq/connection';
import { UserModule } from '../user/user.module';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';

@Module({
  imports: [UserModule],
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
