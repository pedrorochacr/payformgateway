import axios from "axios";
import Customer from "../../models/Customer";


const CreatePixTransaction = async (
  value: number
): Promise<string> => {
   const reqData = {
    on_behalf_of: process.env.SELLER_ID,
    currency: "BRL",
    amount: value,
    payment_type: "pix",
 
   }
   
   const headers  ={
    ' Authorization': 'Basic ' +Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
   }
   try{
    const pixTransaction = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/transactions`, reqData, {headers})
    return pixTransaction.data.payment_method.qr_code.emv;

   } catch(e){
    console.error(e.response)
   }
   

};

export default CreatePixTransaction;