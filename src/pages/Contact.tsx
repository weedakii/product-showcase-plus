import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useSubmitContact } from "@/hooks/use-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitMutation.mutateAsync(data);
      toast({ title: "تم الإرسال", description: "شكراً لتواصلك معنا، سنرد عليك في أقرب وقت." });
      reset();
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل إرسال الرسالة، يرجى المحاولة مرة أخرى." });
    }
  };

  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            اتصل بنا
          </motion.h1>
          <p className="text-primary-foreground/70 mt-3 text-lg">نسعد بتواصلكم معنا في أي وقت</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">معلومات التواصل</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                لأية استفسارات أو طلبات لا تتردد في التواصل معنا عبر أي من القنوات التالية.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "البريد الإلكتروني", value: "Info@adhlal.sa" },
                  { icon: Phone, label: "الهاتف", value: "+966 XX XXX XXXX" },
                  { icon: MapPin, label: "العنوان", value: "المملكة العربية السعودية - الدمام" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary" size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.label}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-xl p-8 shadow-card space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">الاسم</label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.name ? "border-destructive" : "border-border"}`}
                    placeholder="أدخل اسمك"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">البريد الإلكتروني</label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.email ? "border-destructive" : "border-border"}`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">رقم الهاتف</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.phone ? "border-destructive" : "border-border"}`}
                      placeholder="+966 XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">الرسالة</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${errors.message ? "border-destructive" : "border-border"}`}
                    placeholder="اكتب رسالتك هنا..."
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>
                <AnimatedButton type="submit" fullWidth disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {submitMutation.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                </AnimatedButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
