import { IsNotEmpty, Min } from 'class-validator';

export class RequestParkDto {
  @IsNotEmpty({
    message: 'Obrigatorio informar a placa do veiculo',
  })
  vehicleLicensePlate: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar o telefone do dono do veiculo',
  })
  vehicleOwnerPhoneNumber: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar o documento do dono do veiculo',
  })
  vehicleOwnerDocument: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar um tempo de estacionamento',
  })
  @Min(30)
  parkedTime: number;
}
