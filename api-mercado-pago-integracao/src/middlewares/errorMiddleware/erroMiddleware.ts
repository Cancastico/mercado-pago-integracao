import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

export class ErrorResponse extends Error {
  constructor(
    public code: number,
    message: string = 'Internal Server Error',
  ) {
    super(message);
    this.code = isNaN(code) ? 500 : code;
  }
}

export class ErrorMiddleware {
  public handleAsync =
    (fn: RequestHandler) =>
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await Promise.resolve(fn(req, res, next));
        } catch (err) {
          return next(err);
        }
      };
}