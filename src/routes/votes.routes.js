import { Router } from 'express';
import * as voteController from '../controllers/vote.controller';
import { authJwt } from '../middlewares';

const router = Router();

router.post('/', authJwt.verifyToken, voteController.createVote);

router.get(
	'/byrequirement/:requirement_id',
	authJwt.verifyToken,
	voteController.getVotesByRequirement
);

router.get(
	'/numbyrequirement/:requirement_id',
	authJwt.verifyToken,
	voteController.getNumVotesByRequirement
);

router.get(
	'/byuser/:author_id',
	authJwt.verifyToken,
	voteController.getVotesByUser
);

export default router;
