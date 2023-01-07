import {Router, Request, Response} from 'express';
import bcrypt from 'bcryptjs';

const saltRounds = 10;
const word = 'which'.toUpperCase();

export const solution = Router();

export function getHashSolution(req: Request, res: Response) {
    const hash = bcrypt.hashSync(word, saltRounds);
    res.send(hash);
}

// save a new user
solution.get('/', getHashSolution);

export default solution;
