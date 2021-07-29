import app from './app';
import './database';
import dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.PORT);

console.log('Server listen on port', process.env.PORT);

module.exports = app;
