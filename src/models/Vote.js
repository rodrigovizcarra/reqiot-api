import { Schema, model } from 'mongoose';

/*
 * Definición de esquema para la colección votes (campos del documento)
 */
const voteSchema = new Schema(
	{
		author_id: String,
		requirement_id: String,
	},
	{
		timestamps: true,
		version: false,
	}
);

export default model('Vote', voteSchema);
