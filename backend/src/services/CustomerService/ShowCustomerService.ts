import Customer from "../../models/Customer";

const ShowCustomerService = async (
  id: string |number
): Promise<Customer> => {
  
  const  customer = Customer.findByPk(id)

  return customer;
};

export default ShowCustomerService;
