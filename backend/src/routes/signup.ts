import { Router } from 'express';

const route = Router();
// const accountController = new AccountController();

route.post('/login', verifyToken);

export default route;
