import { create } from "zustand";

const useConversationStore = create((set) => ({
  selectedConversation: null,

  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  messages: [],
  setMessages: (messages) => set({ messages: messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));

export default useConversationStore;
