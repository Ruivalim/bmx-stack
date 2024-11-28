import Joi from 'joi';

const validateEmail = (fieldName: string, required = true) => {
	let schema = Joi.string().email();

	if (required) {
		schema = schema.required().messages({
			'string.email': `"${fieldName}" must be a valid email`,
			'any.required': `"${fieldName}" is required`,
		});
	}

	return schema;
};

export default validateEmail;
