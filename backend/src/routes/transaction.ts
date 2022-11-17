import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
import verifyInfoForTransaction from '../middlewares/verifyInfoForTransaction';

const route = Router();
const transactionsController = new TransactionsController();

route.post(
  '/transactions',
  verifyInfoForTransaction,
  transactionsController.create
);
route.get(
  '/transactions/in',
  transactionsController.getInTransactions
);
route.get(
  '/transactions/out',
  transactionsController.getOutTransactions
);

export default route;
