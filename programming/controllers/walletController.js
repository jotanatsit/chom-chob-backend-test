import { pool } from "../utils/db.js";

// update wallet balance
export const updateWalletBalances = async (req, res) => {
   const userId = req.params.userId;
   const balance = req.query.balance;
   const currency = req.query.currency;
   try {
      await pool.query(
         `
         update balances b
         set balance=$1
         from wallets w
         left join users u on w.user_id = u.user_id
         where b.wallet_id = w.wallet_id
         and u.user_id=$2
         and b.currency=$3;
         `,
         [balance, userId, currency]
      );
      res.json({
         message: "updated succeed",
      });
   } catch (error) {
      res.json({
         message: error.message,
      });
   }
};
