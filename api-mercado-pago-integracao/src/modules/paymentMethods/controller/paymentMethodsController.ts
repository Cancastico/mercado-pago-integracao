import { NextFunction, Request, Response } from "express";
import PaymentMethodsService from "../service/paymentMethodsService";
import * as dotenv from 'dotenv'
dotenv.config();

const paymentMethodsService = new PaymentMethodsService(process.env.ACCESS_TOKEN!);
export default class PaymentMethodController {

  async get(req:Request,res: Response, next: NextFunction) {
    try {

      res.status(200).json(await paymentMethodsService.get());
    } catch (error) {
      next(error)
    }
  }
}