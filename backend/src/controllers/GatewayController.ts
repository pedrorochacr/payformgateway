import { Request, Response } from "express";
import CreatePixTransation from "../services/ZoopService/CreatePixTransaction";
import CreatePayRequest from "../services/CustomerService/CreateCustomerService";
import CreateCreditTransaction from "../services/ZoopService/CreateCreditTransaction";
import CreateBoletoTransaction from "../services/ZoopService/CreateBoletoTransaction";

import axios from "axios";
import UpdateTransactionZoopIdService from "../services/TransactionService/UpdateTransactionZoopIdService";
import { broadcast } from "../websocketServer";
// import { getIO } from "../libs/socket";


export const store = async (req: Request, res: Response): Promise<Response> => {
  
    const { marketplaceId, first_name,last_name, cpf, line1, line2, line3, state, city, postal_code, country_code, neighborhood, value, orderId } = req.body;

    const customerData = {
        marketplaceId, first_name, last_name, cpf, line1, line2, line3, state, city, postal_code, country_code, neighborhood, orderId
    }
    const transaction = await  CreatePayRequest(customerData, value);


    return res.status(200).json({referenceId: transaction.orderId, payLink: `${process.env.FRONTEND_URL}/?id=${transaction.id}`});
};

export const storePixTransaction = async (req: Request, res: Response): Promise<Response> => {
  
    const {value, transactionId} = req.body;

    console.log("transactionId Recebido", transactionId)
    const pixTransaction = await CreatePixTransation(value);
    console.log("id zoop criado", pixTransaction)
    await UpdateTransactionZoopIdService(transactionId, pixTransaction.id );
    

    return res.status(200).json({pixTransaction});
};

export const storeCreditTransaction = async (req: Request, res: Response): Promise<Response> => {

    const { numberCard, CVV, name, expirationDate, value, orderId, installmentNumber, rememberCard, costumerId, cardId, transactionId} = req.body;

    const creditCard = {
        numberCard, CVV, name, expirationDate
    }

    console.log("transactionId Recebido", transactionId)
    const creditTransaction = await CreateCreditTransaction(value, creditCard, installmentNumber, rememberCard, costumerId, cardId);
    console.log("id zoop criado", creditTransaction.id)

    await UpdateTransactionZoopIdService(transactionId, creditTransaction.id )
    // try{
    //     await axios.post(`${process.env.WOO_WEBSITE}/wc-api/wc_multipay_gateway/`, data, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })

    // } catch(error){
    //     console.error(error)
    // }
   
    return res.status(200).json({creditTransaction});
};

export const storeBoletoTransaction = async (req: Request, res: Response): Promise<Response> => {
  
    const {value, costumerId, transactionId} = req.body;

    console.log("transactionId Recebido", transactionId)

    const boletoTransaction = await CreateBoletoTransaction(value, costumerId);

    console.log("id zoop criado", boletoTransaction.id)

    await UpdateTransactionZoopIdService(transactionId, boletoTransaction.id )
    return res.status(200).json({boletoTransaction});
};