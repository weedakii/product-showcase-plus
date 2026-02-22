// src/hooks/api/settings.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

export interface SiteSettings {
  site_name: string;
  email: string;
  phone?: string;
  address?: string;
  currency: string;
  maintenance_mode: boolean;
  // ... add more fields as needed
}

export const useAdminSettings = () => {
  return useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } =
        await apiClient.get<ApiResponse<SiteSettings>>("/admin/settings");
      return data.data;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      const { data: response } = await apiClient.put<ApiResponse<SiteSettings>>(
        "/admin/settings",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
  });
};
