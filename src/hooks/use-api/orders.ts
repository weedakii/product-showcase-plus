import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse, Order } from "@/types/api";

export const useAdminOrders = (params?: { status?: string }) => {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Order[]>>("/admin/orders", { params });
      return data.data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Order>>(`/admin/orders/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const { data } = await apiClient.put<ApiResponse<Order>>(`/admin/orders/${id}`, { status });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
};
