import { pool } from "../utils/db.js";

//-----get-user-detail-----
export const getUserDetail = async (req, res) => {
   const id = req.params.id;
   let response;

   try {
      response = await pool.query(
         `
         select
            u.user_id,
            u.username,            
            array_agg(jsonb_build_object('wallet_id',w.wallet_id,'balance',b.balance,'currency',b.currency)) as balances
         from users u
         left join wallets w on w.user_id = u.user_id
         left join balances b on b.wallet_id = w.wallet_id
         where u.user_id=$1
         group by u.user_id,u.username;
         `,
         [id]
      );
      res.json({
         data: response.rows[0],
      });
   } catch (error) {
      res.json({
         message: error.message,
      });
   }
};
