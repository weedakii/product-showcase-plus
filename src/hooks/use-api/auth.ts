import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ApiResponse, AuthResponse } from "@/types/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        credentials,
      );
      return data.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("adhlal_token", data.token);
      localStorage.setItem("adhlal_user", JSON.stringify(data.user));
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    },
    onSettled: () => {
      localStorage.removeItem("adhlal_token");
      localStorage.removeItem("adhlal_user");
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};
