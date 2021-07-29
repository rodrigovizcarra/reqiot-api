import { Schema, model } from 'mongoose';

/*
 * Definición de esquema para la colección negativevotes (campos del documento)
 */
const negativeVoteSchema = new Schema(
	{
		author_id: String,
		requirement_id: String,
	},
	{
		timestamps: true,
		version: false,
	}
);

export default model('NegativeVote', negativeVoteSchema);
