import fs from 'fs';
import path from 'path';
import { Application } from 'express';

const routesLoader = (app: Application, routesPath: string) => {
	const walker = (folderPath: string, basePath: string = '') => {
		const filesAndFolders = fs.readdirSync(folderPath);

		filesAndFolders.forEach(fileOrFolder => {
			const fullPath = path.join(folderPath, fileOrFolder);
			const stat = fs.statSync(fullPath);

			if (stat.isDirectory()) {
				walker(fullPath, `${basePath}/${fileOrFolder}`);
			} else if (fileOrFolder.endsWith('Route.ts') || fileOrFolder.endsWith('Route.js')) {
				const route = require(fullPath);
				const routeName = fileOrFolder.replace(/Route\.(ts|js)$/, '').toLowerCase();

				const routePath = routeName === 'home' ? '/' : `${basePath}/${routeName}`;

				app.use(routePath, route.default || route);
				console.log(`✅ Route loaded: ${routePath}`);
			}
		});
	};

	walker(routesPath);
};

export default routesLoader;
