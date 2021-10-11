import { Length } from 'class-validator';

export class RemoveVehicleDto {
  @Length(7, 7, {
    message: 'Placa deve possuir 7 caracteres',
  })
  licensePlate: string;
}
