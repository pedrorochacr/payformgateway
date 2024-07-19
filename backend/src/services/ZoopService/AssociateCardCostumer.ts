import axios from "axios";


const AssociateCardCostumer = async (
    costumerId: string,
    token: string
): Promise<any> => {

    const reqData = {
        token: token,
        customer: costumerId,
    }

    const headers = {
        ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
    }
    try {
        const response = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/cards`, reqData, { headers });
        
        return response;

    } catch (e) {
        console.error(e.response)
    }
};

export default AssociateCardCostumer;
