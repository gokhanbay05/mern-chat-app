import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useMessages } from "@/hooks/useMessages";
import useAuthStore from "../../store/auth.store";

const MessageList = () => {
  const { messages, isLoading, error, selectedConversation } = useMessages();
  const { user: authUser } = useAuthStore((state) => state);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 p-4">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 text-red-500">Error loading messages.</div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4 min-h-0">
      <div className="flex flex-col space-y-4">
        {messages?.map((message) => {
          const isSender = message.sender === authUser.id;
          return (
            <div
              key={message._id}
              className={cn(
                "flex items-end max-w-xs md:max-w-md",
                isSender ? "self-end" : "self-start"
              )}
            >
              {!isSender && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src={
                      selectedConversation.avatarUrl ||
                      "/placeholder-avatar.png"
                    }
                  />
                  <AvatarFallback>
                    {selectedConversation.username
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg",
                  isSender
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <p>{message.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
