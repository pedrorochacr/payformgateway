import express from "express";

import * as GatewayController from "../controllers/GatewayController";

const gatewayRoutes = express.Router();


gatewayRoutes.post("/createTransaction",GatewayController.store);
gatewayRoutes.post("/createPixTransaction",GatewayController.storePixTransaction);

export default gatewayRoutes;
