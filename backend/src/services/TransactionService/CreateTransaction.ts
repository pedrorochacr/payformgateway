import Transaction from "../../models/Transaction"; 
import { v4 as uuidv4 } from 'uuid'; 

const CreateTransaction = async (
  customerId: string,
  value: number
): Promise<Transaction> => {
  
  const newTransaction = await Transaction.create({ 
     customerId: customerId, 
     amount: value*100,
     id: uuidv4()
  });

  return newTransaction;
};

export default CreateTransaction;