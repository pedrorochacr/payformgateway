import axios from "axios";


const CreatePixTransaction = async (
  value: number
): Promise<any> => {
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
    const pixTransaction = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/transactions`, reqData, {headers});
    return {
      qrCode: pixTransaction.data.payment_method.qr_code.emv,
      id: pixTransaction.data.id
    };

   } catch(e){
    console.error(e.response)
   }
   

};

export default CreatePixTransaction;