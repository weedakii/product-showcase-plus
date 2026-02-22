// api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  status?: number;
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: "admin" | "customer" | "guest";
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_in?: number;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string | null;
  parent_id?: number | null;
  children?: Category[];
  product_count?: number;
  created_at?: string;
}

export interface Product {
  id: number;
  name: string;
  slug?: string;
  category_id: number;
  category?: Category;
  price: string; // e.g. "149.99" or "١٤٩٫٩٩"
  sale_price?: string | null;
  stock: number;
  status: "available" | "out_of_stock" | "coming_soon" | "discontinued";
  description?: string;
  short_description?: string;
  image_url?: string | null;
  gallery?: string[]; // additional images
  sku?: string;
  weight?: number;
  dimensions?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_image?: string | null;
  quantity: number;
  price: string; // unit price at time of order
  total: string;
  created_at?: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_address?: string;
  total_price: string;
  subtotal?: string;
  shipping_cost?: string;
  discount?: string;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  payment_method?:
    | "cash_on_delivery"
    | "credit_card"
    | "bank_transfer"
    | "paypal"
    | "other";
  payment_status?: "pending" | "paid" | "failed" | "refunded";
  shipping_method?: string;
  tracking_number?: string | null;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at?: string;
}

export interface DashboardStats {
  total_sales: string;
  total_orders: number;
  total_products: number;
  total_customers: number;
  average_order_value?: string;
  recent_orders: Order[];
  sales_chart: Array<{
    date: string; // e.g. "2025-02-01" or "Feb 2025"
    amount: number;
    orders?: number;
  }>;
  top_products?: Array<{
    id: number;
    name: string;
    total_sold: number;
    revenue: string;
  }>;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type?: "order" | "customer" | "product" | "system" | "review";
  read_at: string | null;
  created_at: string;
  data?: Record<string, any>; // e.g. { order_id: 123, product_id: 45 }
}

// Optional: for pagination responses
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
