import fs from 'fs';
import path from 'path';

const routesPath = path.join(__dirname, '../src', 'routes');
const outputFilePath = path.join(__dirname, '../src', 'compiledRoutes.ts');

interface iRoute{
	path: string;
	file: string;
	name: string;
}

const generateStaticRoutes = (folderPath: string, basePath: string = ''): iRoute[] => {
	const filesAndFolders = fs.readdirSync(folderPath);
	const routes: iRoute[] = [];

	filesAndFolders.forEach(fileOrFolder => {
		const fullPath = path.join(folderPath, fileOrFolder);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			const subRoutes = generateStaticRoutes(fullPath, `${basePath}/${fileOrFolder}`);
			routes.push(...subRoutes);
		} else if (fileOrFolder.endsWith('Route.ts') || fileOrFolder.endsWith('Route.js')) {
			const routeName = fileOrFolder.replace(/Route\.(ts|js)$/, '').toLowerCase();
			const routePath = routeName === 'home' ? '/' : `${basePath}/${routeName}`;

			routes.push({ path: routePath, file: `./routes${basePath}/${fileOrFolder}`, name: routeName });
		}
	});

	return routes;
};

const routes = generateStaticRoutes(routesPath);

const fileContent = `import { Application } from 'express';
${routes.map(route => `import ${route.name} from '${route.file}';`).join('\n')}

export const loadRoutes = (app: Application) => {
${routes.map(route => `	app.use('${route.path}', ${route.name});`).join('\n')}
};`;

fs.writeFileSync(outputFilePath, fileContent);
console.log(`✅ Static routes file generated: ${outputFilePath}`);
