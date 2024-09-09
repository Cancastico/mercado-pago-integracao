import * as dotenv from 'dotenv';
import { Request, Response } from "express";
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PaymentService from "../services/payments";
dotenv.config();

const paymentService = new PaymentService(process.env.ACCESS_TOKEN!);

export default class PaymentsController {


  async create(req: Request, res: Response) {
    try {
      const { installments, issuer_id, payer, payment_method_id, transaction_amount, token }: PaymentCreateRequest = req.body;


      if ((!transaction_amount || !payer || !payment_method_id) || (payment_method_id != 'pix' && !installments && !token && !issuer_id)) {
        throw new ErrorResponse(400, 'Invalid sales data')
      }


      const newPayment = await paymentService.create({installments, issuer_id, payer, payment_method_id, transaction_amount, token}).then(response => response).catch((error) => {
        throw new ErrorResponse(error.status, error.message)
      });

      return res.status(201).json({ payment: newPayment });
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