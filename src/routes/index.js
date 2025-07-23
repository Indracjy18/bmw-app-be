import { Router } from "express";
import userRouter from "./userRoute.js";
import karyawanRouter from "./karyawanRoute.js";

const router = Router();

router.use("/api", userRouter); //
router.use("/api", karyawanRouter);

export default router;
