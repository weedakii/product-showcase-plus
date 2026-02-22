import { motion } from "framer-motion";
import { ArrowLeft, Smartphone, Wifi, Zap } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import smartHomeImg from "@/assets/hero-smart-home.jpg";

const SmartHomeSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-section overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-medium text-sm">المنزل الذكي</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              حلول ذكية لمنزلك
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              قم بترقية منزلك من خلال حلولنا الذكية لتعزيز الأداء الوظيفي والكفاءة والجودة والراحة وراحة البال!
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Smartphone, text: "تحكم عن بُعد عبر الهاتف الذكي" },
                { icon: Wifi, text: "اتصال ذكي بشبكة المنزل" },
                { icon: Zap, text: "كفاءة عالية في استهلاك الطاقة" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="text-primary" size={20} />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <AnimatedButton to="/contact">
              اكتشف المزيد
              <ArrowLeft size={18} />
            </AnimatedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-elegant">
              <img src={smartHomeImg} alt="المنزل الذكي" className="w-full h-auto object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartHomeSection;
