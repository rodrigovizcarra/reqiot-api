import User from '../models/User';

/*
 * getPictureUrl: Función encargada de extraer la imagen asociada a un usuario en particulari
 * Parámetros de entrada:
 *                      - id : id del usuario a consultar
 * Salida: Url de la imagen asociada al usuario (formato JSON)
 */
export const getPictureUrl = async (req, res) => {
	const userdata = await User.findById(req.params.id);
	res.status(200).json({ pictureUrl: userdata.pictureUrl });
};
