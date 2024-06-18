import axios from "axios";
import Customer from "../../models/Customer";

interface CustomerData {
  marketplaceId  : string
  first_name : string;
  customerZoopid?: string;
  address_1: string;
  state: string;
  city: string;
  last_name  : string
  cpf : string
}

const CreateBuyerService = async (
  customerData: CustomerData
): Promise<string> => {
   const { first_name, last_name, cpf, marketplaceId, address_1, state, city} = customerData
   const address ={
      line1: address_1,
      city,
      state
   }
   console.log(city);
   const reqData = {
    first_name,
    last_name,
        cpf,
        address
   }
   const headers  ={
    ' Authorization': 'Basic ' +Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
   }
   try{
    const customer= await axios.post(`${process.env.ZOOP_API_URL}/${marketplaceId}/buyers`, reqData,{headers})
    const {id} = customer.data;
    return id;

   } catch(e){
    console.error(e)
   }
   

};

export default CreateBuyerService;
