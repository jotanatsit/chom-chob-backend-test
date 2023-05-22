import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import walletRouter from "./routers/walletRouter.js";
import rateRouter from "./routers/rateRouter.js";

async function init() {
   const app = express();
   const port = 4000;

   app.use(cors());

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   // Router
   app.use("/user", userRouter);
   app.use("/user", walletRouter);
   app.use("/rate", rateRouter);

   app.get("/", (req, res) => {
      res.send("Hello World!");
   });

   app.get("*", (req, res) => {
      res.status(404).send("Not found");
   });

   app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
   });
}

init();
