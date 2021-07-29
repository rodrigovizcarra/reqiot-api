import { Router } from 'express';
import * as reqController from '../controllers/req.controller';
import { authJwt } from '../middlewares';

const router = Router();

router.post('/', authJwt.verifyToken, reqController.createRequirement);

router.get('/', authJwt.verifyToken, reqController.getRequirements);

router.get(
	'/:requirementId',
	authJwt.verifyToken,
	reqController.getRequirementById
);

router.get(
	'/author/:author_id',
	authJwt.verifyToken,
	reqController.getRequirementByAuthorId
);

export default router;
