import Transaction from "../../models/Transaction"; 
import Customer from "../../models/Customer";

interface TransactionCustomerData {
    amount: number;
    customerName: string;
}

const FindData = async (id: string): Promise<TransactionCustomerData> => {
    const transaction = await Transaction.findByPk(id);
    
    if (!transaction) {
        throw new Error(`Transaction with id ${id} not found`);
    }

    const customer = await Customer.findByPk(transaction.customerId);

    if (!customer) {
        throw new Error(`Customer with id ${transaction.customerId} not found`);
    }

    return {
        amount: transaction.amount,
        customerName: customer.first_name
    };
};

export default FindData;