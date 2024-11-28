import express, { Application } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
	if (file.endsWith('Route.ts') || file.endsWith('Route.js')) {
		const route = require(path.join(routesPath, file));
		const routeName = `/${file.replace(/Route\.(ts|js)$/, '').toLowerCase()}`;
		app.use(routeName, route.default);
		console.log(`✅ Route loaded: ${routeName}`);
	}
});

export default app;
