import { Request, Response } from "express";
import CreatePixTransation from "../services/ZoopService/CreatePixTransaction";
import CreatePayRequest from "../services/CustomerService/CreateCustomerService";
// import { getIO } from "../libs/socket";


export const store = async (req: Request, res: Response): Promise<Response> => {
  
    const { marketplaceId, first_name,last_name, cpf,address_1,state, city, value } = req.body;

    const customerData = {
        marketplaceId, first_name,last_name, cpf,address_1,state, city
    }
    const transaction = await  CreatePayRequest(customerData, value);

    return res.status(200).json({transaction, payLink: `${process.env.FRONTEND_URL}/?id=${transaction.id}`});
};

export const storePixTransaction = async (req: Request, res: Response): Promise<Response> => {
  
    const {value} = req.body;

    const pixTransaction = await CreatePixTransation(value);

    return res.status(200).json({pixTransaction});
};