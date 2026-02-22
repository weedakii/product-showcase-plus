// src/hooks/api/messages.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

export const useAdminMessages = (params?: {
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["admin-messages", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<ContactMessage[]>>(
        "/admin/messages",
        { params },
      );
      return data.data ?? [];
    },
  });
};

export const useMarkMessageRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.post(`/admin/messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
    },
  });
};
