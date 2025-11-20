import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { createServer } from "http";
import initializeSocket from "./socket/socket.js";

//------------------------------------------------------------------------------//

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = initializeSocket(httpServer);

app.use((req, res, next) => {
  req.io = io;
  next();
});

//------------------------------------------------------------------------------//

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//------------------------------------------------------------------------------//

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

//------------------------------------------------------------------------------//

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

app.use(notFound);
app.use(errorHandler);

//------------------------------------------------------------------------------//

const PORT = process.env.PORT || 5000;

try {
  await connectDB();

  httpServer.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
} catch (error) {
  console.log("Failed to start server due to database connection error.");
  process.exit(1);
}
