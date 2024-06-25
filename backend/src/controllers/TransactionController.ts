import { Request, Response } from "express";
import CreateOrShowCustomerService from "../services/CustomerService/CreateCustomerService";
import FindData from "../services/TransactionService/FindData";
// import { getIO } from "../libs/socket";


export const store = async (req: Request, res: Response): Promise<Response> => {
  
    const { marketplaceId, first_name, last_name, cpf, address_1, state, city, value  } = req.body;

    const customerData = {
        marketplaceId, first_name, last_name, cpf, address_1, state, city
    }
    const transaction = await  CreateOrShowCustomerService(customerData, value);

    return res.status(200).json({transaction, payLink: `http:localhost:3000/?id=${transaction.id}`});
};

export const findData = async (req: Request, res: Response): Promise<Response> => {
  
    const {id} = req.body;

    const data = await FindData(id);

    return res.status(200).json({amount: data.amount, name: data.customerName});
};


