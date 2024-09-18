import { Router } from "express";
import PaymentMethodController from "./controller/paymentMethodsController";
import { ErrorMiddleware } from "../../middlewares/errorMiddleware/erroMiddleware";
const errorMiddleware = new ErrorMiddleware();
const paymentMethodsController = new PaymentMethodController()
const paymentMethodsRouter = Router();


paymentMethodsRouter.get(
  '/',
  errorMiddleware.handleAsync(paymentMethodsController.get)
);
export { paymentMethodsRouter };