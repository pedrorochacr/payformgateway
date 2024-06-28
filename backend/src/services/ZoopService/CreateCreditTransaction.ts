import axios from "axios";
import Customer from "../../models/Customer";

interface CreditCard {
    numberCard: number;
    CVV: number;
    name: string;
    expirationDate: string;
}

const CreateCreditTransaction = async (
    value: number,
    creditCard: CreditCard
): Promise<string> => {
    const [month, year] = creditCard.expirationDate.split('/').map(Number);
    const fullYear = year + 2000;
    const expirationDate = new Date(fullYear, month - 1);
    expirationDate.setDate(new Date(fullYear, month, 0).getDate());

    const reqData = {
        on_behalf_of: process.env.SELLER_ID,
        payment_type: "credit",
        source: {
            currency: "BRL",
            amount: value,
            type: "card",
            usage: "single_use",
            card: {
                card_number: creditCard.numberCard,
                holder_name: creditCard.name,
                expiration_month: expirationDate.getMonth(),
                expiration_year: expirationDate.getFullYear(),
                security_code: creditCard.CVV
            }
        }
    }

    const headers = {
        ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
    }
    try {
        const creditTransaction = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/transactions`, reqData, { headers })
        return creditTransaction.data;

    } catch (e) {
        console.error(e.response)
    }


};

export default CreateCreditTransaction;