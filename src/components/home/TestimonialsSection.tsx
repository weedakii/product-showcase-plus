import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد الشمري",
    role: "صاحب فيلا - الرياض",
    text: "تجربة رائعة مع أظلال! الستائر الخشبية غيّرت شكل منزلي تماماً. جودة عالية وتركيب احترافي.",
    rating: 5,
  },
  {
    name: "نورة العتيبي",
    role: "مصممة داخلية",
    text: "أنصح عملائي دائماً بأظلال. المنتجات فاخرة والتنوع في الخيارات يلبي جميع الأذواق والميزانيات.",
    rating: 5,
  },
  {
    name: "خالد الحربي",
    role: "صاحب شقة - جدة",
    text: "ستائر الزيبرا أعطت غرفة المعيشة لمسة عصرية أنيقة. خدمة العملاء ممتازة والتوصيل سريع.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-card" dir="rtl">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-medium text-sm tracking-wide">آراء العملاء</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">ماذا يقول عملاؤنا</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-background rounded-xl p-6 border border-border/50 shadow-card relative"
            >
              <Quote size={32} className="text-primary/10 absolute top-4 left-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
