import { Response, Request, Router } from 'express';
import usersRouter from '@modules/user/infrastructure/http/routes/user';
import userGoalsRouter from '@modules/user/infrastructure/http/routes/userGoals';
import sessionRouter from '@modules/user/infrastructure/http/routes/session';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    response.status(200).send('Welcome!');
});

routes.post('/users', usersRouter);
routes.get('/users', usersRouter);
routes.get('/users/verify_email', usersRouter);
routes.put('/users', usersRouter);

routes.post('/session', sessionRouter);
routes.post('/session/google', sessionRouter);

routes.get('/all_goals', userGoalsRouter);
routes.post('/goals', userGoalsRouter);
routes.put('/goals', userGoalsRouter);

export default routes;