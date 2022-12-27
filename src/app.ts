import express from 'express';
import cors from 'cors';
import { solution } from './solution';

const app = express();

app.use(cors());

app.use('/solution', solution);

export default app;


