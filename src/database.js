import mongoose from 'mongoose';
import dotenv from 'dotenv';
/*
 * Conexión a base de datos
 */
dotenv.config();

mongoose
	.connect(
		`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}
	)
	.then((db) => console.log('DB is connected'))
	.catch((err) => console.log(err));
