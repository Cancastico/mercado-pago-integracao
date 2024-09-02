import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PaymentService from "../services/payments";
import * as dotenv from 'dotenv'
dotenv.config();

const paymentService = new PaymentService(process.env.ACCESS_TOKEN!);

export default class PaymentsController {


  async pix(req: Request, res: Response, next: NextFunction) {
    try {
      const { costumerName, costumerEmail, coffeeType, value }: { costumerName: string, costumerEmail: string, coffeeType: string, value: number } = req.body;

      if (!costumerName) {
        throw new ErrorResponse(400, 'costumerName Required');
      }

      if (!costumerEmail) {
        throw new ErrorResponse(400, 'costumerEmail Required');
      }

      if (!coffeeType) {
        throw new ErrorResponse(400, 'coffeeType Required');
      }

      if (!value || !(typeof value == 'number')) {
        throw new ErrorResponse(400, 'pixValue Required');
      }

      const newPixPayment = await paymentService.create(costumerEmail, `Pagou um café ${coffeeType} para Avelino (Doação)`, value, 'pix').catch(() => {
        throw new ErrorResponse(500,)
      });

      return res.status(201).json({ pix: newPixPayment });
    } catch (error: any) {
      next(error)
    }
  }

  async capture(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return await paymentService.capture(id);

    } catch (error: any) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json(await paymentService.get(id));

    } catch (error: any) {
      next(error)
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(await paymentService.search());

    } catch (error: any) {
      next(error)
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json(await paymentService.cancel(id));

    } catch (error: any) {
      next(error)
    }
  }
}