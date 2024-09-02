import { Router } from "express";
import { paymentRouter } from "./modules/payments/router";
import { ErrorMiddleware } from "./middlewares/errorMiddleware/erroMiddleware";
import { paymentMethodsRouter } from "./modules/paymentMethods/router";

const errorMiddleware = new ErrorMiddleware();

const router = Router();

router.use('/payments', errorMiddleware.handleAsync(paymentRouter));
router.use('/methods', errorMiddleware.handleAsync(paymentMethodsRouter));

export { router };