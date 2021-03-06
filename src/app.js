import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import cors from 'cors';

import requirementsRoutes from './routes/req.routes';
import authRoutes from './routes/auth.routes';
import votesRoutes from './routes/votes.routes';
import negativevotesRoutes from './routes/negativevotes.routes';
import commentsRoutes from './routes/comments.routes';
import userRoutes from './routes/user.routes';
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
app.use('/negativevotes', negativevotesRoutes);
app.use('/comments', commentsRoutes);
app.use('/users', userRoutes);

export default app;
