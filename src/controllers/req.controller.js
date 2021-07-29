import Requirement from '../models/Requirement';

/*
 * createRequirement: función que se encarga de almacenar un nuevo requerimiento.
 * Parámetros de entrada:
 * 						- title: titulo que define el usuario para el requerimiento.
 * 						- description: descripción o detalle del requerimiento.
 * 						- author_id: id de usuario del autor del requerimiento
 * Salida: status 201 : estado de que se todo está ok con el almacenado del dato.
 */
export const createRequirement = async (req, res) => {
	const { title, description, author_id } = req.body;
	const newRequirement = new Requirement({ title, description, author_id });
	const requirementSaved = await newRequirement.save();
	res.status(201).json(requirementSaved);
};

/*
 * getVotesByRequirement: función que se encarga de leer de la base de datos todos los requerimientos.
 * Parámetros de entrada: NO TIENE
 * Salida: Lista de requerimiento (formato JSON)
 */
export const getRequirements = async (req, res) => {
	const queryObject = [
		{ $addFields: { _id: { $toString: '$_id' } } },
		{
			$lookup: {
				from: 'votes',
				localField: '_id',
				foreignField: 'requirement_id',
				as: 'votes',
			},
		},
		{
			$lookup: {
				from: 'comments',
				localField: '_id',
				foreignField: 'requirement_id',
				as: 'comments',
			},
		},
	];
	const descsort = { createdAt: -1 };
	const requirements = await Requirement.aggregate(queryObject).sort(descsort);
	res.status(200).json(requirements);
};

/*
 * getRequirementById: función que se encarga de leer de la base de datos un requeriento filtrado por su id.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento por el que se está votando.
 * Salida: Requerimiento asociado al ID de entrada (formato JSON)
 */
export const getRequirementById = async (req, res) => {
	const requirement = await Requirement.findById(req.params.requirementId);
	if (!requirement) return res.status(404).json('Requirement not found');
	res.status(200).json(requirement);
};

/*
 * getRequirementByAuthorId: función que se encarga de leer de la base de datos un requeriento filtrado el id de usuario del autor.
 * Parámetros de entrada:
 * 						- author_id: id de usuario del autor del requerimiento.
 * Salida: Requerimiento asociado al ID de entrada (formato JSON)
 */
export const getRequirementByAuthorId = async (req, res) => {
	const requirement = await Requirement.findOne({
		author_id: req.params.author_id,
	});
	if (!requirement) return res.status(404).json('Requirement not found');
	res.status(200).json(requirement);
};
