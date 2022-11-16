import Users from '../database/models/Users';
import decodeToken from '../utils/decodeToken';

export default class UsersService {
  findByUserName = async (userName: string): Promise<Users | null> => {
    const user = await Users.findOne({ where: { userName } });

      return user?.dataValues;
  };

  insert = async (credentials: any, accountId: number) => {
    const inserted = await Users.create({ ...credentials, accountId });

    return inserted;
  };

  decodedUserInfo = (token: string) => {
    const info = decodeToken(token);
    
    return info;
  }
}
