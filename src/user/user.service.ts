import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { number } from 'card-validator';
import { DepositCurrencyDto } from './dtos/deposit-currenct.dto';
import { UserDto } from './dtos/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  private logger: Logger;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    this.logger = new Logger();
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const { password, ...user } = await this.userModel.findById(id).lean();

    return user;
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login }).lean();

    if (!user) {
      this.logger.error(`User login: ${login} not found`, null, 'UserService - getById');
      throw new NotFoundException();
    }

    this.logger.log(`User login: ${login} found`);

    return user;
  }

  async depositCurrency(userId: string, depositCurrencyDto: DepositCurrencyDto): Promise<User> {
    if (!number(depositCurrencyDto.creditCardNumber).isPotentiallyValid) {
      this.logger.error(
        `Credit card validation error - userId: ${userId} - depositCurrencyDto: ${JSON.stringify(
          depositCurrencyDto,
        )}`,
        null,
        'UserService - depositCurrency',
      );

      throw new BadRequestException({
        status: 400,
        message: 'Invalid credit card',
      });
    }

    const user = await this.getUserById(userId);
    const currency = (user.currency += depositCurrencyDto.value);
    const cards = user.cards;

    if (depositCurrencyDto.saveCard) {
      const { creditCardNumber, creditCardExpiration } = depositCurrencyDto;
      cards.push({ creditCardNumber, creditCardExpiration });
    }

    return await this.userModel.findByIdAndUpdate(userId, { currency, cards }).lean();
  }

  async registerUser(userDto: UserDto): Promise<User> {
    const password = await this.hashPassword(userDto.password);
    const user = await this.userModel.create({ ...userDto, password });

    if (!user) {
      this.logger.error(
        `Error registering user - userDto: ${JSON.stringify(userDto)}`,
        null,
        'UserService - registerUser',
      );
      throw new InternalServerErrorException({
        status: 500,
        message: 'Registration error',
      });
    }

    this.logger.log(
      `User registered - user: ${JSON.stringify(user)}`,
      'UserService - registerUser',
    );

    return user;
  }

  async comparePassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  private async hashPassword(password: string): Promise<string> {
    this.logger.log('Hashing password', 'UserService - hashPassword');

    return await argon2.hash(password);
  }
}
