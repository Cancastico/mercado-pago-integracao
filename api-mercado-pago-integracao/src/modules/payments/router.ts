import { Router } from "express";
import PaymentsController from "./controllers/payments";

const paymentsController = new PaymentsController()
const paymentRouter = Router();


paymentRouter.post(
  '/',
  paymentsController.create
);
paymentRouter.get(
  '/:id',
  paymentsController.get
);
paymentRouter.get(
  '/',
  paymentsController.search
);
paymentRouter.get(
  '/capture/:id',
  paymentsController.capture
);
paymentRouter.delete(
  '/:id',
  paymentsController.cancel
);
export { paymentRouter };