import { motion } from "framer-motion";
import { ArrowRight, Package, Truck, CheckCircle, Clock, Phone, Mail, User, CreditCard, Loader2 } from "lucide-react";
import { useOrderDetails, useUpdateOrder } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";

interface OrderDetailsProps {
  orderId: string;
  onBack: () => void;
}

const statusMap: Record<string, string> = {
  pending: "جديد",
  processing: "قيد التنفيذ",
  shipped: "تم الشحن",
  delivered: "مكتمل",
  cancelled: "ملغي",
  refunded: "مسترجع",
};

const OrderDetailsPage = ({ orderId, onBack }: OrderDetailsProps) => {
  const { toast } = useToast();
  const { data: order, isLoading } = useOrderDetails(parseInt(orderId));
  const updateMutation = useUpdateOrder();

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateMutation.mutateAsync({ id: parseInt(orderId), status: newStatus });
      toast({ title: "تم التحديث", description: `تم تغيير حالة الطلب` });
    } catch {
      toast({ variant: "destructive", title: "خطأ", description: "فشل تحديث حالة الطلب" });
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-primary/10 text-primary";
      case "processing": return "bg-accent/10 text-accent";
      case "pending": return "bg-secondary text-foreground";
      case "cancelled": case "refunded": return "bg-destructive/10 text-destructive";
      default: return "bg-secondary text-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
        <p className="text-muted-foreground mt-4">جاري تحميل تفاصيل الطلب...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">الطلب غير موجود</p>
        <button onClick={onBack} className="text-primary mt-4 hover:underline">العودة للطلبات</button>
      </div>
    );
  }

  return (
    <div>
      <motion.button whileHover={{ x: 4 }} onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowRight size={16} />
        العودة إلى الطلبات
      </motion.button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-foreground">الطلب #{order.id}</h2>
          <p className="text-sm text-muted-foreground">تاريخ الطلب: {order.created_at?.split('T')[0]}</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={order.status} onChange={(e) => handleStatusUpdate(e.target.value)}
            disabled={updateMutation.isPending}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="pending">جديد</option>
            <option value="processing">قيد التنفيذ</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor(order.status)}`}>
            {statusMap[order.status] || order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-bold text-foreground flex items-center gap-2"><Package size={18} />المنتجات</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">المنتج</th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">الكمية</th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">اللون</th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">السعر</th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id} className="border-b border-border/50">
                      <td className="px-5 py-3 font-medium text-foreground">{item.product_name}</td>
                      <td className="px-5 py-3 text-foreground">{item.quantity}</td>
                      <td className="px-5 py-3 text-foreground">{item.color || "-"}</td>
                      <td className="px-5 py-3 text-foreground">{item.price}</td>
                      <td className="px-5 py-3 font-medium text-foreground">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 border-t border-border bg-muted/20 space-y-2">
              <div className="flex justify-between text-sm font-bold pt-2">
                <span className="text-foreground">الإجمالي</span>
                <span className="text-primary text-xl">{order.total_price}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-5">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-6"><Truck size={18} />حالة الطلب</h3>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${order.status === 'delivered' ? "bg-primary text-primary-foreground" : "bg-accent/10 text-accent"}`}>
                {order.status === 'delivered' ? <CheckCircle size={24} /> : <Clock size={24} />}
              </div>
              <div>
                <p className="font-bold text-foreground">{statusMap[order.status] || order.status}</p>
                <p className="text-sm text-muted-foreground">آخر تحديث للطلب</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4"><User size={18} />معلومات العميل</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={15} className="text-muted-foreground shrink-0" />
                <span className="text-foreground">{order.customer_name}</span>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={15} className="text-muted-foreground shrink-0" />
                  <span className="text-foreground" dir="ltr">{order.customer_phone}</span>
                </div>
              )}
              {order.customer_email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={15} className="text-muted-foreground shrink-0" />
                  <span className="text-foreground">{order.customer_email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-5">
            <h3 className="font-bold text-foreground flex items-center gap-2 mb-4"><CreditCard size={18} />معلومات إضافية</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">رقم الطلب</span>
                <span className="text-foreground font-medium">#{order.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">حالة الدفع</span>
                <span className="text-primary font-medium">{order.payment_status || "غير محدد"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
