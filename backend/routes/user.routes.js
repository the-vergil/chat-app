import express, { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(protectRoute, getUsersForSidebar);

export const userRoutes = router;