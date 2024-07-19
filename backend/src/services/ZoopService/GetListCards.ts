import axios from "axios";
import Card from "../../models/Card";

const GetListCards = async (
    customerZoopId: string
): Promise<any[]> => {

    const card = await Card.findOne({ 
        where: {
            customerId: customerZoopId
        }
    });
    
    const headers = {
        ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
    }
    try {
        const response = await axios.get(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/cards/${card.dataValues.id}`, { headers });
        return response.data;
    } catch (e) {
        console.error(e.response);
    }
    
};

export default GetListCards;
