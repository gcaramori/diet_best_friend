import express, { Express, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import '@shared/container';
import { isCelebrateError } from 'celebrate';
import ConnectDB from '@shared/infrastructure/typeorm/index';
import routes from '@shared/infrastructure/http/routes';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface ValidationError {
    [key: string]: string;
}

const app: Express = express();
const PORT = process.env.PORT || 3001;

ConnectDB();

app.use(express.json());
app.use(routes);

app.use(
    (errors: Error, request: Request, response: Response, _: NextFunction) => {
      if(errors instanceof ErrorHandler) {
        return response.status(errors.statusCode).json({
          status: 'error',
          message: errors.message
        });
      }
  
      if(isCelebrateError(errors)) {
        let validateErrors: ValidationError = {};
        
        errors.details.forEach(error => {
          error.details.map(validateError => {
            validateErrors[validateError.path[0]] = validateError.message;
          })
        });
  
        return response.status(400).json({
          status: 'Validate Fails',
          errors: validateErrors
        });
      }

      console.log(errors);
      
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      })
    }
)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});