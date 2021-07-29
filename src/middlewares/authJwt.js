import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

/*
 * verifyToken: función que se encarga de verificar la presencia de un token dentro del header de una consulta a la API.
 */
export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];

		if (!token) return res.status(403).json({ message: 'No token provided' });
		const decoded = jwt.verify(token, config.SECRET);

		const user = await User.findById(decoded.id);

		if (!user) return res.status(404).json({ message: 'no user found' });
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};
