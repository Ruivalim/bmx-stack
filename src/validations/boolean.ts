import Joi from 'joi';

const validateBoolean = (fieldName: string, required = true) => {
	let schema = Joi.boolean();

	if (required) {
		schema = schema.required().messages({
			'boolean.base': `"${fieldName}" should be true or false`,
			'any.required': `"${fieldName}" is required`,
		});
	}

	return schema;
};

export default validateBoolean;
