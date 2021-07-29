import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

/*
 * Definición de esquema para la colección users (campos del documento)
 */

const userSchema = new Schema(
	{
		username: { type: String, unique: true },
		password: { type: String, required: true },
		name: String,
		pictureUrl: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

/*
 * encryptPassword: función estatica para encryptar (bcript, 10 veces) el password que provee el usaurio y almacenarlo en base de datos
 * Parametros de entrada: - password: clave entregada por el usuario o función que llama a la API.
 * Salida: password encryptado
 */
userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

/*
 * función estatica para comparar el password que provee el usaurio con el almacenado en la base de datos, con el fin de ejecutar un login.
 */
userSchema.statics.comparePassword = async (password, receivePassword) => {
	return await bcrypt.compare(password, receivePassword);
};

export default model('User', userSchema);
