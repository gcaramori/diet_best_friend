import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import FoodController from '../controller/FoodController';

const foodsRouter = Router();

foodsRouter.post('/foods', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    brand: Joi.string().required(),
    portion_size: Joi.string().required(),
    portion: Joi.number().required(),
    calories: Joi.number().required()
  }
}, { abortEarly: false }), FoodController.create);

foodsRouter.get('/foods', FoodController.listAll);

export default foodsRouter;