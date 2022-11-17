import { Request, Response, NextFunction } from 'express';
import AccountsService from '../services/AccountsService';
import UsersService from '../services/UsersService';
import TransactionsService from '../services/TransactionsService';
const bcrypt = require('bcrypt');

export default class UserController {
  constructor(
    private accountsService = new AccountsService(),
    private usersService = new UsersService(),
    private transactionsService = new TransactionsService()
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const { receiver, value } = req.body;

    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const { accountId, userName } =
      this.usersService.decodedUserInfo(authorization);
    const { balance } = await this.accountsService.getAccountInfo(accountId);

    if (receiver === userName) {
      return res
        .status(401)
        .json({ message: 'You cannot cash-out to yourself' });
    }

    if (value > balance) {
      return res.status(401).json({ message: 'Insufficient funds' });
    }

    const { accountId: id } = await this.usersService.findByUserName(receiver);
    try {
      const transaction = await this.transactionsService.create(
        accountId,
        id,
        value,
      );

      res.status(200).json(transaction);
    } catch (err) {
      next(err);
    }
  };

  getInTransactions = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { date } = req.body;

    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const { accountId } = this.usersService.decodedUserInfo(authorization);
    const transactions =
      await this.transactionsService.findAllFilteredTransactions(
        accountId,
        'creditedAccountId',
        date
      );

    res.status(200).json(transactions);
  };

  getOutTransactions = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { date } = req.body;
    
    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const { accountId } = this.usersService.decodedUserInfo(authorization);
    
    const transactions =
      await this.transactionsService.findAllFilteredTransactions(
        accountId,
        'debitedAccountId',
        date
      );

    res.status(200).json(transactions);
  };
}
