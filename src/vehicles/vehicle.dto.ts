import { IsEnum, Length } from 'class-validator';

enum VehicleType {
  CARRO = 'carro',
  MOTO = 'moto',
  ONIBUS = 'onibus',
  CAMINHAO = 'caminhao',
}

export class VehicleDto {
  @Length(2, 20, {
    message: 'Nome deve possuir no minimo 5 caracteres e no maximo 20',
  })
  description: string;

  @IsEnum(VehicleType, {
    message: `Tipo do veiculo deve ser ${Object.values(VehicleType)}`.split(',').join(', ')
  })
  type: string;

  @Length(7, 7, {
    message: 'Placa deve possuir 7 caracteres',
  })
  licensePlate: string;
}
