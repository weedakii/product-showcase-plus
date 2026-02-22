import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import heroBlinds from "@/assets/hero-blinds.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBlinds} alt="ستائر فاخرة" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent font-medium text-sm tracking-wide mb-4"
          >
            أظلال — ستائر وحلول ذكية
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            حلول ستائر
            <br />
            <span className="text-gradient-gold">مخصصة وأنيقة</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
          >
            نقدم حلول ستائر مخصصة وآلية للحصول على نتيجة أنيقة وواثقة، إلى جانب خدمة العملاء الممتازة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <AnimatedButton to="/store" variant="accent">
              تصفح المنتجات
              <ArrowLeft size={18} />
            </AnimatedButton>
            <AnimatedButton to="/contact" variant="outline">
              اتصل بنا
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
