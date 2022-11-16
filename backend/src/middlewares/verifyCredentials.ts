import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/UsersService';
const bcrypt = require("bcrypt")

const service = new UsersService()

async function verifyCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, password } = req.body;
  const passwordRegex = new RegExp(
    '^(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'
  );

  if (!userName || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({
        message:
          'Password must be at least 8 characters, at least one uppercase letter and one number:',
      });
  }
  //FALTA CONFERIR SE O USER NAME É UNICO
  if (userName.length <= 3) {
    return res
      .status(400)
      .json({ message: 'User name must be at least 3 characters' });
  }

  const verifyUser = await service.findByUserName(userName);

  if (verifyUser) return res.status(401).json({ message: 'User already exists' });

  next();
}
