import Joi from 'joi';

export const CreateBookDto = Joi.object({
    id: Joi.number().optional().default(1),
    title: Joi.string().required(),
    author: Joi.string().required()
});