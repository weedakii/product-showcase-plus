import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import aboutHero from "@/assets/about-hero.jpg";
import logo from "@/assets/adhlal-logo.png";
import { Award, Users, Building, Target, CheckCircle, Clock, Globe, Headphones, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Award, title: "الخبرة", description: "تراث متجذر في مصنع الدمام للمنتجات المعدنية مع سنوات من الخبرة في الصناعة." },
  { icon: Users, title: "العملاء أولاً", description: "نضع رضا العملاء في مقدمة أولوياتنا ونسعى لتقديم أفضل تجربة ممكنة." },
  { icon: Building, title: "صناعة سعودية", description: "فخورون بكوننا علامة تجارية سعودية تقدم منتجات عالية الجودة محلياً." },
  { icon: Target, title: "الابتكار", description: "نواكب أحدث التقنيات لتقديم حلول ذكية ومبتكرة تلبي احتياجات العصر." },
];

const stats = [
  { value: "+500", label: "مشروع منجز" },
  { value: "+15", label: "سنة خبرة" },
  { value: "+50", label: "موظف متخصص" },
  { value: "98%", label: "رضا العملاء" },
];

const timeline = [
  { year: "2008", title: "تأسيس المصنع", description: "بدأت رحلتنا في مصنع الدمام للمنتجات المعدنية." },
  { year: "2013", title: "إطلاق أظلال", description: "تم إطلاق علامة أظلال التجارية كعلامة متخصصة في الستائر." },
  { year: "2018", title: "التوسع الإقليمي", description: "توسعنا لنغطي جميع مناطق المملكة العربية السعودية." },
  { year: "2023", title: "الحلول الذكية", description: "أدخلنا تقنيات المنزل الذكي إلى منتجاتنا." },
];

const services = [
  { icon: CheckCircle, title: "استشارة مجانية", description: "نقدم استشارات مجانية لمساعدتك في اختيار الستائر المثالية لمساحتك." },
  { icon: Clock, title: "تركيب سريع", description: "فريقنا المتخصص يضمن التركيب السريع والاحترافي في الوقت المحدد." },
  { icon: Globe, title: "تغطية شاملة", description: "نغطي جميع مناطق المملكة العربية السعودية بخدماتنا المتميزة." },
  { icon: Headphones, title: "دعم مستمر", description: "فريق دعم متاح لمساعدتك والإجابة على استفساراتك في أي وقت." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src={aboutHero} alt="من نحن" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </motion.div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent font-medium text-sm mb-3 block"
          >
            تعرّف علينا
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-primary-foreground"
          >
            من نحن
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-primary-foreground/70 text-lg mt-4 max-w-xl"
          >
            رحلة تميّز في عالم الستائر والحلول الذكية
          </motion.p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <motion.span
                  className="text-4xl md:text-5xl font-bold text-accent block"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-primary-foreground/70 text-sm mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-accent font-medium text-sm">أظلال</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                علامة تجارية متميزة في عالم الستائر
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                مرحباً بكم في أظلال، العلامة التجارية المتميزة تحت المظلة الموقرة لمصنع الدمام للمنتجات المعدنية. يقع مقر شركة أظلال في المملكة العربية السعودية، وتعتبر منارة للتميز في عالم الستائر والحلول الذكية.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                مع الالتزام بالجودة والابتكار والخدمة التي لا مثيل لها، فإن أظلال هو شريكك الموثوق به في تعزيز جماليات ووظائف مساحات المعيشة الخاصة بك.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/10 rounded-2xl -rotate-3" />
                <img src={logo} alt="أظلال" className="max-w-xs w-full relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-gradient-section">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent font-medium text-sm">رحلتنا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              محطات مهمة في مسيرتنا
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <motion.div
              className="absolute right-6 md:right-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  index % 2 === 0
                    ? "md:flex-row-reverse md:text-left"
                    : "md:flex-row md:text-right"
                }`}
              >
                {/* Dot */}
                <motion.div
                  className="absolute right-4 md:right-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10 md:-translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.15 + 0.2 }}
                />

                <div className={`mr-12 md:mr-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <span className="text-accent font-bold text-2xl">{item.year}</span>
                  <h3 className="font-bold text-lg text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-accent font-medium text-sm">قيمنا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              نسعى للتميز في كل تفصيل
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              نحن متخصصون في فن الستائر، ونقدم مجموعة متنوعة من الأساليب والأقمشة والتصاميم التي تناسب كل الأذواق والتفضيلات.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl p-8 text-center shadow-card hover:shadow-elegant transition-shadow duration-500"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="text-primary" size={26} />
                </motion.div>
                <h3 className="font-bold text-lg text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-gradient-section">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-accent font-medium text-sm">خدماتنا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              ما نقدمه لعملائنا
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex gap-5 bg-card rounded-xl p-6 shadow-card"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <service.icon className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              هل أنت مستعد لتحويل مساحتك؟
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-all"
              >
                تواصل معنا
                <ArrowLeft size={18} />
              </Link>
              <Link
                to="/store"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all"
              >
                تصفح المتجر
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
