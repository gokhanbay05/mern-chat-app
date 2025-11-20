import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/auth.store";
import useConversationStore from "../store/conversation.store";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const useSocket = () => {
  const socketRef = useRef(null);
  const { user: authUser } = useAuthStore((state) => state);
  const { setOnlineUsers, addMessage } = useConversationStore((state) => state);

  useEffect(() => {
    if (!authUser) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (socketRef.current) {
      return;
    }

    const socket = io(VITE_API_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("newMessage", (newMessage) => {
      const { selectedConversation } = useConversationStore.getState();

      if (
        selectedConversation &&
        newMessage.sender === selectedConversation._id
      ) {
        addMessage(newMessage);
      } else {
        toast(`New message!`, { icon: "📬" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setOnlineUsers([]);
    });

    return () => {
      console.log("Cleaning up socket effect");
      socket.off("getOnlineUsers");
      socket.off("newMessage");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [authUser, addMessage, setOnlineUsers]);
};

export default useSocket;
