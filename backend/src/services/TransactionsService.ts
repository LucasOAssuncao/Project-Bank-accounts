import Transactions from '../database/models/Transactions';
import Accounts from '../database/models/Accounts';
import { Op } from 'sequelize';

export default class TransactionsService {
  findTransactionById = async (id: number): Promise<Transactions[] | null> => {
    const transactions = await Transactions.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: id }, { creditedAccountId: id }],
        exclude: ['id'],
      },
    });

    return transactions;
  };

  create = async (
    debitedAccountId: number,
    creditedAccountId: number,
    value: number,
    balance: number
  ) => {
    const transaction = await Transactions.create({
      debitedAccountId,
      creditedAccountId,
      value,
    });

    await Accounts.update({ balance }, { where: { accountId: debitedAccountId }});
    
    return transaction;
  };
}
