import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  email: string;

  @Prop([
    raw({
      description: { type: String },
      licensePlate: { type: String },
    }),
  ])
  vehicles: Record<string, any>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
