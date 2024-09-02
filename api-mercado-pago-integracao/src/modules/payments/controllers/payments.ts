import * as dotenv from 'dotenv';
import { Request, Response } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PaymentService from "../services/payments";
dotenv.config();

const paymentService = new PaymentService(process.env.ACCESS_TOKEN!);

export default class PaymentsController {


  async pix(req: Request, res: Response) {
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
      throw new ErrorResponse(error.code,error.message);
    }
  }

  async credit(req: Request, res: Response) {
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

      const newPixPayment = await paymentService.create(costumerEmail, `Pagou um café ${coffeeType} para Avelino (Doação)`, value, 'credit_card').catch(() => {
        throw new ErrorResponse(500,)
      });

      return res.status(201).json({ pix: newPixPayment });
    } catch (error: any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }

  async debit(req: Request, res: Response) {
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

      const newPixPayment = await paymentService.create(costumerEmail, `Pagou um café ${coffeeType} para Avelino (Doação)`, value, 'debit_card').catch(() => {
        throw new ErrorResponse(500,)
      });

      return res.status(201).json({ pix: newPixPayment });
    } catch (error: any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }

  async capture(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json( await paymentService.capture(id));

    } catch (error: any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json(await paymentService.get(id));

    } catch (error: any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }

  async search(_req: Request, res: Response) {
    try {
      return res.status(200).json(await paymentService.search());

    } catch (error: any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json(await paymentService.cancel(id));

    } catch (error: any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }
}