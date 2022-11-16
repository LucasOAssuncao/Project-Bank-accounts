import { Router } from 'express';
import AccountsController from '../controllers/AccountsController';
import verifyCredentials from '../middlewares/verifyCredentials';

const route = Router();
const accountsController = new AccountsController();

route.post('/signup',verifyCredentials ,accountsController.signup);

export default route;
