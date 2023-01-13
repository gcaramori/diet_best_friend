import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '../controller/UserController';

const usersRouter = Router();

usersRouter.post('/users', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    bio: Joi.string().required()
  }
}, { abortEarly: false }), () => { console.log('bla') });

usersRouter.get(
  '/users'
);

export default usersRouter;