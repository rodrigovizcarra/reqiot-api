import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';
import { authJwt } from '../middlewares';

const router = Router();

router.post('/', authJwt.verifyToken, commentController.createComment);

router.get(
	'/byrequirementid/:requirement_id',
	authJwt.verifyToken,
	commentController.getCommentsByRequirementId
);

router.get(
	'/countbyrequirement/:requirement_id',
	authJwt.verifyToken,
	commentController.getNumCommentsByRequirementId
);

export default router;
