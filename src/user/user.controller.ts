import { Body, Controller, Get, Logger, Post, Redirect, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DepositCurrencyDto } from './dtos/deposit-currenct.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  private logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger();
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getSessionUser(@Session() session: Record<string, any>) {
    const user = session.user;
    this.logger.log(`Buscando usuario da sessao - id - ${user.id}`);

    return this.userService.getUserById(user.id);
  }

  @Post('/register')
  async registerUser(@Body() userDto: UserDto) {
    this.logger.log(
      `Registering user - userDto: ${JSON.stringify(userDto)}`,
      'UserController - registerUser',
    );
    return this.userService.registerUser(userDto);
  }

  @UseGuards(AuthGuard)
  @Post('/currency')
  async depositCurrency(
    @Session() session: Record<string, any>,
    @Body() depositCurrencyDto: DepositCurrencyDto,
  ) {
    const userId = session.user.id;
    const value = depositCurrencyDto.value;
    this.logger.log(
      `Depositing currency userId:  ${userId} - value: ${value}`,
      'UserController - depositCurrency',
    );

    return this.userService.depositCurrency(userId, depositCurrencyDto);
  }
}
