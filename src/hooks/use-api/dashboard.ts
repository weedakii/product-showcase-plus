import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse, DashboardStats, Home } from "@/types/api";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<DashboardStats>>("/admin/dashboard");
      return data.data;
    },
  });
};

export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Home[]>>("/home");
      return data.data;
    },
  });
};
