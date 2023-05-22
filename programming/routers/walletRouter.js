import { Router } from "express";
import {
   updateWalletBalances,
   addCurrencyToWallet,
   transferCurrency,
} from "../controllers/walletController.js";
import { genAddress } from "../middleware/genAddress.js";

const walletRouter = Router();

//-----update-wallet-balance-----
walletRouter.put("/:userId/wallet/edit", updateWalletBalances);

//-----add-currency-to-wallet-----
walletRouter.post(
   "/:userId/wallet/add-currency",
   genAddress,
   addCurrencyToWallet
);

//-----transfer-currency-to-other-----
walletRouter.put("/:senderId/transfer", transferCurrency);

export default walletRouter;
