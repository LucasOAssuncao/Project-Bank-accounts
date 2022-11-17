import { Router } from 'express';
import verifyAccount from '../middlewares/verifyAccount';
import UsersController from '../controllers/UsersController';

const route = Router();
const usersController = new UsersController();

route.post('/login', verifyAccount);
route.get('/login', usersController.getUserInfo);

export default route;
