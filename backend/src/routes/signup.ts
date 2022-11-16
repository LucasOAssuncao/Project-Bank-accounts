import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import verifyCredentials from '../middlewares/verifyCredentials';

const route = Router();
const accountController = new AccountController();

route.post('/signup',verifyCredentials ,accountController.signup);

export default route;
