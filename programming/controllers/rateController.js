import { pool } from "../utils/db.js";

//----update-exchange-rate-----
export const updateExchangeRate = async (req, res) => {
   const primary = req.query.primary;
   const secondary = req.query.secondary;
   const rate = req.query.rate;

   try {
      await pool.query(
         `update exchanges set rate=$1 where "primary"=$2 and secondary=$3`,
         [rate, primary, secondary]
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
