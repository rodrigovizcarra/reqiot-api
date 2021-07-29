import Comment from '../models/Comment';

/*
 * createComment: función que se encarga de almacenar un nuevo comentario.
 * Parámetros de entrada:
 * 						- author_id: id de usuario del autor del comentario
 * 						- requirement_id: id del requerimiento en el que se está comentado.
 * Salida: status 201 : estado de que se todo está ok con el almacenado del dato.
 */
export const createComment = async (req, res) => {
	const { author_id, requirement_id, comment } = req.body;
	const newComment = new Comment({ author_id, requirement_id, comment });
	const commentSaved = await newComment.save();
	res.status(201).json(commentSaved);
};

/*
 * getCommentsByRequirementId: función que se encarga de leer de la base de datos los comentarios asociados a un requerimiento.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento.
 * Salida: Comentarios del requerimiento asociado al id de entrada (formato JSON)
 */
export const getCommentsByRequirementId = async (req, res) => {
	const queryObject = [
		{ $match: { requirement_id: req.params.requirement_id } },
		{
			$lookup: {
				from: 'users',
				localField: 'author_id',
				foreignField: '_id',
				as: 'user',
			},
		},
	];
	const commentsbyrequirementid = await Comment.aggregate(queryObject);
	res.status(200).json(commentsbyrequirementid);
};

/*
 * getNumCommentsByRequirementId: función que se encarga de leer y contar de la base de datos los comentarios asociados a un requerimiento.
 * Parámetros de entrada:
 * 						- requirement_id: id del requerimiento.
 * Salida: Número de comentarios asociados a un requerimiento (formato JSON)
 */
export const getNumCommentsByRequirementId = async (req, res) => {
	const numcomments = await Comment.find({
		requirement_id: req.params.requirement_id,
	}).countDocuments();
	res.status(200).json({ numcomments: numcomments });
};
