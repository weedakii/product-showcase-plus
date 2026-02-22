import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            هل تبحث عن ستائر مثالية لمنزلك؟
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedButton to="/contact" variant="accent">
              تواصل معنا
              <ArrowLeft size={18} />
            </AnimatedButton>
            <AnimatedButton to="/store" variant="outline">
              تصفح المتجر
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
