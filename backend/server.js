import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes.js";
import { messageRoutes } from "./routes/message.routes.js";
import { userRoutes } from "./routes/user.routes.js"
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello world!!");
})

app.listen(PORT, () => {
    connectDB();
    console.log(`\n🛞  Server is running at PORT: ${PORT}`);
})