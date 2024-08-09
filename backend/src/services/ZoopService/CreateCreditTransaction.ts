import axios from "axios";
import Customer from "../../models/Customer";
import CreateCardToken from "./CreateCardToken";

interface CreditCard {
    numberCard: number;
    CVV: number;
    name: string;
    expirationDate: string;
}

const CreateCreditTransaction = async (
    value: number,
    creditCard: CreditCard,
    installmentNumber: number,
    rememberCard: boolean,
    costumerId: string,
    cardId: string 
): Promise<any> => {
    if (rememberCard) {
        const response = await CreateCardToken(creditCard, costumerId);
    }
    const [month, year] = creditCard.expirationDate.split('/').map(Number);
    const fullYear = year + 2000;
    
    const headers = {
        ' Authorization': 'Basic ' + Buffer.from(`${process.env.ZOOP_API_USERNAME}:`).toString('base64')
    }
    const reqData = {
        on_behalf_of: process.env.SELLER_ID,
        payment_type: "credit",
        installment_plan: installmentNumber,
        source: {
            currency: "BRL",
            amount: value,
            type: "card",
            usage: "single_use",
            card: cardId ? { id: cardId } : {
                card_number: creditCard.numberCard,
                holder_name: creditCard.name,
                expiration_month: month,
                expiration_year: fullYear,
                security_code: creditCard.CVV
            }
        }
    };
    try {
        const creditTransaction = await axios.post(`${process.env.ZOOP_API_URL}/${process.env.MARKETPLACE_ID}/transactions`, reqData, { headers });
        return creditTransaction.data;
    } catch (e) {
        console.error(e.response)
    }   
    

};

export default CreateCreditTransaction;