import { motion } from "framer-motion";
import { ArrowRight, User, Phone, Mail, MapPin, ShoppingCart, Loader2 } from "lucide-react";
import { useCustomerDetails } from "@/hooks/use-api";

interface CustomerDetailsProps {
  customerId: string;
  onBack: () => void;
}

const CustomerDetailsPage = ({ customerId, onBack }: CustomerDetailsProps) => {
  const { data: customer, isLoading } = useCustomerDetails(parseInt(customerId));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
        <p className="text-muted-foreground mt-4">جاري تحميل تفاصيل العميل...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">العميل غير موجود</p>
        <button onClick={onBack} className="text-primary mt-4 hover:underline">العودة للعملاء</button>
      </div>
    );
  }

  return (
    <div>
      <motion.button whileHover={{ x: 4 }} onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowRight size={16} />
        العودة إلى العملاء
      </motion.button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-foreground">العميل #{customer.id}</h2>
          <p className="text-sm text-muted-foreground">تاريخ التسجيل: {customer.created_at?.split("T")[0] || "غير متوفر"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border/50 p-5">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <User size={18} />
            معلومات العميل
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User size={15} className="text-muted-foreground shrink-0" />
              <span className="text-foreground">{customer.name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={15} className="text-muted-foreground shrink-0" />
              <span className="text-foreground">{customer.email || "غير متوفر"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={15} className="text-muted-foreground shrink-0" />
              <span className="text-foreground">{customer.phone || "غير متوفر"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={15} className="text-muted-foreground shrink-0" />
              <span className="text-foreground">{(customer as any).address || "غير متوفر"}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-5">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <ShoppingCart size={18} />
            معلومات إضافية
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">عدد الطلبات</span>
              <span className="text-foreground font-medium">{customer.orders_count ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">إجمالي المشتريات</span>
              <span className="text-foreground font-medium">{customer.total_spent ?? "0"} ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
