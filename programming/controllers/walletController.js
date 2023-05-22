import { pool } from "../utils/db.js";

//-----update-wallet-balance-----
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

//-----add-currency-to-wallet-----
export const addCurrencyToWallet = async (req, res) => {
   const userId = req.params.userId;
   const currency = req.query.currency;
   const address = req.body.address;

   try {
      //---create-wallet-to-userId---
      await pool.query(
         `insert into wallets (user_id,wallet_address) values ($1,$2)`,
         [userId, address]
      );

      //---get-walletId---
      let tempWalletId = await pool.query(
         `select wallet_id from wallets where user_id=$1 order by wallet_id desc`,
         [userId]
      );
      const walletId = tempWalletId.rows[0].wallet_id;

      //---add-currency-to-walletId---
      await pool.query(
         `insert into balances (wallet_id,currency) values ($1,$2)`,
         [walletId, currency]
      );

      res.json({
         message: "added succeed",
      });
   } catch (error) {
      res.json({
         message: error.message,
      });
   }
};

//-----transfer-currency-to-other-----
export const transferCurrency = async (req, res) => {
   const senderId = req.params.senderId;
   const balance = req.query.balance;
   const currency = req.query.currency;
   const receiverId = req.query.receiverId;
   let senderWallet;
   let receiverWallet;
   let response;

   try {
      //---sender-wallet---
      response = await pool.query(
         `
         select w.wallet_id
         from wallets w
         left join balances b on b.wallet_id=w.wallet_id
         where
         w.user_id=$1 and
         b.currency=$2
         group by w.wallet_id;`,
         [senderId, currency]
      );
      senderWallet = response.rows[0].wallet_id;

      //---receiver-wallet---
      response = await pool.query(
         `
         select w.wallet_id
         from wallets w
         left join balances b on b.wallet_id=w.wallet_id
         where
         w.user_id=$1 and
         b.currency=$2
         group by w.wallet_id;`,
         [receiverId, currency]
      );
      receiverWallet = response.rows[0].wallet_id;

      //---let's-transfer---
      await pool.query(
         `
         update balances
         set balance=balance-$1
         where wallet_id=$2 and currency=$3
         `,
         [balance, senderWallet, currency]
      );

      await pool.query(
         `
         update balances
         set balance=balance+$1
         where wallet_id=$2 and currency=$3
         `,
         [balance, receiverWallet, currency]
      );

      res.json({
         message: "transferred secceed",
      });
   } catch (error) {
      res.json({
         message: error.message,
      });
   }
};
