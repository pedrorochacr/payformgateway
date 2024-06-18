import { Request, Response } from "express";
import CreateOrShowCustomerService from "../services/CustomerService/CreateCustomerService";
// import { getIO } from "../libs/socket";


export const store = async (req: Request, res: Response): Promise<Response> => {
  
    // const { marketplaceId, customerZoopId, firstName,lastName, cpf  } = req.body;

    // const customerData = {
    //     marketplaceId, customerZoopId, firstName,lastName, cpf
    // }
    // const customer =await  CreateOrShowCustomerService(customerData);

    // return res.status(200).json({customer, payLink: `http:localhost:3000${customer.id}`});
};

