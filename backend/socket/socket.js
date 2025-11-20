import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/user.model.js";

const userSocketMap = {};

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const cookieHeader = socket.handshake.headers.cookie;
      if (!cookieHeader) {
        throw new Error("Authentication error: No cookie provided");
      }

      const cookies = cookie.parse(cookieHeader);
      const token = cookies.jwt_token;
      if (!token) {
        throw new Error("Authentication error: No token found");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.id) {
        throw new Error("Authentication error: Invalid token");
      }

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        throw new Error("Authentication error: User not found");
      }

      socket.user = user;
      next();
    } catch (error) {
      console.log("Socket connection error:", error.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.username} (ID: ${socket.id})`);

    const userId = socket.user._id.toString();
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${socket.user.username} (ID: ${socket.id})`
      );
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export default initializeSocket;
