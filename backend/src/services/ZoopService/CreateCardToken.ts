import axios from "axios";
import Card from "../../models/Card";
import AssociateCardCostumer from "./AssociateCardCostumer";

interface CreditCard {
    numberCard: number;
    CVV: number;
    name: string;
    expirationDate: string;
}

const CreateCardToken = async (
    creditCard: CreditCard,
    costumerId: string
): Promise<any> => {
    const existingCard = await Card.findOne({ where: { customerId: costumerId } });
    const [month, year] = creditCard.expirationDate.split('/').map(Number);
    const fullYear = year + 2000;
    let card;

    const reqData = {
        card_number: creditCard.numberCard,
        holder_name: creditCard.name,
        expiration_month: month,
        expiration_year: fullYear,
        security_code: creditCard.CVV
    }

    const headers = {
        ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
    }
    try {
        const creditToken = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/cards/tokens`, reqData, { headers });
        if (existingCard) {
            card = await Card.update(
                { id: creditToken.data.card.id },
                { where: { customerId: costumerId } }
            );
        } else {
            card = await Card.create({
                id: creditToken.data.card.id,
                customerId: costumerId
            });
        }

        const associate = await AssociateCardCostumer(costumerId, creditToken.data.id);
        
        return card;

    } catch (e) {
        console.error(e.response)
    }
};

export default CreateCardToken;
