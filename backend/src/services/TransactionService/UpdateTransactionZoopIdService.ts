import Transaction from "../../models/Transaction"; 
import { v4 as uuidv4 } from 'uuid'; 

const UpdateTransactionZoopIdService = async (
  id: string,
  transactionZoopId: string
): Promise<void> => {

    console.log("zoop Id Recebido", transactionZoopId)
  const oldTransaction = await Transaction.findByPk(id);
  oldTransaction.transactionZoopId = transactionZoopId;
  oldTransaction.save();


};

export default UpdateTransactionZoopIdService;