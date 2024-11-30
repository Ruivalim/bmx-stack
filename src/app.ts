import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import routesLoader from './routesLoader';
import { engine } from 'express-handlebars';

dotenv.config();

const app: Application = express();

console.log(`Running in ${process.env.NODE_ENV} mode`);

if (process.env.NODE_ENV === 'production') {
	console.log('Using helmet');
	app.use(helmet());
	app.use(
		helmet.contentSecurityPolicy({
			useDefaults: true,
			directives: {
				'script-src': ["'self'", "'unsafe-inline'", 'https:'],
				'img-src': ["'self'", 'https: data:'],
			},
		})
	);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(compression());

app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

if(process.env.NODE_ENV === 'production') {
	require('./compiledRoutes').loadRoutes(app);
} else {
	routesLoader(app, path.join(__dirname, './routes'));
}

export default app;
