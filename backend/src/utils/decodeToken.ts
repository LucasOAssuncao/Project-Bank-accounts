import { verify } from 'jsonwebtoken';
import { IJWT } from '../interfaces/IJwt';

const verifyJWT = (token: string) => {
  const { payload } = verify(token, "jwt_secret") as IJWT;
  return payload;
};

export default verifyJWT;
