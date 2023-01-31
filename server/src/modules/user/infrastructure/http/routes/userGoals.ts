import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserGoalsController from '../controller/UserGoalsController';
import authentication from '../middlewares/Authentication';

const userGoalsRouter = Router();

userGoalsRouter.post('/goals', celebrate({
  [Segments.BODY]: {
    initial_weight: Joi.number().required(),
    actual_weight: Joi.number().required(),
    goal_weight: Joi.number().required(),
    calories: Joi.number().required(),
    proteins: Joi.number().required(),
    carbs: Joi.number().required(),
    fats: Joi.number().required(),
    user: Joi.string().required()
  }
}, { abortEarly: false }), UserGoalsController.create);

userGoalsRouter.get('/all_goals', authentication, UserGoalsController.listAll);
userGoalsRouter.put('/goals', authentication, UserGoalsController.update);

export default userGoalsRouter;