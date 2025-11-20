import React from "react";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import useConversationStore from "@/store/conversation.store";
import api from "../../lib/api";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const { logoutUser } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      logoutUser();
      const { setSelectedConversation } = useConversationStore(
        (state) => state
      );
      setSelectedConversation(null);
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
