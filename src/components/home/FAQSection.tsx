import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "ما هي مدة التوصيل والتركيب؟", a: "يتم التوصيل والتركيب خلال 3-7 أيام عمل من تاريخ تأكيد الطلب، حسب المنطقة ونوع المنتج." },
  { q: "هل تقدمون خدمة القياس المجاني؟", a: "نعم، نوفر خدمة القياس المجاني في المنزل لضمان دقة المقاسات وتناسب الستائر مع نوافذكم." },
  { q: "ما هي سياسة الضمان؟", a: "نقدم ضمان سنتين على جميع منتجاتنا ضد عيوب التصنيع، مع خدمة صيانة متاحة بعد فترة الضمان." },
  { q: "هل يمكنني تخصيص الألوان والمقاسات؟", a: "بالتأكيد! جميع منتجاتنا قابلة للتخصيص من حيث اللون والمقاس والمواد لتناسب ذوقكم واحتياجاتكم." },
  { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل الدفع بالبطاقات الائتمانية، التحويل البنكي، مدى، Apple Pay، وخيار الدفع عند الاستلام." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background" dir="rtl">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-medium text-sm tracking-wide">الأسئلة الشائعة</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">كل ما تريد معرفته</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-right"
              >
                <span className="font-medium text-foreground text-sm">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
