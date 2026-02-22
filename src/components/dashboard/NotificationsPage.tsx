import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Package, ShoppingCart, MessageSquare, Users, Check, Trash2, CheckCheck, Loader2 } from "lucide-react";
import { useAdminNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/hooks/use-api";

const typeConfig: any = {
  order: { icon: ShoppingCart, color: "bg-primary/10 text-primary" },
  product: { icon: Package, color: "bg-accent/10 text-accent" },
  message: { icon: MessageSquare, color: "bg-primary/10 text-primary" },
  customer: { icon: Users, color: "bg-accent/10 text-accent" },
};

const NotificationsPage = () => {
  const [filter, setFilter] = useState<string>("الكل");
  const { data: notifications, isLoading } = useAdminNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  const getUnreadCount = () => notifications?.filter((n) => !n.read_at).length || 0;

  const filtered = notifications?.filter((n) => {
    if (filter === "الكل") return true;
    if (filter === "غير مقروء") return !n.read_at;
    // In actual system, we might need a way to determine type from message or title if type is not explicit
    // For now, let's assume message content might indicate type or just filter by unread
    return true; 
  });

  const filters = [
    { label: "الكل", value: "الكل" },
    { label: "غير مقروء", value: "غير مقروء" },
  ];

  return (
    <div>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card rounded-lg border border-border p-1">
            {filters.map((f) => (
              <motion.button
                key={f.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filter === f.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </div>
        {getUnreadCount() > 0 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {markAllReadMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCheck size={16} />}
            تحديد الكل كمقروء
          </motion.button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
            <p className="text-muted-foreground mt-4 text-sm">جاري تحميل الإشعارات...</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered?.map((notification) => {
              // Map some generic type for icons based on title or message
              const type = notification.title.includes("طلب") ? "order" : notification.title.includes("منتج") ? "product" : "message";
              const config = typeConfig[type];
              const Icon = config.icon;
              const isRead = !!notification.read_at;
              
              return (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  whileHover={{ x: -4 }}
                  className={`bg-card rounded-xl p-4 border transition-colors cursor-pointer relative ${
                    !isRead ? "border-primary/30 bg-primary/5" : "border-border/50"
                  }`}
                  onClick={() => !isRead && markReadMutation.mutate(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-medium ${!isRead ? "text-foreground" : "text-muted-foreground"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground shrink-0">{notification.created_at.split(' ')[0]}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!isRead && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); markReadMutation.mutate(notification.id); }}
                          disabled={markReadMutation.isPending}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="تحديد كمقروء"
                        >
                          {markReadMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        </motion.button>
                      )}
                    </div>
                  </div>
                  {!isRead && <div className="w-2 h-2 bg-primary rounded-full absolute top-4 left-4" />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        {!isLoading && (!filtered || filtered.length === 0) && (
          <div className="text-center py-16">
            <Bell size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">لا توجد إشعارات</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
