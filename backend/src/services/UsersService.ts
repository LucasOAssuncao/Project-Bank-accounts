import Users from '../database/models/Users';

export default class UsersService {
  findByUserName = async (userName: any) => {
    const user = await Users.findOne({ where: { userName } });

    return user;
  };

  insert = async (credentials: any, accountId: number) => {
    const inserted = await Users.create({ ...credentials, accountId });

    return inserted;
  };
}
