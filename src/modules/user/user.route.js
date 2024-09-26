import express from 'express';
import UserController from './controllers/user.controller.js';
import { createValidator } from 'express-joi-validation';
import CreateUserDto from './dto/create-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';

const UserRouter = express.Router();
const validator = createValidator(); 

UserRouter.post('/', validator.body(CreateUserDto), UserController.addUser);
UserRouter.get('/', UserController.showAllUser);
UserRouter.get('/:id', UserController.getById)
UserRouter.get('/name/:u_name', UserController.getByName)
UserRouter.patch('/:id', validator.body(UpdateUserDto), UserController.updateUser);
UserRouter.delete('/:id',  UserController.deleteUser);

export default UserRouter;