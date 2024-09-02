import { Router } from "express";
import PreferenceController from "./controllers/preferences";

const preferenceController = new PreferenceController()
const preferenceRouter = Router();



preferenceRouter.post(
  '/',
  preferenceController.create
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