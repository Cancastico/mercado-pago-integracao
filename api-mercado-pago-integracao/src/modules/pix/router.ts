import { Router } from "express";
import PixController from "./controllers/pix";

const pixController = new PixController()
const pixRouter = Router();


pixRouter.post(
  '/',
  pixController.post
);
export { pixRouter };