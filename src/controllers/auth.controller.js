import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

/*
 * signup: función encargada de hacer el registro de usuario.
 * Parámetros de entrada:
 * 						- username: nombre de usuario (definido por usuario).
 * 						- password: clave del usuario (definido por usuario).
 * 						- name: nombre completo de la persona que se registra.
 * 						- pictureUrl: imagen de avatar que se mostrará en la web.
 * Salida: Token, se genera un token para el caso de que se considere un formulario
 * de registro el usuario pueda entrar directo a la web sin tener que pasar por el login.
 */
export const signup = async (req, res) => {
	const { username, password, name, pictureUrl } = req.body;

	const newUser = new User({
		username,
		password: await User.encryptPassword(password),
		name,
		pictureUrl,
	});

	const savedUser = await newUser.save();
	const token = jwt.sign(
		{
			id: savedUser._id,
			name: savedUser.name,
			pictureUrl: savedUser.pictureUrl,
		},
		config.SECRET,
		{
			expiresIn: 86400, // one day seconds
		}
	);

	res.status(200).json({ token });
};

/*
 * signin: Función encargada del login esta genera el token que usará el usuario dentro de la web.
 * Parámetros de entrada:
 * 						- username: nombre de usuario (registrado previamente).
 * 						- password: clave del usuario (registrado previamente).
 * Salida: Token
 */
export const signin = async (req, res) => {
	const userFound = await User.findOne({ username: req.body.username });

	if (!userFound) return res.json({ message: 'Usuario no encontrado' });

	const matchPassword = await User.comparePassword(
		req.body.password,
		userFound.password
	);

	if (!matchPassword)
		return res.json({ token: null, message: 'Clave inválida' });

	const token = jwt.sign(
		{
			id: userFound._id,
			name: userFound.name,
			pictureUrl: userFound.pictureUrl,
		},
		config.SECRET,
		{
			expiresIn: 86400,
		}
	);

	res.json({ token });
};
