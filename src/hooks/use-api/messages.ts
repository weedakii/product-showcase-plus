import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse, ContactMessage } from "@/types/api";

export const useAdminMessages = (params?: { status?: string; search?: string }) => {
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
