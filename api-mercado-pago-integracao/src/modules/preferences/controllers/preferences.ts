import * as dotenv from 'dotenv';
import { Request, Response } from "express";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";
import PreferenceService from '../services/preferences';
dotenv.config();

const preferenceService = new PreferenceService(process.env.ACCESS_TOKEN!);

export default class PreferenceController {

  async create(req: Request, res: Response) {
    try {
      const { coffeeType, id }: { coffeeType: string, id: number } = req.body;

      let price = 0;
      if (!coffeeType) {
        throw new ErrorResponse(400, 'coffeeType Required');
      }

      //Define o valor
      switch (id) {
        case 1:
          price = 1
          break;

        case 2:
          price = 3
          break;

        case 3:
          price = 5;
          break;

        default:
          throw new ErrorResponse(400,'Não existe esse café');
          break;
      }

      const newPreference = await preferenceService.create([{ id: id.toString(), quantity: 1, title: coffeeType, unit_price: price }]).catch(() => {
        throw new ErrorResponse(500, 'Erro ao tentar gerar preference')
      });

      return res.status(201).json({ preference: newPreference });
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
}