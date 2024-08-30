import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { ErrorResponse } from './middlewares/errorMiddleware/erroMiddleware';
import { router } from './router';

dotenv.config();

const port = process.env.PORT

const app = express()

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`API Integração Mercado Pago, Porta:${port}`)
})