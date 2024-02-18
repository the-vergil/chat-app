import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/:id").get(protectRoute, getMessages);
router.route("/send/:id").post(protectRoute, sendMessage);

export const messageRoutes = router;