import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @Length(5, 20, {
    message: 'Login deve possuir no minimo 5 caracteres e no maximo 20',
  })
  login: string;

  @Length(8, 20, {
    message: 'Senha deve possuir no minimo 8 caracteres e no maximo 20',
  })
  password: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar um email',
  })
  @IsEmail()
  email: string;

  @Length(11, 11, {
    message: 'Informe um CPF valido',
  })
  cpf: string;
}
