import { Response, Request, Router } from 'express';
import usersRouter from '@modules/user/infrastructure/http/routes/user';
import sessionRouter from '@modules/user/infrastructure/http/routes/session';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    response.status(200).send('Welcome!');
});

routes.post('/users', usersRouter);
routes.get('/users', usersRouter);
routes.put('/users', usersRouter);

routes.post('/session', sessionRouter);

export default routes;