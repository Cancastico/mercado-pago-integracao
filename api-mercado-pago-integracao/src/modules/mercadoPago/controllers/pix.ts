import { Request, Response } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PixService from "../services/pix";
import * as dotenv from 'dotenv'
dotenv.config();

const pixService = new PixService();
const accessToken = process.env.ACESS_TOKEN;

export default class PixController {
  async post(req: Request, res: Response) {
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
      
      const newPixPayment = await pixService.create(accessToken, costumerName, costumerEmail, `Pagou um café ${coffeeType}`, pixValue);
      return res.status(201).json({ pix: newPixPayment });
    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
    }

  }
}