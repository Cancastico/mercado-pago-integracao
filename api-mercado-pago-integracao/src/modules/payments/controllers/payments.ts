import * as dotenv from 'dotenv';
import { Request, Response } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PaymentService from "../services/payments";
import { paymentMethods } from '../../../models/paymentMethods';
dotenv.config();

interface PaymentDetails extends paymentMethods {
  costumerName: string;
  costumerEmail: string;
  coffeeType: string;
  price: number;
  token?:string, 
}

const paymentService = new PaymentService(process.env.ACCESS_TOKEN!);

export default class PaymentsController {


  async create(req: Request, res: Response) {
    try {
      const { costumerName, costumerEmail, coffeeType, price, method, token }: PaymentDetails = req.body;

      if (!costumerName) {
        throw new ErrorResponse(400, 'costumerName Required');
      }

      if (!costumerEmail) {
        throw new ErrorResponse(400, 'costumerEmail Required');
      }

      if (!coffeeType) {
        throw new ErrorResponse(400, 'coffeeType Required');
      }

      if (!price || !(typeof price == 'number')) {
        throw new ErrorResponse(400, 'price Required');
      }
      if(method != 'pix' && !token){
        throw new ErrorResponse(400, 'Token Required');
      }

      const newPayment = await paymentService.create(costumerEmail, `Pagou um café ${coffeeType} para Avelino (Doação)`, price, method).then(response => response).catch((error) => {
        throw new ErrorResponse(error.status, error.message)
      });

      return res.status(201).json({ pix: newPayment });
    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
    }
  }

  async capture(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json(await paymentService.capture(id));

    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
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
      throw new ErrorResponse(error.code, error.message);
    }
  }

  async search(_req: Request, res: Response) {
    try {
      return res.status(200).json(await paymentService.search());

    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
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
      throw new ErrorResponse(error.code, error.message);
    }
  }
}