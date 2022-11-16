import { Request, Response } from 'express';
import AccountsService from '../services/AccountsService';
import createToken from '../utils/createToken';
const bcrypt = require('bcrypt');

export default class UserController {
  constructor(private service = new AccountsService()) { }

  public signup = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const hashedPassword = bcrypt.hash(password, bcrypt.genSaltSync(8), null);

    await this.service.create({userName, password});

    const token = createToken(userName);
    res.status(200).json({ token });
  };
}
