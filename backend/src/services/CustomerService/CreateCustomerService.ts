import Customer from "../../models/Customer";
import Transaction from "../../models/Transaction";
import CreateBuyerService from "../ZoopService/CreateBuyerService";
import CreateTransaction from '../TransactionService/CreateTransaction';

interface CustomerData {
  marketplaceId: string
  first_name: string;
  customerZoopId?: string;
  state: string;
  city: string;
  last_name: string
  cpf: string
  line1: string; 
  line2: string; 
  line3: string; 
  postal_code: string; 
  country_code: string; 
  neighborhood: string;
  orderId: number;
}

const CreatePayRequest = async (
  customerData: CustomerData,
  value: number
): Promise<Transaction> => {
  let customer = await Customer.findOne({
     where: {cpf:customerData.cpf}
  })
  
  if(!customer){
    const buyerZoopId = await CreateBuyerService(customerData);
    customerData.customerZoopId = buyerZoopId;
    customer = await Customer.create(customerData)
  }
  
  const transaction = await CreateTransaction(customer.customerZoopId, customerData.orderId, value);

  return transaction;
};

export default CreatePayRequest;
