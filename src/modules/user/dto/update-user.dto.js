import Joi from 'joi';

const UpdateUserDto = Joi.object({
    u_name: Joi.string().max(50).optional(),
    u_birth_date: Joi.date().iso().optional()
});

export default UpdateUserDto;