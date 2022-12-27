import { Router, Request, Response } from 'express';
import auth from '../middlewares/auth';

export interface User {
    email: string;
    name: string;
}

export const solution = Router();

export function isWinningWord(req: Request, res: Response) {
        res.send(false);
}

// save a new user
solution.post('/', isWinningWord);

export default solution;
