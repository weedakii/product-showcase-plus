// src/hooks/api/reports.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/types/api";

// You can adjust the type according to what your backend actually returns
export interface ReportData {
  sales_data: Array<{ month: string; sales: number; orders?: number }>;
  product_data: Array<{ name: string; sales: number; revenue: string }>;
  // add more fields if your /admin/reports endpoint returns more
}

export const useAdminReports = () => {
  return useQuery<ReportData>({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const { data } =
        await apiClient.get<ApiResponse<ReportData>>("/admin/reports");
      return (
        data.data ?? {
          sales_data: [],
          product_data: [],
        }
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
