import { IJWT } from '../interfaces/IJwt';
import Accounts from '../database/models/Accounts';

export default class AccountsService {
  insert = async () => {
    const {
      dataValues: { id },
    } = await Accounts.create({ balance: 100.00 });

    return id;
  };

  getAccountInfo = async (id: number) => {
    
    const accountInfo = await Accounts.findOne({ where: { id } });
    
    return accountInfo?.dataValues;
  };
}
