// src/pages/Product.tsx (new file for single product details)
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Loader2, ShoppingCart, CheckCircle, Truck, Award } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useProduct } from "@/hooks/use-api"; // Assuming you add this hook to products.ts

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(Number(id));

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">
            جاري تحميل تفاصيل المنتج...
          </p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <p className="text-xl text-destructive">
            المنتج غير موجود أو حدث خطأ
          </p>
          <AnimatedButton to="/store" className="mt-6">
            العودة إلى المتجر
          </AnimatedButton>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            {product.name}
          </motion.h1>
          <p className="text-primary-foreground/70 mt-3 text-lg">
            {product.category?.name}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square overflow-hidden rounded-2xl bg-muted"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  لا توجد صورة متاحة
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  وصف المنتج
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "لا يوجد وصف مفصل متاح حالياً."}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-accent">
                  {product.price} ر.س
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    product.stock > 0
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  <CheckCircle size={14} />
                  {product.stock > 0 ? "متوفر" : "غير متوفر"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck size={18} className="text-muted-foreground" />
                  <span>توصيل مجاني داخل المملكة</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award size={18} className="text-muted-foreground" />
                  <span>ضمان لمدة عام</span>
                </div>
              </div>

              <AnimatedButton to="/contact" fullWidth>
                <ShoppingCart size={18} className="ml-2" />
                اطلب الآن
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
