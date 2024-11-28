import Joi from 'joi';

const validateNumber = (fieldName: string, min?: number, max?: number, required = true) => {
	let schema = Joi.number();

	if (min !== undefined) schema = schema.min(min);
	if (max !== undefined) schema = schema.max(max);

	if (required) {
		schema = schema.required().messages({
			'number.base': `"${fieldName}" should be a number`,
			'number.min': `"${fieldName}" should be greater than or equal to ${min}`,
			'number.max': `"${fieldName}" should be less than or equal to ${max}`,
			'any.required': `"${fieldName}" is required`,
		});
	}

	return schema;
};

export default validateNumber;
