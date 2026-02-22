// CustomersManagement.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, User, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useAdminCustomers } from "@/hooks/use-api"; // Assuming a hook for fetching customers
import { Customer } from "@/types/api"; // Assuming Customer type

const CustomersManagement = ({
  onViewCustomer,
}: {
  onViewCustomer: (id: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const { data: customers, isLoading } = useAdminCustomers();

  const filteredCustomers = customers?.filter(
    (customer) =>
      customer.id.toString().includes(search) ||
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="بحث عن عميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 pl-4 py-2 rounded-lg border border-border bg-card text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
              <p className="text-muted-foreground mt-4 text-sm">
                جاري تحميل قائمة العملاء...
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    رقم العميل
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    الاسم
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden sm:table-cell">
                    البريد الإلكتروني
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden md:table-cell">
                    رقم الهاتف
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers?.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    whileHover={{ backgroundColor: "hsl(35, 20%, 92%)" }}
                    className="border-b border-border/50"
                  >
                    <td className="px-6 py-3 font-medium text-foreground">
                      #{customer.id}
                    </td>
                    <td className="px-6 py-3 text-foreground">
                      {customer.name}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">
                      {customer.email || "غير متوفر"}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">
                      {customer.phone || "غير متوفر"}
                    </td>
                    <td className="px-6 py-3">
                      <motion.button
                        whileHover={{ scale: 1.05, x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onViewCustomer(customer.id.toString())}
                        className="flex items-center gap-1.5 text-primary font-medium hover:underline"
                      >
                        <span>التفاصيل</span>
                        <Eye size={14} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
                {(!filteredCustomers || filteredCustomers.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-20 text-muted-foreground"
                    >
                      <User className="mx-auto mb-3 opacity-20" size={48} />
                      لا توجد عملاء متوفرين
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersManagement;
