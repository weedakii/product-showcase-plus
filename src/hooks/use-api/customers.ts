import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse, Customer } from "@/types/api";

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
