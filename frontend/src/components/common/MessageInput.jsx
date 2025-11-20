import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSendMessage } from "@/hooks/useSendMessage";

const MessageInput = () => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const { sendMessage, isPending } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 border-t space-x-2"
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" size="icon" disabled={isPending}>
        {isPending ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
