import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({
    message: 'Obrigatorio informar um login',
  })
  login: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar uma senha',
  })
  password: string;
}
