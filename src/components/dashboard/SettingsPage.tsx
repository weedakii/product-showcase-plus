// SettingsPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, Loader2 } from "lucide-react";
import { useAdminSettings, useUpdateSettings } from "@/hooks/use-api"; // Assuming hooks for settings
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const { data: settings, isLoading } = useAdminSettings();
  const updateMutation = useUpdateSettings();

  const [formData, setFormData] = useState({
    site_name: settings?.site_name || "",
    email: settings?.email || "",
    // Add more settings fields as needed
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
      toast({ title: "تم التحديث", description: "تم حفظ الإعدادات بنجاح" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل حفظ الإعدادات",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        <p className="text-muted-foreground mt-4 text-sm">
          جاري تحميل الإعدادات...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">الإعدادات</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            اسم الموقع
          </label>
          <input
            name="site_name"
            value={formData.site_name}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            البريد الإلكتروني
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {/* Add more fields */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
        >
          {updateMutation.isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          حفظ الإعدادات
        </motion.button>
      </form>
    </div>
  );
};

export default SettingsPage;
