import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const writeFile = async (filePath: string, content: string): Promise<void> => {
	await fs.outputFile(filePath, content);
	console.log(`✅ Created: ${filePath}`);
};

const generateStaticRoute = async (name: string): Promise<void> => {
	const routePath = path.join('src', 'routes', `${name}Route.ts`);
	const htmlFilePath = path.join('public', `${name}.html`);

	const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
</head>
<body>
  <h1>Welcome to the ${name} page!</h1>
</body>
</html>`;
	await writeFile(htmlFilePath, htmlContent);

	const routeContent = `import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const htmlPath = path.join(__dirname, '../../public/${name}.html');
  res.sendFile(htmlPath);
});

export default router;`;
	await writeFile(routePath, routeContent);
};

const generateRestRoute = async (model: string): Promise<void> => {
	const routePath = path.join('src', 'routes', `${model}Route.ts`);
	const content = `import Joi from 'joi';
import { Router } from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/${model}Controller';
import validate from '../middleware/validationMiddleware';
import validateString from '../validations/string';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', validate(Joi.object({ name: validateString('Name', 3, 50) })), create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;`;
	await writeFile(routePath, content);
};

const generateController = async (model: string): Promise<void> => {
	const controllerPath = path.join('src', 'controllers', `${model}Controller.ts`);
	const content = `import { Request, Response } from 'express';
import ${model} from '../models/${model}Model';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await ${model}.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ${model}.findById(req.params.id);
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
    const item = new ${model}(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ${model}.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const item = await ${model}.findByIdAndDelete(req.params.id);
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

const generateModel = async (model: string): Promise<void> => {
	const modelPath = path.join('src', 'models', `${model}Model.ts`);
	const content = `import mongoose, { Schema, Document } from 'mongoose';

export interface I${model} extends Document {
  _id: string;
  name: string;
  createdAt: Date;
}

const ${model}Schema: Schema = new Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<I${model}>('${model}', ${model}Schema);`;
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

	if (type === 'Static Route') {
		const { name } = await inquirer.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Enter the name of the route:',
			},
		]);
		await generateStaticRoute(name);
	} else if (type === 'REST Route') {
		const { model } = await inquirer.prompt([
			{
				type: 'input',
				name: 'model',
				message: 'Enter the name of the model (PascalCase):',
			},
		]);
		await generateModel(model);
		await generateController(model);
		await generateRestRoute(model);
	}
};

main().catch(error => {
	console.error('❌ Error:', error.message);
});
