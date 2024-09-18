import { Router } from "express";
import PaymentsController from "./controllers/payments";
import { ErrorMiddleware } from "../../middlewares/errorMiddleware/erroMiddleware";

const errorMiddleware = new ErrorMiddleware();
const paymentsController = new PaymentsController()
const paymentRouter = Router();


paymentRouter.post(
  '/',
  errorMiddleware.handleAsync(paymentsController.create)
);
paymentRouter.get(
  '/:id',
  errorMiddleware.handleAsync(paymentsController.get)
);
paymentRouter.get(
  '/',
  errorMiddleware.handleAsync(paymentsController.search)
);
paymentRouter.get(
  '/capture/:id',
  errorMiddleware.handleAsync(paymentsController.capture)
);
paymentRouter.delete(
  '/:id',
  errorMiddleware.handleAsync(paymentsController.cancel)
);
export { paymentRouter };