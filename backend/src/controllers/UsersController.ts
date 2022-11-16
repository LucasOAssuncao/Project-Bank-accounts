import { Request, Response } from 'express';
import AccountsService from '../services/AccountsService';
import UsersService from '../services/UsersService';
const bcrypt = require('bcrypt');

export default class UserController {
  constructor(
    private accountsService = new AccountsService(),
    private usersService = new UsersService()
  ) {}

  public getUserInfo = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const { accountId, userName } = this.usersService.decodedUserInfo(authorization);

    const  balance  = await this.accountsService.getBalance(accountId);
    
    res.status(200).json({ userName, balance});
  };
}
