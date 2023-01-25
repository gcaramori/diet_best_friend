import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controller/UserController';
import authentication from '../middlewares/Authentication';

const usersRouter = Router();

usersRouter.post('/users', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    birth: Joi.string().required()
  }
}, { abortEarly: false }), UserController.create);

usersRouter.get('/users', authentication, UserController.listAll);
usersRouter.put('/users', authentication, UserController.update);

export default usersRouter;