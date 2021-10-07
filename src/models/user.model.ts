import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  password: string;
  cpf: string;
  email: string;
  vehicles: string[];
}

const schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  vehicles: { type: [String], required: true },
});

export const UserModel = model<User>('User', schema);
