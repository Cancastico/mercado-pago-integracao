import * as dotenv from 'dotenv';
import { Request, Response } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PaymentMethodsService from "../service/paymentMethodsService";
dotenv.config();

const paymentMethodsService = new PaymentMethodsService(process.env.ACCESS_TOKEN!);
export default class PaymentMethodController {

  async get(_req:Request,res: Response) {
    try {

      res.status(200).json(await paymentMethodsService.get());
    } catch (error:any) {
      throw new ErrorResponse(error.code,error.message);
    }
  }
}