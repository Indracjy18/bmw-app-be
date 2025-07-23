import { Router } from "express";
import { isAuth } from "../controllers/errorController.js";
import {
  createKaryawan,
  deleteKaryawan,
  getAllKaryawan,
  updateKaryawan,
} from "../controllers/karyawanController.js";

const karyawanRouter = Router();

karyawanRouter.get("/karyawan", isAuth, getAllKaryawan);
karyawanRouter.post("/karyawan", isAuth, createKaryawan);
karyawanRouter.put("/karyawan/:id", isAuth, updateKaryawan);
karyawanRouter.delete("/karyawan/:id", isAuth, deleteKaryawan);

export default karyawanRouter;
