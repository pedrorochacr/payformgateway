import { Router } from "express";


import customerRoutes from "./customerRoutes";
import transactionRoutes from "./transactionRoutes";
import gatewayRoutes from "./gatewayRoutes";
const routes = Router();

routes.use(customerRoutes);
routes.use(transactionRoutes);
routes.use(gatewayRoutes);



export default routes;
