import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PixService from "../services/pix";
import * as dotenv from 'dotenv'
dotenv.config();

const pixService = new PixService();
const accessToken = process.env.ACESS_TOKEN;

export default class PixController {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      if (!accessToken) {
        throw new ErrorResponse(500, 'Internal Server error, A001')
      }
      const { costumerName, costumerEmail, coffeeType, pixValue }: { costumerName: string, costumerEmail: string, coffeeType: string, pixValue: number } = req.body;

      if (!costumerName) {
        throw new ErrorResponse(400, 'costumerName Required')
      }

      if (!costumerEmail) {
        throw new ErrorResponse(400, 'costumerEmail Required')
      }

      if (!coffeeType) {
        throw new ErrorResponse(400, 'coffeeType Required')
      }

      if (!pixValue || !(typeof pixValue == 'number')) {
        throw new ErrorResponse(400, 'pixValue Required')
      }

      const newPixPayment = await pixService.create(accessToken, costumerName, costumerEmail, `Pagou um café ${coffeeType} para Avelino (Doação)`, pixValue).catch((error)=>{
        console.log(error);
        throw new ErrorResponse(500,)
      });

      return res.status(201).json({ pix: newPixPayment });
    } catch (error: any) {
      console.log('aqui')
      next(error)
    }
  }
}