import axios from "axios";

type boleto = any;
const CreateBoletoTransaction = async (
    value: number,
    costumerId: string
): Promise<boleto> => {

    const reqData = {
        on_behalf_of: process.env.SELLER_ID,
        currency: "BRL",
        amount: value,
        payment_type: "boleto",
        customer: costumerId
    }

    const headers = {
        ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
    }
    try {
        const boletoTransaction = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/transactions`, reqData, { headers })
        
        return boletoTransaction.data.payment_method.url;

    } catch (e) {
        console.error(e.response)
    }


};

export default CreateBoletoTransaction;