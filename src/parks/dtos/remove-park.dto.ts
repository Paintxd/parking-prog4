import { IsNotEmpty } from 'class-validator';

export class RemoveParkDto {
  @IsNotEmpty({
    message: 'Obrigatorio informar um parkId',
  })
  parkId: string;
}
