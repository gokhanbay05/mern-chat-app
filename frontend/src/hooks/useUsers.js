import { useState, useEffect } from "react";
import api from "../lib/api";
import { toast } from "react-hot-toast";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        setError(error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, isLoading, error };
};
