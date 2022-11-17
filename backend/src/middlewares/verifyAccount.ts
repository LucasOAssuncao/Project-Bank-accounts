import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/UsersService';
const bcrypt = require('bcrypt');
import createToken from '../utils/createToken';

const usersService = new UsersService();

const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;

  const user = await usersService.findByUserName(userName);
  
  if (!user) {
    return res.status(400).json({ message: 'User Not Found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password);
  
  if(!isPasswordValid) {
    return res.status(400).json({ message: 'Wrong Password' });
  }

  const { accountId } = user;

  const token = createToken({ userName, accountId });
  res.status(200).json({ token });

  next();
};

export default verifyAccount;