import { Request, Response } from 'express';
import AccountsService from '../services/AccountsService';
import UsersService from '../services/UsersService';
const bcrypt = require('bcrypt');

export default class AccountsController {
  constructor(
    private accountsService = new AccountsService(),
    private usersService = new UsersService()
  ) {}

  public signup = async (req: Request, res: Response) => {
    const { userName, password: passWord } = req.body;
    const password = await bcrypt.hashSync(
      passWord,
      bcrypt.genSaltSync(8),
      null
    );

    const id = await this.accountsService.insert();

    await this.usersService.insert({ userName, password }, id);

    res.status(200).json();
  };
}
