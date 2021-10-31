import { IsNotEmpty, Min } from 'class-validator';

export class AddTimeDto {
  @IsNotEmpty({
    message: 'Obrigatorio informar o identificador do estacionamento',
  })
  parkId: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar um tempo de estacionamento',
  })
  @Min(30)
  parkedTime: number;
}
