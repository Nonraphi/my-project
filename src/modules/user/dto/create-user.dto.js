import Joi from "joi";

const CreateUserDto = Joi.object({
    u_name: Joi.string().max(50).required(),
    u_birth_date: Joi.date().iso().optional()
});

export default CreateUserDto