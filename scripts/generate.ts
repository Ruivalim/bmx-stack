import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const writeFile = async (filePath: string, content: string): Promise<void> => {
	await fs.outputFile(filePath, content);
	console.log(`✅ Created: ${filePath}`);
};

const calculateRelativePath = (from: string, to: string): string => {
	const relativePath = path.relative(path.dirname(from), to);
	return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

const generateStaticRoute = async (name: string): Promise<void> => {
	const folderPath = path.dirname(name);
	const routeName = path.basename(name);

	const routePath = path.join('src', 'routes', folderPath, `${routeName}Route.ts`);
	const htmlFilePath = path.join('public', folderPath, `${routeName}.html`);
	const relativeHtmlPath = calculateRelativePath(routePath, htmlFilePath);

	const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${routeName}</title>
</head>
<body>
  <h1>Welcome to the ${routeName} page!</h1>
</body>
</html>`;
	await writeFile(htmlFilePath, htmlContent);

	const routeContent = `import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const htmlPath = path.join(__dirname, '${relativeHtmlPath}');
  res.sendFile(htmlPath);
});

export default router;`;
	await writeFile(routePath, routeContent);
};

const generateRestRoute = async (name: string): Promise<void> => {
	const folderPath = path.dirname(name);
	const routeName = path.basename(name);

	const routePath = path.join('src', 'routes', folderPath, `${routeName}Route.ts`);
	const controllerPath = calculateRelativePath(
		routePath,
		path.join('src', 'controllers', `${folderPath}`, `${routeName}Controller.ts`)
	);
	const validationMiddlewarePath = calculateRelativePath(
		routePath,
		path.join('src', 'middleware', 'validationMiddleware.ts')
	);
	const validationStringPath = calculateRelativePath(routePath, path.join('src', 'validations', 'string.ts'));

	const content = `import Joi from 'joi';
import { Router } from 'express';
import { getAll, getOne, create, update, remove } from '${controllerPath}';
import validate from '${validationMiddlewarePath}';
import validateString from '${validationStringPath}';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', validate(Joi.object({ name: validateString('Name', 3, 50) })), create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;`;
	await writeFile(routePath, content);
};

const generateController = async (name: string): Promise<void> => {
	const folderPath = path.dirname(name);
	const controllerName = path.basename(name);

	const controllerPath = path.join('src', 'controllers', folderPath, `${controllerName}Controller.ts`);
	const modelPath = calculateRelativePath(controllerPath, path.join('src', 'models', `${controllerName}Model.ts`));
	const content = `import { Request, Response } from 'express';
import ${controllerName} from '${modelPath}';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await ${controllerName}.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ${controllerName}.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new ${controllerName}(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ${controllerName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ${controllerName}.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};`;
	await writeFile(controllerPath, content);
};

const generateModel = async (name: string): Promise<void> => {
	const modelName = path.basename(name);
	const modelPath = path.join('src', 'models', `${modelName}Model.ts`);
	const content = `import mongoose, { Schema, Document } from 'mongoose';

export interface I${modelName} extends Document {
  _id: string;
  name: string;
  createdAt: Date;
}

const ${modelName}Schema: Schema = new Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<I${modelName}>('${modelName}', ${modelName}Schema);`;
	await writeFile(modelPath, content);
};

const main = async (): Promise<void> => {
	const { type } = await inquirer.prompt([
		{
			type: 'list',
			name: 'type',
			message: 'What would you like to generate?',
			choices: ['Static Route', 'REST Route'],
		},
	]);

	const { name } = await inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Enter route name (path/to/route):',
		},
	]);

	if (type === 'Static Route') {
		await generateStaticRoute(name);
	} else if (type === 'REST Route') {
		await generateModel(name);
		await generateController(name);
		await generateRestRoute(name);
	}
};

main().catch(error => {
	console.error('❌ Error:', error.message);
});
