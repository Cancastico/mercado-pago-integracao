import { Router } from "express";
import { pixRouter } from "./modules/pix/router";
import { ErrorMiddleware } from "./middlewares/errorMiddleware/erroMiddleware";

const errorMiddleware = new ErrorMiddleware();

const router = Router();

router.use('/pix', errorMiddleware.handleAsync(pixRouter));

export { router };