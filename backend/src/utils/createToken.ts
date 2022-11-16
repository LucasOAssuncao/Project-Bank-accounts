import { sign } from 'jsonwebtoken';

const createToken = (payload: any) => {
  const token = sign({ payload }, "jwt_secret", { expiresIn: '24h' });
  return token;
};

export default createToken;