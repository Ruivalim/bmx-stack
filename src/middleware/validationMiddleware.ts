import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

const validate =
	(schema: Schema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errorMessages = error.details.map(detail => detail.message);
			res.status(400).json({ success: false, errors: errorMessages });
			return;
		}

		next();
	};

export default validate;
