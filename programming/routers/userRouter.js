import { Router } from "express";
import { getUserDetail } from "../controllers/userController.js";

const userRouter = Router();

//-----get-user-detail-----
userRouter.get("/:id", getUserDetail);

export default userRouter;
