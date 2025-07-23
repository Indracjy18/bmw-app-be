// src/middleware/index.js
import express from "express";
import cors from "cors";
import router from "../routes/index.js";

const appMiddleware = express.Router(); // Gunakan Router, bukan express()

appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

appMiddleware.options("*", cors());
appMiddleware.use(express.json());
appMiddleware.use(router);

export default appMiddleware;
