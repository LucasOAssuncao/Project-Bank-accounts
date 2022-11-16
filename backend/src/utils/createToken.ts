import { sign } from 'jsonwebtoken';

const createToken = (payload: any) => {
  const token = sign({ payload }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
  return token;
};

export default createToken;