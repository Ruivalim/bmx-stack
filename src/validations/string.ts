import Joi from 'joi';

const validateString = (fieldName: string, min: number, max: number, required = true) => {
	let schema = Joi.string().min(min).max(max);

	if (required) {
		schema = schema.required().messages({
			'string.base': `"${fieldName}" should be a type of text`,
			'string.empty': `"${fieldName}" cannot be empty`,
			'string.min': `"${fieldName}" should have at least ${min} characters`,
			'string.max': `"${fieldName}" should have at most ${max} characters`,
			'any.required': `"${fieldName}" is required`,
		});
	}

	return schema;
};

export default validateString;
