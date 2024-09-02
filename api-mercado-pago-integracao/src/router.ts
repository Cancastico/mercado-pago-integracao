import { Router } from "express";
import { paymentRouter } from "./modules/payments/router";
import { ErrorMiddleware } from "./middlewares/errorMiddleware/erroMiddleware";
import { paymentMethodsRouter } from "./modules/paymentMethods/router";
import { preferenceRouter } from "./modules/preferences/router";

const errorMiddleware = new ErrorMiddleware();

const router = Router();

router.use('/payments', errorMiddleware.handleAsync(paymentRouter));
router.use('/preferences', errorMiddleware.handleAsync(preferenceRouter));
router.use('/methods', errorMiddleware.handleAsync(paymentMethodsRouter));

export { router };