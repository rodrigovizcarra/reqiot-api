import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import cors from 'cors';

import requirementsRoutes from './routes/req.routes';
import authRoutes from './routes/auth.routes';
import votesRoutes from './routes/votes.routes';
import commentsRoutes from './routes/comments.routes';

/*
 * definiciones del servicio
 */

const app = express();

app.set('pkg', pkg);

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		name: app.get('pkg').name,
		author: app.get('pkg').author,
		description: app.get('pkg').description,
		version: app.get('pkg').version,
	});
});

app.use('/requirements', requirementsRoutes);
app.use('/auth', authRoutes);
app.use('/votes', votesRoutes);
app.use('/comments', commentsRoutes);

export default app;
