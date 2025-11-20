import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getMessages);
router.post("/:id", isAuthenticated, sendMessage);

export default router;
