import { Router } from "express";
import { updateWalletBalances } from "../controllers/walletController.js";

const walletRouter = Router();

walletRouter.put("/:userId/wallet/edit", updateWalletBalances);

export default walletRouter;
