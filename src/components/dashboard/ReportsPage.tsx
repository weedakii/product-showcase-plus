// ReportsPage.tsx
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAdminReports } from "@/hooks/use-api"; // Assuming a hook for reports data

const ReportsPage = () => {
  const { data: reports, isLoading } = useAdminReports();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        <p className="text-muted-foreground mt-4 text-sm">
          جاري تحميل التقارير...
        </p>
      </div>
    );
  }

  // Assuming reports has data like salesData, productData, etc.
  const salesData = reports?.sales_data || [];
  const productData = reports?.product_data || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-foreground">التقارير</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-bold text-foreground mb-6">المبيعات الشهرية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(152, 40%, 18%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-bold text-foreground mb-6">أفضل المنتجات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="hsl(152, 40%, 18%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsPage;
