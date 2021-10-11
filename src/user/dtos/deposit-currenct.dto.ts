import { Min } from 'class-validator';

export class DepositCurrencyDto {
  @Min(0)
  value: number;
}
