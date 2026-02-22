import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            سياسة الخصوصية
          </motion.h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">مقدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                نحن في أظلال نلتزم بحماية خصوصية عملائنا وزوار موقعنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">المعلومات التي نجمعها</h2>
              <p className="text-muted-foreground leading-relaxed">
                نقوم بجمع المعلومات التي تقدمها لنا طوعاً عند التواصل معنا أو الشراء من متجرنا، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف والعنوان.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">كيف نستخدم معلوماتك</h2>
              <p className="text-muted-foreground leading-relaxed">
                نستخدم المعلومات المجمعة لمعالجة الطلبات وتحسين خدماتنا والتواصل معكم بشأن العروض والتحديثات.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">حماية المعلومات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">اتصل بنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: Info@adhlal.sa
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
