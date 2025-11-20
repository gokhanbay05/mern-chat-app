import { toast } from "react-hot-toast";
import api from "../lib/api";
import useConversationStore from "@/store/conversation.store";
import { useState } from "react";

export const useSendMessage = () => {
  const { selectedConversation, addMessage } = useConversationStore(
    (state) => state
  );
  const [isPending, setIsPending] = useState(false);

  const sendMessage = async (text) => {
    try {
      setIsPending(true);
      const { data } = await api.post(
        `/api/messages/${selectedConversation._id}`,
        { text }
      );
      addMessage(data);
    } catch (error) {
      toast.error("Failed to send message, please try again later");
    } finally {
      setIsPending(false);
    }
  };

  return { sendMessage, isPending };
};
