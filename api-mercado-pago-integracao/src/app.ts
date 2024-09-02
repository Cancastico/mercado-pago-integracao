import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { ErrorResponse } from './middlewares/errorMiddleware/erroMiddleware';
import { router } from './router';

dotenv.config();

const port = process.env.PORT

const app = express()

app.use(express.json());

app.use(router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  if (err instanceof ErrorResponse) {
    return res.status(err.code).json({
      error: err.message,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error, A000',
  });
});


app.listen(port, () => {
  console.log(`API Integração Mercado Pago, Porta:${port}`)
})