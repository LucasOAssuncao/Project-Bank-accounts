import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = err;
  return res.status(400).json({ message });
};

export default errorMiddleware;
