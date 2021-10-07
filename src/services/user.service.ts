import { User, UserModel } from '../models/user.model';

export class UserService {

  async getUser(cpf: string): Promise<any> {
    const user = await UserModel.findOne({ cpf });

    return user;
  }
}
