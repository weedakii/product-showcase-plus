import { motion } from "framer-motion";

const stats = [
  { value: "10,000+", label: "عميل سعيد" },
  { value: "50,000+", label: "ستارة مُركّبة" },
  { value: "15+", label: "سنة خبرة" },
  { value: "30+", label: "مدينة نخدمها" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary" dir="rtl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-accent mb-2">{stat.value}</h3>
              <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
