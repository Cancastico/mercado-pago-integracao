import { Router } from "express";
import PreferenceController from "./controllers/preferences";

const preferenceController = new PreferenceController()
const preferenceRouter = Router();



preferenceRouter.post(
  '/credit',
  preferenceController.credit
);
preferenceRouter.post(
  '/debit',
  preferenceController.debit
);
preferenceRouter.get(
  '/:id',
  preferenceController.get
);
preferenceRouter.get(
  '/',
  preferenceController.search
);

// preferenceRouter.put(
//   '/:id',
//   preferenceController.update
// );
export { preferenceRouter };