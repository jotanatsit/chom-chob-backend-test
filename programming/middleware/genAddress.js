import { randomBytes } from "crypto";

export const genAddress = async (req, res, next) => {
   let address;
   try {
      address = randomBytes(20).toString("hex");
      req.body = {
         ...req.body,
         address,
      };
      next();
   } catch (error) {
      res.json({
         message: error.message,
      });
   }
};
