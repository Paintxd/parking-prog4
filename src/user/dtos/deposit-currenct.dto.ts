import { IsBoolean, Length, Min, Validate } from 'class-validator';

export class DepositCurrencyDto {
  @Min(0)
  value: number;

  @Length(14, 17, {
    message: 'Informe um numero de cartão valido',
  })
  creditCardNumber: string;

  @Length(3, 3, {
    message: 'Informe um codigo valido',
  })
  creditCardCvv: string;

  creditCardExpiration: string;

  @IsBoolean()
  saveCard: boolean;
}
