import { Router } from "express";
import WebHookService from "../services/ZoopService/WebHook";

const router = Router();

router.post("/webhook", WebHookService.handleWebhook);

export default router;