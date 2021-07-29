import NegativeVote from '../models/NegativeVote';

/*
 * createVote: función que se encarga de almacenar un voto negativo.
 * Parámetros de entrada:
 * 						- author_id: id de usuario del autor del voto
 * 						- requirement_id: id del requerimiento por el que se está votando (o rechazando en este caso).
 * Salida: status 201 : estado de que se todo está ok con el almacenado del dato.
 */
export const createVote = async (req, res) => {
	const { author_id, requirement_id } = req.body;
	const newNegativeVote = new NegativeVote({ author_id, requirement_id });
	const negativeVoteSaved = await newNegativeVote.save();
	res.status(201).json(negativeVoteSaved);
};

/*
 * getVotesByRequirement: función que se encarga de leer de la base de datos los
 * votos negativos asociados a un requerimiento.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento por el que se está votando.
 * Salida: Votos por requerimiento (formato JSON)
 */
export const getVotesByRequirement = async (req, res) => {
	const negativeVotesbyrequirement = await NegativeVote.find({
		requirement_id: req.params.requirement_id,
	});
	res.status(200).json(negativeVotesbyrequirement);
};

/*
 * getVotesByRequirement: función que se encarga de leer y contar de la base de datos los votos negativos asociados (documentos en mongodb) a un requerimiento.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento por el que se está votando.
 * Salida: Número de votos negativos por requerimiento (formato JSON)
 */
export const getNumVotesByRequirement = async (req, res) => {
	const negativeVotesbyrequirement = await NegativeVote.find({
		requirement_id: req.params.requirement_id,
	}).countDocuments();
	res.status(200).json({ numvotes: negativeVotesbyrequirement });
};

/*
 * getVotesByUser: función que se encarga de leer de la base de datos los votos negativos
 * asociados (documentos en mongodb) a un usuario.
 * Parámetros de entrada:
 * 						- author_id: id de usuario del autor del voto
 * Salida: Lista de votos por requerimiento (formato JSON)
 */
export const getVotesByUser = async (req, res) => {
	const negativeVotesbyuser = await NegativeVote.find({
		author_id: req.params.author_id,
	});
	res.status(200).json(negativeVotesbyuser);
};
