import { motion } from "framer-motion";
import { Shield, Palette, Wrench, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "جودة عالية",
    description: "مواد متينة وعالية الجودة تدوم لسنوات طويلة مع الحفاظ على مظهرها الأنيق.",
  },
  {
    icon: Palette,
    title: "تصاميم متنوعة",
    description: "مجموعة واسعة من الأنماط والألوان التي تناسب كل الأذواق والديكورات.",
  },
  {
    icon: Wrench,
    title: "تركيب احترافي",
    description: "فريق متخصص يضمن التركيب المثالي بدقة واحترافية عالية.",
  },
  {
    icon: Star,
    title: "خدمة متميزة",
    description: "دعم مستمر وخدمة عملاء ممتازة قبل وأثناء وبعد الشراء.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-medium text-sm">لماذا أظلال؟</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            ما يميزنا
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 text-center shadow-card hover:shadow-elegant transition-shadow duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="text-primary" size={26} />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
