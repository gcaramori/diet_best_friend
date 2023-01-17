import { Response, Request, Router } from 'express';
import usersRouter from '@modules/user/infrastructure/http/routes/user';

const routes = Router();

routes.get('/', (response: Response, request: Request) => {
    response.status(200).send('Welcome!');
});

routes.post('/users', usersRouter);
routes.get('/users', usersRouter);

export default routes;