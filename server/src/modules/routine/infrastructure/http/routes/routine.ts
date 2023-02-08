import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RoutineController from '../controller/RoutineController';

const routinesRouter = Router();

routinesRouter.post('/routines', celebrate({
  [Segments.BODY]: {
    day: Joi.date().required(),
    breakfast: Joi.array().required(),
    lunch: Joi.array().required(),
    dinner: Joi.array().required(),
    snacks: Joi.array().required()
  }
}, { abortEarly: false }), RoutineController.create);

routinesRouter.get('/foods', RoutineController.listAll);

export default routinesRouter;