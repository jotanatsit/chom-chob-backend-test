import { Router } from "express";
import { updateExchangeRate } from "../controllers/rateController.js";

const rateRouter = Router();

rateRouter.put("/edit", updateExchangeRate);

export default rateRouter;
