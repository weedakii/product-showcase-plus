import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Loader2, CheckCircle, CreditCard, Truck, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/api-client";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    payment_method: "cash_on_delivery",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer_name || !form.customer_phone || !form.customer_address) {
      toast({ variant: "destructive", title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة" });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/orders", {
        ...form,
        items: items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          color: item.color.name,
          price: item.price,
        })),
      });
      setOrderSuccess(true);
      clearCart();
    } catch {
      toast({ variant: "destructive", title: "خطأ", description: "حدث خطأ أثناء إنشاء الطلب. حاول مرة أخرى." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block">
            <CheckCircle className="mx-auto h-20 w-20 text-primary mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-3">تم إنشاء الطلب بنجاح!</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">سيتم التواصل معك قريباً لتأكيد الطلب وترتيب التوصيل</p>
          <Link to="/store"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            متابعة التسوق
          </Link>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">الرئيسية</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-foreground">السلة</Link>
            <span>/</span>
            <span className="text-foreground font-medium">إتمام الشراء</span>
          </nav>
        </div>
      </div>

      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">إتمام الشراء</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                    <MapPin size={18} />
                    معلومات التوصيل
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">الاسم الكامل *</label>
                      <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} required
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">رقم الهاتف *</label>
                      <input type="tel" name="customer_phone" value={form.customer_phone} onChange={handleChange} required dir="ltr"
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">البريد الإلكتروني</label>
                      <input type="email" name="customer_email" value={form.customer_email} onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">العنوان *</label>
                      <textarea name="customer_address" value={form.customer_address} onChange={handleChange} required rows={3}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                    <CreditCard size={18} />
                    طريقة الدفع
                  </h3>
                  <div className="space-y-3">
                    {[
                      { value: "cash_on_delivery", label: "الدفع عند الاستلام" },
                      { value: "bank_transfer", label: "تحويل بنكي" },
                    ].map(method => (
                      <label key={method.value}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          form.payment_method === method.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                        }`}>
                        <input type="radio" name="payment_method" value={method.value} checked={form.payment_method === method.value}
                          onChange={handleChange} className="accent-primary" />
                        <span className="font-medium text-foreground">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4">ملاحظات إضافية</h3>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="أي ملاحظات خاصة بالطلب..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">ملخص الطلب</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{item.product_name}</span>
                        <span className="text-muted-foreground">×{item.quantity}</span>
                      </div>
                      <span className="text-foreground font-medium">
                        {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)} ر.س
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className="text-primary font-medium flex items-center gap-1"><Truck size={14} /> مجاني</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-bold text-foreground">الإجمالي</span>
                    <span className="font-bold text-accent text-xl">{totalPrice.toFixed(2)} ر.س</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "تأكيد الطلب"}
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
