import { Request, Response } from "express";
import { logger } from "../../utils/logger";

class WebHookService {
  public async handleWebhook(req: Request, res: Response): Promise<Response> {
    

    console.log("Body Recebido",req.body);

       // try{
    //     await axios.post(`${process.env.WOO_WEBSITE}/wc-api/wc_multipay_gateway/`, data, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })

    // } catch(error){
    //     console.error(error)
    // }
   

      return res.status(200).json({message:"Evento recebido com sucesso"});

  }
}

export default new WebHookService();
