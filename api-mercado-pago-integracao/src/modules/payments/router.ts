import { Router } from "express";
import PaymentsController from "./controllers/payments";

const paymentsController = new PaymentsController()
const paymentRouter = Router();


paymentRouter.post(
  '/pix',
  paymentsController.pix
);
paymentRouter.post(
  '/credit',
  paymentsController.credit
);
paymentRouter.post(
  '/debit',
  paymentsController.debit
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