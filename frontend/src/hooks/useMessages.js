import { useEffect, useState } from "react";
import api from "../lib/api";
import useConversationStore from "@/store/conversation.store";

export const useMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedConversation, messages } = useConversationStore(
    (state) => state
  );

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConversation) return;
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await api.get(
          `/api/messages/${selectedConversation._id}`
        );
        useConversationStore.setState({ messages: data });
      } catch (error) {
        setError(error);
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [selectedConversation]);

  return { messages, isLoading, error, selectedConversation };
};
