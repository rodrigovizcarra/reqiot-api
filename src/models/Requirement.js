import { Schema, model } from 'mongoose';

/*
 * Definición de esquema para la colección requirements (campos del documento)
 */
const requirementSchema = new Schema(
	{
		title: String,
		description: String,
		author_id: String,
	},
	{
		timestamps: true,
		version: false,
	}
);

export default model('Requirement', requirementSchema);
