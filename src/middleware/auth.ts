import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from 'src/models/user';


export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization == null) return res.status(400).send('headers.authorization is required');
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        res.locals.user = decoded;
        next()
    } catch (error: unknown) {
        return res.status(401).json((error as Error).message);
    }
}