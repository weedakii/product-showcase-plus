import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (formData: any) => {
      const { data } = await apiClient.post("/contact", formData);
      return data;
    },
  });
};
