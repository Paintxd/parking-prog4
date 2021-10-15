import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfter implements ValidatorConstraintInterface {
  private now = new Date(Date.now());

  validate(value: string, args: ValidationArguments) {
    return new Date(value).getTime() > this.now.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    const formatedDate = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(this.now);

    return `${args.value} deve ser após ${formatedDate}`;
  }
}
