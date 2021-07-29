import Vote from '../models/Vote';

/*
 * createVote: función que se encarga de almacenar un voto.
 * Parámetros de entrada:
 * 						- author_id: id de usuario del autor del voto
 * 						- requirement_id: id del requerimiento por el que se está votando.
 * Salida: status 201 : estado de que se todo está ok con el almacenado del dato.
 */
export const createVote = async (req, res) => {
	const { author_id, requirement_id } = req.body;
	const newVote = new Vote({ author_id, requirement_id });
	const voteSaved = await newVote.save();
	res.status(201).json(voteSaved);
};

/*
 * getVotesByRequirement: función que se encarga de leer de la base de datos los votos asociados a un requerimiento.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento por el que se está votando.
 * Salida: Votos por requerimiento (formato JSON)
 */
export const getVotesByRequirement = async (req, res) => {
	const votesbyrequirement = await Vote.find({
		requirement_id: req.params.requirement_id,
	});
	res.status(200).json(votesbyrequirement);
};

/*
 * getVotesByRequirement: función que se encarga de leer y contar de la base de datos los votos asociados (documentos en mongodb) a un requerimiento.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento por el que se está votando.
 * Salida: Número de votos por requerimiento (formato JSON)
 */
export const getNumVotesByRequirement = async (req, res) => {
	const votesbyrequirement = await Vote.find({
		requirement_id: req.params.requirement_id,
	}).countDocuments();
	res.status(200).json({ numvotes: votesbyrequirement });
};

/*
 * getVotesByUser: función que se encarga de leer de la base de datos los votos asociados (documentos en mongodb) a un usuario.
 * Parámetros de entrada:
 * 						- author_id: id de usuario del autor del voto
 * Salida: Lista de votos por requerimiento (formato JSON)
 */
export const getVotesByUser = async (req, res) => {
	const votesbyuser = await Vote.find({
		author_id: req.params.author_id,
	});
	res.status(200).json(votesbyuser);
};
