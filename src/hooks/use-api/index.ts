// Re-export all API hooks following Single Responsibility Principle
export { useLogin, useLogout } from "./auth";
export { useProducts, useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useProduct } from "./products";
export { useCategories, useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "./categories";
export { useAdminOrders, useOrderDetails, useUpdateOrder } from "./orders";
export { useAdminNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "./notifications";
export { useAdminStats, useHome } from "./dashboard";
export { useSubmitContact } from "./contact";


export { useAdminCustomers, useCustomerDetails } from "./customers";
export { useAdminMessages, useMarkMessageRead } from "./messages";
export { useAdminSettings, useUpdateSettings } from "./settings";
export { useAdminReports } from "./reports";
