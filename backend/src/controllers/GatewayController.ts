import { Request, Response } from "express";
import CreateOrShowCustomerService from "../services/CustomerService/CreateCustomerService";
// import { getIO } from "../libs/socket";


export const store = async (req: Request, res: Response): Promise<Response> => {
  
    const { marketplaceId, first_name,last_name, cpf,address_1,state, city } = req.body;

    const customerData = {
        marketplaceId, first_name,last_name, cpf,address_1,state, city
    }
    const customer =await  CreateOrShowCustomerService(customerData);

    return res.status(200).json({customer, payLink: `${process.env.FRONTEND_URL}/${customer.id}`});
};

