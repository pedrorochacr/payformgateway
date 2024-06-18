import { Request, Response } from "express";
import ShowCustomerService from "../services/CustomerService/ShowCustomerService";
// import { getIO } from "../libs/socket";


export const show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const customer = ShowCustomerService(id);

    return res.status(200).json(customer);
};

