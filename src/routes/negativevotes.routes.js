import { Router } from 'express';
import * as negativeVoteController from '../controllers/negativevote.controller';
import { authJwt } from '../middlewares';

const router = new Router();

router.post('/', authJwt.verifyToken, negativeVoteController.createVote);

router.get(
	'/byrequirement/:requirement_id',
	authJwt.verifyToken,
	negativeVoteController.getVotesByRequirement
);

router.get(
	'/numbyrequirement/:requirement_id',
	authJwt.verifyToken,
	negativeVoteController.getNumVotesByRequirement
);

router.get(
	'/byuser/:author_id',
	authJwt.verifyToken,
	negativeVoteController.getVotesByUser
);

export default router;
