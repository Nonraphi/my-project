import Joi from 'joi'

export const UpdateBookDto = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().optional(),
    author: Joi.string().optional()
})