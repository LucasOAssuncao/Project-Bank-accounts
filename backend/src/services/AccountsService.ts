import Accounts from '../database/models/Accounts';

export default class AccountsService {
  insert = async () => {
    const {
      dataValues: { id },
    } = await Accounts.create({ balance: 100.0 });

    return id;
  };
}
