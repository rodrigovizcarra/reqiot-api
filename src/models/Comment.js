import { Schema, model } from 'mongoose';

/*
 * Definición de esquema para la colección comments (campos del documento)
 */

const commentSchema = new Schema(
	{
		author_id: Schema.Types.ObjectId,
		requirement_id: String,
		comment: String,
	},
	{
		timestamps: true,
		version: false,
	}
);

export default model('Comment', commentSchema);
