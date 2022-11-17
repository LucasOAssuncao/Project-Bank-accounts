import Transactions from '../database/models/Transactions';
import Accounts from '../database/models/Accounts';
import { Op, Sequelize } from 'sequelize';
const config = require('../database/config/database');

const sequelize = new Sequelize(config);

export default class TransactionsService {
  findAllTransactionsById = async (
    id: number,
    key?: string
  ): Promise<Transactions[] | null> => {
    const transactions = await Transactions.findAll({
      where: {
        [Op.and]: [{ debitedAccountId: id }, { creditedAccountId: id }],
        exclude: ['id'],
      },
    });

    return transactions;
  };

  findAllFilteredTransactions = async (
    id: number,
    key: any,
    date?: any
  ): Promise<Transactions[] | null> => {
    
    if (date) {
      const transactions = await Transactions.findAll({
        where: { createdAt: date },
      });

      return transactions;
    }
    
    const transactions = await Transactions.findAll({
      where: { [key]: id },
    });

    return transactions;
  };

  create = async (
    debitedAccountId: number,
    creditedAccountId: number,
    value: number,
  ) => {
    const transaction = await Transactions.create({
      debitedAccountId,
      creditedAccountId,
      value,
    });
    const t = await sequelize.transaction();
    try {
      await Accounts.decrement('balance', {
        by: value,
        where: { id: debitedAccountId },
        transaction: t,
      });

      await Accounts.increment('balance', {
        by: value,
        where: { id: creditedAccountId },
        transaction: t,
      });

      await t.commit();
      return transaction;
    } catch (e) {
      await t.rollback();
      throw e;
    }
  };
}
