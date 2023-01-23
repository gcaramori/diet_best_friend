import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import ErrorHandler from '@shared/errors/ErrorHandler';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
};

function authentication(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new ErrorHandler('JWT Token is missing!', 401);
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decoded = jwt.verify(token, authConfig.secret);
        const { sub } = decoded as ITokenPayload;

        request.user = { id: sub };

        return next();
    }
    catch(err) {
        throw new ErrorHandler('Invalid JWT Token!', 401);
    }
}

export default authentication;