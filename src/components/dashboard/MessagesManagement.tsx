// MessagesManagement.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, MessageSquare, User, Clock, Loader2 } from "lucide-react";
import { useAdminMessages } from "@/hooks/use-api"; // Assuming a hook for messages
import { Message } from "@/types/api"; // Assuming Message type

const MessagesManagement = ({
  onViewMessage,
}: {
  onViewMessage: (id: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const { data: messages, isLoading } = useAdminMessages();

  const filteredMessages = messages?.filter(
    (message) =>
      message.id.toString().includes(search) ||
      message.sender_name.toLowerCase().includes(search.toLowerCase()) ||
      message.content.toLowerCase().includes(search.toLowerCase()),
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
            placeholder="بحث عن رسالة..."
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
                جاري تحميل قائمة الرسائل...
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    رقم الرسالة
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    المرسل
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden sm:table-cell">
                    التاريخ
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    المحتوى
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages?.map((message) => (
                  <motion.tr
                    key={message.id}
                    whileHover={{ backgroundColor: "hsl(35, 20%, 92%)" }}
                    className="border-b border-border/50"
                  >
                    <td className="px-6 py-3 font-medium text-foreground">
                      #{message.id}
                    </td>
                    <td className="px-6 py-3 text-foreground">
                      {message.sender_name}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">
                      {message.created_at?.split("T")[0]}
                    </td>
                    <td className="px-6 py-3 text-foreground truncate max-w-xs">
                      {message.content}
                    </td>
                    <td className="px-6 py-3">
                      <motion.button
                        whileHover={{ scale: 1.05, x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onViewMessage(message.id.toString())}
                        className="flex items-center gap-1.5 text-primary font-medium hover:underline"
                      >
                        <span>التفاصيل</span>
                        <Eye size={14} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
                {(!filteredMessages || filteredMessages.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-20 text-muted-foreground"
                    >
                      <MessageSquare
                        className="mx-auto mb-3 opacity-20"
                        size={48}
                      />
                      لا توجد رسائل متوفرة
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

export default MessagesManagement;
