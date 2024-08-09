import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import Transaction from "../../models/Transaction";
import axios from "axios";

class WebHookService {
  public async handleWebhook(req: Request, res: Response): Promise<Response> {
    const { payload, type } = req.body;
    if (type == "transaction.succeeded") {
      const data = payload.object; //transação vinda do webhook
      console.log("transação vinda do Webhook",data )
      const transaction = await Transaction.findOne({
        where: {
          transactionZoopId: data.id
        }
      })
      if (!transaction) {
        return res.status(200).json({ message: "Transação não encontrada em nossa base" });
      } else {
        const wooData = {
          referenceId: transaction.orderId,
          status: 'paid'
        }
        console.log("dado enviado para o woocommerce",wooData)
        try {
          await axios.post(`${process.env.WOO_WEBSITE}/wc-api/wc_multipay_gateway/`, wooData, {
            headers: {
              'Content-Type': 'application/json',
            }
          })

        } catch (error) {
          console.error(error)
        }
      }
    }



    // try{
    //     await axios.post(`${process.env.WOO_WEBSITE}/wc-api/wc_multipay_gateway/`, data, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })

    // } catch(error){
    //     console.error(error)
    // }


    return res.status(200).json({ message: "Evento recebido com sucesso" });

  }
}

export default new WebHookService();
