import Transaction from "../../models/Transaction"; 
import Customer from "../../models/Customer";
import GetListCards from "../ZoopService/GetListCards";

interface TransactionCustomerData {
    amount: number;
    customer: any;
    orderId: number;
    card: any;
}

const FindData = async (id: string): Promise<TransactionCustomerData> => {
    const transaction = await Transaction.findByPk(id);
   // console.log(transaction);

    const customerZoopId: string = transaction.customerId;

    if (!transaction) {
        throw new Error(`Transaction with id ${id} not found`);
    }

    const customer = await Customer.findOne({
        where: {
          customerZoopId: customerZoopId
        }
      });

    if (!customer) {
        throw new Error(`Customer with id ${transaction.dataValues.customerId} not found`);
    }

    const card = await GetListCards(customerZoopId);

    return {
        amount: transaction.amount,
        orderId: transaction.orderId,
        customer: customer,
        card: card
    };
};

export default FindData;