// src/hooks/api/customers.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse, User } from "@/types/api";

export interface Customer extends User {
  orders_count?: number;
  total_spent?: string;
  last_order_at?: string | null;
}

export const useAdminCustomers = (params?: { search?: string }) => {
  return useQuery({
    queryKey: ["admin-customers", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Customer[]>>(
        "/admin/customers",
        { params },
      );
      return data.data ?? [];
    },
  });
};

export const useCustomerDetails = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Customer>>(
        `/admin/customers/${id}`,
      );
      return data.data;
    },
    enabled: !!id,
  });
};
