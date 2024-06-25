import express from "express";

import * as TransactionController from "../controllers/TransactionController";

const transactionRoutes = express.Router();


transactionRoutes.post("/customers",TransactionController.store);
transactionRoutes.post("/findData",TransactionController.findData);

export default transactionRoutes;
