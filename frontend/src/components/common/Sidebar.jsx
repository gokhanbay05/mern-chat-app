import useConversationStore from "@/store/conversation.store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";
import { useUsers } from "@/hooks/useUsers";

const Sidebar = () => {
  const { selectedConversation, setSelectedConversation, onlineUsers } =
    useConversationStore((state) => state);

  const { users, isLoading, error } = useUsers();

  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading users</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <ScrollArea className="flex-1 p-4 min-h-0">
        <div className="space-y-2">
          {users?.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            return (
              <div
                key={user._id}
                className={`flex items-center p-2 rounded-lg cursor-pointer space-x-3 ${
                  selectedConversation?._id === user._id
                    ? "bg-muted"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedConversation(user)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={user.avatarUrl || "/placeholder-avatar.png"}
                    />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Start a conversation
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
