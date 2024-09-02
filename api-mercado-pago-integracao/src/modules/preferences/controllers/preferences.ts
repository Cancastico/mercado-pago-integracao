import * as dotenv from 'dotenv';
import { Request, Response } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PreferenceService from '../services/preferences';
dotenv.config();

const preferenceService = new PreferenceService(process.env.ACCESS_TOKEN!);

export default class PreferenceController {

  async credit(req: Request, res: Response) {
    try {
      const { costumerName, costumerEmail, coffeeType, price }: { costumerName: string, costumerEmail: string, coffeeType: string, price: number, cardToken: string, issuerId: number } = req.body;

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
        throw new ErrorResponse(400, 'pixprice Required');
      }

      const newPaymentCard = await preferenceService.create([{id:'1',quantity:1,title:coffeeType,unit_price:price}],{email:costumerEmail,identificationType:'CPF',identificationNumber:''} ).catch(() => {
        throw new ErrorResponse(500,)
      });

      return res.status(201).json({ paymentCard: newPaymentCard });
    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
    }
  }

  async debit(req: Request, res: Response) {
    try {
      const { costumerName, costumerEmail, coffeeType, price }: { costumerName: string, costumerEmail: string, coffeeType: string, price: number, cardToken: string, issuerId: number } = req.body;

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
        throw new ErrorResponse(400, 'pixprice Required');
      }

      const newPaymentCard = await preferenceService.create([{id:'1',quantity:1,title:coffeeType,unit_price:price}],{email:costumerEmail,identificationType:'CPF',identificationNumber:''} ).catch(() => {
        throw new ErrorResponse(500,)
      });

      return res.status(201).json({ paymentCard: newPaymentCard });
    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
    }
  }


  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new Error('Id is invalid')
      }
      return res.status(200).json(await preferenceService.get(id));

    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
    }
  }

  async search(_req: Request, res: Response) {
    try {
      return res.status(200).json(await preferenceService.search());

    } catch (error: any) {
      throw new ErrorResponse(error.code, error.message);
    }
  }

  // async update(req: Request, res: Response) {
  //   try {
  //     const id = req.params.id;
  //     if (!id) {
  //       throw new Error('Id is invalid')
  //     }
  //     return res.status(200).json(await preferenceService.(id));

  //   } catch (error: any) {
  //     throw new ErrorResponse(error.code, error.message);
  //   }
  // }
}