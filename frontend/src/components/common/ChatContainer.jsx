import useConversationStore from "@/store/conversation.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { selectedConversation } = useConversationStore((state) => state);

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          Select a user from the sidebar to start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b space-x-3">
        <Avatar>
          <AvatarImage
            src={selectedConversation.avatarUrl || "/placeholder-avatar.png"}
          />
          <AvatarFallback>
            {selectedConversation.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">
          {selectedConversation.username}
        </h2>
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
