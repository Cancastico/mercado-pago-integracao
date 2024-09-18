import { Router } from "express";
import PreferenceController from "./controllers/preferences";
import { ErrorMiddleware } from "../../middlewares/errorMiddleware/erroMiddleware";

const errorMiddleware = new ErrorMiddleware();
const preferenceController = new PreferenceController()
const preferenceRouter = Router();



preferenceRouter.post(
  '/', errorMiddleware.handleAsync(preferenceController.create)
);
preferenceRouter.get(
  '/:id', errorMiddleware.handleAsync(preferenceController.get)
);
preferenceRouter.get(
  '/', errorMiddleware.handleAsync(preferenceController.search)
);

// preferenceRouter.put(
//   '/:id',
//   preferenceController.update
// );
export { preferenceRouter };