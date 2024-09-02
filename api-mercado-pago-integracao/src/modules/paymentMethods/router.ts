import { Router } from "express";
import PaymentMethodController from "./controller/paymentMethodsController";

const paymentMethodsController = new PaymentMethodController()
const paymentMethodsRouter = Router();


paymentMethodsRouter.get(
  '/',
  paymentMethodsController.get
);
export { paymentMethodsRouter };