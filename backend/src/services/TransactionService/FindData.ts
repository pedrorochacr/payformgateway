import Transaction from "../../models/Transaction"; 
import Customer from "../../models/Customer";

interface TransactionCustomerData {
    amount: number;
    customer: any;
}

const FindData = async (id: string): Promise<TransactionCustomerData> => {
    const transaction = await Transaction.findByPk(id);


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
        throw new Error(`Customer with id ${transaction.customerId} not found`);
    }

    return {
        amount: transaction.amount,
        customer: customer
    };
};

export default FindData;