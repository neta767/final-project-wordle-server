import {Router, Request, Response} from 'express';
import {cypher} from "../cypher";
import {
    CharStatus,
    checkIfGameWon,
    getCharStatuses,
    getGuessesStatuses
} from "./statuses";
import bodyParser from "body-parser";
import {MAX_CHALLENGES} from "../constants/setting";

type gameReq = {
    guesses: string[],
    hashSolution: string;
}

type gameRes = {
    charStatuses: { [key: string]: CharStatus },
    guessesStatuses: CharStatus[][],
    isGameWon: boolean;
    solution: string;
}

function getHashSolution(req: Request, res: Response) {
    res.send(cypher.enc('WHICH'));
}

function UpdateGameStatus(req: Request, res: Response) {
    const {guesses, hashSolution} = req.body as gameReq;
    const solution = cypher.dec(hashSolution.toString())
    const resData: gameRes = {
        guessesStatuses: getGuessesStatuses(guesses, solution),
        charStatuses: getCharStatuses(guesses, solution),
        isGameWon: checkIfGameWon(guesses, solution),
        solution: (guesses.length === MAX_CHALLENGES) ? solution : ''
    };
    res.send(resData);
}

export const game = Router();

game.get('/', getHashSolution)
game.post('/', bodyParser.json(), UpdateGameStatus);