import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Clock, CheckCircle2, Package, Loader2 } from "lucide-react";
import { useAdminOrders } from "@/hooks/use-api";

const statusMap: Record<string, string> = {
  pending: "جديد",
  processing: "قيد التنفيذ",
  shipped: "تم الشحن",
  delivered: "مكتمل",
  cancelled: "ملغي",
  refunded: "مسترجع",
};

const OrdersManagement = ({ onViewOrder }: { onViewOrder: (id: string) => void }) => {
  const [search, setSearch] = useState("");
  const { data: orders, isLoading } = useAdminOrders();

  const filteredOrders = orders?.filter(order =>
    order.id.toString().includes(search) ||
    order.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input type="text" placeholder="بحث عن طلب..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pr-9 pl-4 py-2 rounded-lg border border-border bg-card text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
              <p className="text-muted-foreground mt-4 text-sm">جاري تحميل قائمة الطلبات...</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">رقم الطلب</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">العميل</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden sm:table-cell">التاريخ</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">المبلغ</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">الحالة</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order) => (
                  <motion.tr key={order.id} whileHover={{ backgroundColor: "hsl(35, 20%, 92%)" }} className="border-b border-border/50">
                    <td className="px-6 py-3 font-medium text-foreground">#{order.id}</td>
                    <td className="px-6 py-3 text-foreground">{order.customer_name}</td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">{order.created_at?.split('T')[0]}</td>
                    <td className="px-6 py-3 font-medium text-foreground">{order.total_price}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered" ? "bg-primary/10 text-primary" :
                        order.status === "processing" ? "bg-accent/10 text-accent" :
                        "bg-secondary text-foreground"
                      }`}>
                        {order.status === "delivered" && <CheckCircle2 size={12} />}
                        {order.status === "processing" && <Clock size={12} />}
                        {statusMap[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <motion.button whileHover={{ scale: 1.05, x: -4 }} whileTap={{ scale: 0.95 }}
                        onClick={() => onViewOrder(order.id.toString())}
                        className="flex items-center gap-1.5 text-primary font-medium hover:underline">
                        <span>التفاصيل</span>
                        <Eye size={14} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
                {(!filteredOrders || filteredOrders.length === 0) && (
                  <tr><td colSpan={6} className="text-center py-20 text-muted-foreground">
                    <Package className="mx-auto mb-3 opacity-20" size={48} />
                    لا توجد طلبات متوفرة
                  </td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;
