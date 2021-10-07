import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

class IndexController {
  private userService = new UserService();

  home(req: Request, res: Response) {
    return this.userService.getUser('123456789')
      .then(result => {
        res.render('index', {
          name: result.name
        })
      });
  }

}

export default IndexController;
