import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import walletRouter from "./routers/walletRouter.js";

async function init() {
   const app = express();
   const port = 4000;

   app.use(cors());

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   // Router
   app.use("/user", userRouter);

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
