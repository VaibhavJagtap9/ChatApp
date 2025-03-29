import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();
router.post("/send/:_id", secureRoute, sendMessage);
router.get("/get/:_id", secureRoute, getMessage);

export default router;