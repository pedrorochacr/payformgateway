import Customer from "../../models/Customer";
import Transaction from "../../models/Transaction";
import CreateBuyerService from "../ZoopService/CreateBuyerService";
import CreateTransaction from '../TransactionService/CreateTransaction';

interface CustomerData {
    marketplaceId  : string
    first_name : string;
    customerZoopId?: string;
    address_1: string;
    state: string;
    city: string;
    last_name  : string
    cpf : string
}

const CreateOrShowCustomerService = async (
  customerData: CustomerData,
  value: number
): Promise<Transaction> => {
  let customer = await Customer.findOne({
     where: {cpf:customerData.cpf}
  })
  
  if(!customer){
    const buyerZoopId = await CreateBuyerService(customerData);
    customerData.customerZoopId = buyerZoopId;
    console.log(customerData);
    customer = await Customer.create(customerData)
  }

  const transaction = await CreateTransaction(customer.id, value);

  return transaction;
};

export default CreateOrShowCustomerService;
