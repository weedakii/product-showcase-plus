import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            الشروط والأحكام
          </motion.h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">القبول بالشروط</h2>
              <p className="text-muted-foreground leading-relaxed">
                باستخدام موقع أظلال فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">المنتجات والأسعار</h2>
              <p className="text-muted-foreground leading-relaxed">
                جميع المنتجات المعروضة على الموقع تخضع للتوافر. الأسعار المعروضة قابلة للتغيير دون إشعار مسبق وتشمل ضريبة القيمة المضافة.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">الطلبات والتوصيل</h2>
              <p className="text-muted-foreground leading-relaxed">
                بعد تأكيد الطلب سيتم التواصل معكم لتحديد موعد التسليم والتركيب. مدة التصنيع والتوصيل تعتمد على نوع المنتج والكمية المطلوبة.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">الإرجاع والاستبدال</h2>
              <p className="text-muted-foreground leading-relaxed">
                نظراً لأن منتجاتنا مصنوعة حسب الطلب، فإن سياسة الإرجاع تطبق فقط في حالة وجود عيوب في التصنيع. يرجى فحص المنتج عند الاستلام.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">الضمان</h2>
              <p className="text-muted-foreground leading-relaxed">
                توفر أظلال ضماناً على جميع منتجاتها ضد عيوب التصنيع. مدة الضمان تختلف حسب نوع المنتج.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
