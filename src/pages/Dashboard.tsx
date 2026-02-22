import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Users, MessageSquare, Settings, LogOut, Menu, X,
  TrendingUp, ShoppingCart, Eye, DollarSign, BarChart3, Bell, Search,
  ChevronLeft, ArrowUpRight, ArrowDownRight, Sun, Moon, Loader2,
  FolderTree
} from "lucide-react";
import logo from "@/assets/adhlal-logo.png";
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import ProductsManagement from "@/components/dashboard/ProductsManagement";
import CategoriesManagement from "@/components/dashboard/CategoriesManagement";
import OrdersManagement from "@/components/dashboard/OrdersManagement";
import OrderDetailsPage from "@/components/dashboard/OrderDetailsPage";
import NotificationsPage from "@/components/dashboard/NotificationsPage";
import { useTheme } from "@/hooks/use-theme";
import { useAdminStats, useLogout, useAdminOrders } from "@/hooks/use-api";
import MessagesManagement from "@/components/dashboard/MessagesManagement";
import ReportsPage from "@/components/dashboard/ReportsPage";
import SettingsPage from "@/components/dashboard/SettingsPage";
import CustomersManagement from "@/components/dashboard/CustomersManagement";

const VALID_TABS = ["overview", "categories", "products", "orders", "notifications", "customers", "messages", "reports", "settings"] as const;
type TabId = typeof VALID_TABS[number];

const sidebarItems: { icon: typeof LayoutDashboard; label: string; id: TabId }[] = [
  { icon: LayoutDashboard, label: "الرئيسية", id: "overview" },
  { icon: FolderTree, label: "الفئات", id: "categories" },
  { icon: Package, label: "المنتجات", id: "products" },
  { icon: ShoppingCart, label: "الطلبات", id: "orders" },
  { icon: Bell, label: "الإشعارات", id: "notifications" },
  { icon: Users, label: "العملاء", id: "customers" },
  { icon: MessageSquare, label: "الرسائل", id: "messages" },
  { icon: BarChart3, label: "التقارير", id: "reports" },
  { icon: Settings, label: "الإعدادات", id: "settings" },
];

const categoryData = [
  { name: "ستائر خشبية", value: 30, color: "hsl(152, 40%, 18%)" },
  { name: "ستائر زيبرا", value: 25, color: "hsl(38, 60%, 55%)" },
  { name: "ستائر دوارة", value: 20, color: "hsl(152, 35%, 35%)" },
  { name: "ستائر رأسية", value: 15, color: "hsl(38, 40%, 70%)" },
  { name: "أخرى", value: 10, color: "hsl(35, 20%, 75%)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [viewingOrderId, setViewingOrderId] = useState<string | null>(
    searchParams.get("order") || null,
  );
  const [viewingMessageId, setViewingMessageId] = useState<string | null>(
    searchParams.get("message") || null,
  );
  const [viewingCustomerId, setViewingCustomerId] = useState<string | null>(
    searchParams.get("customer") || null,
  );
  const { theme, toggleTheme } = useTheme();

  // Persist active tab via URL search params
  const tabParam = searchParams.get("tab") as TabId | null;
  const activeTab: TabId = tabParam && VALID_TABS.includes(tabParam) ? tabParam : "overview";

  const setActiveTab = (tab: TabId) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    params.delete("order");
    setSearchParams(params, { replace: true });
    setViewingOrderId(null);
  };

  const handleViewMessage = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("message", id);
    setSearchParams(params, { replace: true });
    setViewingMessageId(id);
  };

  const handleViewOrder = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", id);
    setSearchParams(params, { replace: true });
    setViewingOrderId(id);
  };

  const handleBackFromOrder = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("order");
    setSearchParams(params, { replace: true });
    setViewingOrderId(null);
  };

  const handleViewCustomer = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("customer", id);
    setSearchParams(params, { replace: true });
    setViewingCustomerId(id);
  };

  const handleBackFromCustomer = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("customer");
    setSearchParams(params, { replace: true });
    setViewingCustomerId(null);
  };

  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: ordersData } = useAdminOrders();
  const logoutMutation = useLogout();

  const ordersCount = ordersData?.length ?? 0;

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      localStorage.removeItem("adhlal_token");
      localStorage.removeItem("adhlal_user");
      navigate("/login");
    }
  };

  const stats = statsData ? [
    { label: "إجمالي المبيعات", value: statsData.total_sales || "0", change: "+12.5%", up: true, icon: DollarSign, color: "bg-primary/10 text-primary" },
    { label: "الطلبات", value: (statsData.total_orders ?? 0).toString(), change: "+8.2%", up: true, icon: ShoppingCart, color: "bg-accent/10 text-accent" },
    { label: "المنتجات", value: (statsData.total_products ?? 0).toString(), change: "+23.1%", up: true, icon: Package, color: "bg-primary/10 text-primary" },
    { label: "العملاء", value: (statsData.total_customers ?? 0).toString(), change: "-0.4%", up: false, icon: Users, color: "bg-accent/10 text-accent" },
  ] : [];

  // Shared sidebar renderer (DRY - Don't Repeat Yourself)
  const renderSidebarItems = (mobile = false) => (
    <nav className={`${mobile ? "" : "flex-1"} py-4 space-y-1 px-2`}>
      {sidebarItems.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setActiveTab(item.id); if (mobile) setMobileSidebar(false); }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === item.id
              ? "bg-primary-foreground/15 text-primary-foreground"
              : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <item.icon size={20} />
            {(mobile || sidebarOpen) && <span>{item.label}</span>}
          </div>
          {item.id === "orders" && ordersCount > 0 && (mobile || sidebarOpen) && (
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {ordersCount}
            </span>
          )}
        </motion.button>
      ))}
    </nav>
  );

  const renderLogoutButton = (showLabel: boolean) => (
    <div className="p-2 border-t border-primary-foreground/10">
      <motion.button whileHover={{ x: -4 }} whileTap={{ scale: 0.97 }} onClick={handleLogout} disabled={logoutMutation.isPending}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5">
        {logoutMutation.isPending ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
        {showLabel && <span>تسجيل الخروج</span>}
      </motion.button>
    </div>
  );

  const renderHeader = () => (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setMobileSidebar(true)} className="lg:hidden p-2"><Menu size={22} /></button>
        {!viewingOrderId && (
          <div className="relative hidden sm:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input type="text" placeholder="بحث..." className="pr-9 pl-4 py-2 rounded-lg border border-border bg-card text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted">
          {theme === "dark" ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-muted-foreground" />}
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveTab("notifications")} className="relative p-2 rounded-lg hover:bg-muted">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1 left-1 w-2 h-2 bg-destructive rounded-full" />
        </motion.button>
        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">م</div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-background flex font-tajawal" dir="rtl">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col bg-primary text-primary-foreground fixed top-0 right-0 h-screen z-40 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
          {sidebarOpen && <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={logo} alt="أظلال" className="h-10 brightness-0 invert" />}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-primary-foreground/10 rounded-lg">
            <ChevronLeft size={20} className={`transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
          </button>
        </div>
        {renderSidebarItems()}
        {renderLogoutButton(sidebarOpen)}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebar && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-50 bg-foreground/50" onClick={() => setMobileSidebar(false)}>
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 h-full w-72 bg-primary text-primary-foreground" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
              <img src={logo} alt="أظلال" className="h-10 brightness-0 invert" />
              <button onClick={() => setMobileSidebar(false)} className="p-2"><X size={20} /></button>
            </div>
            {renderSidebarItems(true)}
            {renderLogoutButton(true)}
          </motion.aside>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300"
        style={{ marginRight: typeof window !== "undefined" && window.innerWidth >= 1024 ? (sidebarOpen ? 260 : 72) : 0 }}>
        {renderHeader()}

        <div className="p-4 lg:p-8">
          {viewingOrderId ? (
            <OrderDetailsPage orderId={viewingOrderId} onBack={handleBackFromOrder} />
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" key={activeTab}>
              {/* Page Title */}
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {sidebarItems.find(i => i.id === activeTab)?.label || "الرئيسية"}
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">مرحباً بك في لوحة تحكم أظلال</p>
                </div>
              </motion.div>

              {/* Tab Content */}
              {activeTab === "products" ? (
                <ProductsManagement />
              ) : activeTab === "categories" ? (
                <CategoriesManagement />
              ) : activeTab === "customers" ? (
                <CustomersManagement onViewCustomer={handleViewCustomer} />
              ) : activeTab === "orders" ? (
                <OrdersManagement onViewOrder={handleViewOrder} />
              ) : activeTab === "notifications" ? (
                <NotificationsPage />
              ) : activeTab === "messages" ? (
                <MessagesManagement onViewMessage={handleViewMessage} />
              ) : activeTab === "reports" ? (
                <ReportsPage />
              ) : activeTab === "settings" ? (
                <SettingsPage />
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statsLoading ? (
                      [1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-card rounded-xl p-5 shadow-card border border-border/50 animate-pulse h-32" />
                      ))
                    ) : (
                      stats.map((stat) => (
                        <motion.div key={stat.label} variants={itemVariants} whileHover={{ y: -4, boxShadow: "0 12px 40px -12px hsl(152 40% 18% / 0.15)" }}
                          className="bg-card rounded-xl p-5 shadow-card border border-border/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}><stat.icon size={20} /></div>
                            <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-primary" : "text-destructive"}`}>
                              {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                              {stat.change}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card border border-border/50">
                      <h3 className="font-bold text-foreground mb-6">المبيعات الشهرية</h3>
                      {statsLoading ? (
                        <div className="h-[280px] w-full bg-muted/30 animate-pulse rounded-lg" />
                      ) : (
                        <ResponsiveContainer width="100%" height={280}>
                          <AreaChart data={statsData?.sales_chart || []}>
                            <defs>
                              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(152, 40%, 18%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(152, 40%, 18%)" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 87%)" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(40, 25%, 95%)", border: "1px solid hsl(35, 20%, 87%)", borderRadius: "8px", fontSize: 12 }} />
                            <Area type="monotone" dataKey="amount" stroke="hsl(152, 40%, 18%)" fill="url(#salesGradient)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                      <h3 className="font-bold text-foreground mb-6">توزيع المنتجات</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                            {categoryData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: "hsl(40, 25%, 95%)", border: "1px solid hsl(35, 20%, 87%)", borderRadius: "8px", fontSize: 12 }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2 mt-4">
                        {categoryData.map((cat) => (
                          <div key={cat.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                              <span className="text-muted-foreground">{cat.name}</span>
                            </div>
                            <span className="font-medium text-foreground">{cat.value}%</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Recent Orders */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                      <div className="flex items-center justify-between p-6 pb-4">
                        <h3 className="font-bold text-foreground">أحدث الطلبات</h3>
                        <button onClick={() => setActiveTab("orders")} className="text-sm text-primary font-medium hover:underline">عرض الكل</button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-right px-6 py-3 text-muted-foreground font-medium">رقم الطلب</th>
                              <th className="text-right px-6 py-3 text-muted-foreground font-medium">العميل</th>
                              <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden sm:table-cell">المبلغ</th>
                              <th className="text-right px-6 py-3 text-muted-foreground font-medium">الحالة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {statsLoading ? (
                              [1, 2, 3, 4, 5].map(i => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                  <td colSpan={4} className="px-6 py-4"><div className="h-4 bg-muted rounded w-full" /></td>
                                </tr>
                              ))
                            ) : (
                              statsData?.recent_orders?.map((order) => (
                                <motion.tr key={order.id} whileHover={{ backgroundColor: "hsl(35, 20%, 92%)" }}
                                  className="border-b border-border/50 transition-colors cursor-pointer"
                                  onClick={() => handleViewOrder(order.id.toString())}>
                                  <td className="px-6 py-3 font-medium text-foreground">#{order.id}</td>
                                  <td className="px-6 py-3 text-foreground">{order.customer_name}</td>
                                  <td className="px-6 py-3 font-medium text-foreground hidden sm:table-cell">{order.total_price}</td>
                                  <td className="px-6 py-3">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                      order.status === "delivered" ? "bg-primary/10 text-primary" : order.status === "processing" ? "bg-accent/10 text-accent" : "bg-secondary text-foreground"
                                    }`}>{order.status === "delivered" ? "مكتمل" : order.status === "processing" ? "قيد التنفيذ" : order.status === "pending" ? "جديد" : order.status}</span>
                                  </td>
                                </motion.tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-card rounded-xl shadow-card border border-border/50">
                      <div className="flex items-center justify-between p-6 pb-4">
                        <h3 className="font-bold text-foreground">الرسائل الأخيرة</h3>
                      </div>
                      <div className="px-4 pb-4 text-center text-muted-foreground text-sm py-10">
                        لا توجد رسائل جديدة
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
