import express from "express";

import * as GatewayController from "../controllers/GatewayController";

const gatewayRoutes = express.Router();


gatewayRoutes.post("/createTransaction",GatewayController.store);

export default gatewayRoutes;
