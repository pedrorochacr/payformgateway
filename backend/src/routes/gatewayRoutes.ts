import express from "express";

import * as GatewayController from "../controllers/GatewayController";

const gatewayRoutes = express.Router();


gatewayRoutes.post("/createTransaction",GatewayController.store);
gatewayRoutes.post("/createPixTransaction",GatewayController.storePixTransaction);
gatewayRoutes.post("/createCreditTransaction",GatewayController.storeCreditTransaction);
gatewayRoutes.post("/createBoletoTransaction",GatewayController.storeBoletoTransaction);

export default gatewayRoutes;
