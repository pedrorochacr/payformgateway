import axios from "axios";
import Customer from "../../models/Customer";

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
}

const CreateBuyerService = async (
  customerData: CustomerData
): Promise<string> => {
  const { first_name, last_name, cpf, marketplaceId, line1, line2, line3, state, city, postal_code, country_code, neighborhood } = customerData
  const address = {
    line1: line1,
    line2: line2,
    line3: line3,
    city: city,
    state: state,
    postal_code: postal_code,
    country_code: country_code,
    neighborhood: neighborhood
  }
  const taxpayer_id = cpf;

  const reqData = {
    first_name,
    last_name,
    taxpayer_id,
    address
  }
  const headers = {
    ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
  }
  try {
    const customer = await axios.post(`${process.env.ZOOP_API_URL}/${marketplaceId}/buyers`, reqData, { headers })
    const { id } = customer.data;
    return id;

  } catch (e) {
    console.error(e)
  }


};

export default CreateBuyerService;
