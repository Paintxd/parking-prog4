import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreditCard } from './interfaces/card';
import { Vehicle } from './interfaces/vehicle';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ default: 0.0 })
  currency: number;

  @Prop([
    raw({
      description: { type: String },
      type: { type: String },
      licensePlate: { type: String },
    }),
  ])
  vehicles: Vehicle[];

  @Prop([
    raw({
      creditCardNumber: { type: String },
      creditCardExpiration: { type: String },
    }),
  ])
  cards: CreditCard[];
}

export const UserSchema = SchemaFactory.createForClass(User);
