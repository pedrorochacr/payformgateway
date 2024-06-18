import express from "express";

import * as CustomerController from "../controllers/CustomerController";

const customerRoutes = express.Router();


customerRoutes.get("/customers",CustomerController.show);

export default customerRoutes;
