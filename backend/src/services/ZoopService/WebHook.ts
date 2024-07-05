import { Request, Response } from "express";
import { logger } from "../../utils/logger";

class WebHookService {
  public async handleWebhook(req: Request, res: Response): Promise<Response> {
    console.log(req.body);
    const { event } = req.body;

    try {
      // Verifique se é um ping
      if (event.type === "ping") {
        logger.info("Ping recebido");
      }

      // Trate o evento recebido
      logger.info("Evento recebido:", event);

      // Implemente a lógica para processar o evento aqui
      // Exemplo: Armazenar em uma fila, banco de dados, etc.

      return res.status(200).send("Evento recebido com sucesso");
    } catch (error) {
      logger.error("Erro ao processar o evento:", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }
}

export default new WebHookService();
