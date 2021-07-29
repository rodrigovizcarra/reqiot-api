import User from '../models/User';

/*
 * checkUsernameAndName: Función que se encarga de validar el usaurio y el nombre de la persona que se registra.
 */
export const checkUsernameAndName = async (req, res, next) => {
	const user = await User.findOne({ username: req.body.username });
	if (user) return res.status(400).json({ message: 'El usuario existe' });

	const name = await User.findOne({ name: req.body.name });
	if (name)
		return res
			.status(400)
			.json({ message: 'El nombre existe, es decir ya posee un usuario.' });

	next();
};
