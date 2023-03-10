import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionController from "../controller/SessionController";

const sessionRouter = Router();

sessionRouter.post('/session', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}, { abortEarly: false }), SessionController.create);

sessionRouter.post('/session/google', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        verified_email: Joi.boolean().required()
    }
}, { abortEarly: false }), SessionController.createWithGoogle);

export default sessionRouter;