import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
import verifyInfoForTransaction from '../middlewares/verifyInfoForTransaction';

const route = Router();
const transactionsController = new TransactionsController();

route.post('/transactions',verifyInfoForTransaction, transactionsController.create);

export default route;
