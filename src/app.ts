import express from 'express';
import cors from 'cors';
import {game} from './game';

const app = express();

app.use(cors());

app.use('/game', game);

export default app;


