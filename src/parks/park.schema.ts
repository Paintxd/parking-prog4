import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParkDocument = Park & Document;

@Schema()
export class Park {
  @Prop({ required: true })
  vehicleLicensePlate: string;

  @Prop({ required: true })
  vehicleOwnerPhoneNumber: string;

  @Prop({ required: true })
  vehicleOwnerDocument: string;

  @Prop({ required: true })
  parkStartTime: Date;

  @Prop({ required: true })
  parkEndTime: Date;

  @Prop({ default: false })
  notified: boolean;

  @Prop({ default: 0.0 })
  refoundValue: number;
}

export const ParkSchema = SchemaFactory.createForClass(Park);
