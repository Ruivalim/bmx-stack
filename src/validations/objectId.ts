import Joi from 'joi';

const validateObjectId = (fieldName: string, required = true) => {
	let schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

	if (required) {
		schema = schema.required().messages({
			'string.pattern.base': `"${fieldName}" must be a valid MongoDB ObjectId`,
			'string.empty': `"${fieldName}" cannot be empty`,
			'any.required': `"${fieldName}" is required`,
		});
	} else {
		schema = schema.messages({
			'string.pattern.base': `"${fieldName}" must be a valid MongoDB ObjectId`,
		});
	}

	return schema;
};

export default validateObjectId;
