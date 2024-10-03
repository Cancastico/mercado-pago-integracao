import { Request, Response, Router } from "express";
import { paymentMethodsRouter } from "./modules/paymentMethods/router";
import { paymentRouter } from "./modules/payments/router";
import { preferenceRouter } from "./modules/preferences/router";



const router = Router();

router.use('/payments', paymentRouter);
router.use('/preferences', preferenceRouter);
router.use('/methods', paymentMethodsRouter);
router.get('/', (req: Request, res: Response) => { 
  return res.status(200).json({message:'Funfando'})
})

export { router };
