import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/UsersService';

const usersService = new UsersService();

const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { receiver, value } = req.body;
  const user = await usersService.findByUserName(receiver);
  
  if (!user) {
    return res.status(400).json({ message: 'credited person Not Found' });
  }

  if (!value) {
    return res.status(400).json({ message: 'You must set a value' });
  }
  next();
};

export default verifyAccount;