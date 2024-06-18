import Customer from "../../models/Customer";
import CreateBuyerService from "../ZoopService/CreateBuyerService";

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
  customerData: CustomerData
): Promise<Customer> => {
  let customer = await Customer.findOne({
     where: {cpf:customerData.cpf}
  })
  
  if(!customer){
    const buyerZoopId = await CreateBuyerService(customerData);
    customerData.customerZoopId = buyerZoopId;
    console.log(customerData);
    customer = await Customer.create(customerData)
  }


  return customer;
};

export default CreateOrShowCustomerService;
