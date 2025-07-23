import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
import { isAuth } from "../controllers/errorController.js";
const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.put("/users/:id", isAuth, updateUser);
userRouter.post("/users/login", loginUser);
userRouter.delete("/users/:id", isAuth, deleteUser);

export default userRouter;
