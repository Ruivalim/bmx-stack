import Joi from 'joi';

const validateDate = (fieldName: string, required = true) => {
	let schema = Joi.date();

	if (required) {
		schema = schema.required().messages({
			'date.base': `"${fieldName}" should be a valid date`,
			'any.required': `"${fieldName}" is required`,
		});
	}

	return schema;
};

export default validateDate;
