import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authJwt } from '../middlewares';

const router = new Router();

router.get('/picture/:id', authJwt.verifyToken, userController.getPictureUrl);

export default router;
