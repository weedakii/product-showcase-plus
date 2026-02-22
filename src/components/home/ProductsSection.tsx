import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHome } from "@/hooks/use-api";
import { Loader2 } from "lucide-react";

const ProductsSection = () => {
  const { data: homeData, isLoading } = useHome();

  return (
    <section className="py-20 lg:py-28 bg-gradient-section">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-medium text-sm">منتجاتنا</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            تسوق عبر الإنترنت
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            اكتشف مجموعتنا الواسعة من الستائر المصممة لتناسب كل الأذواق والمساحات
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary opacity-30" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeData?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to="/store" className="group block">
                  <div className="relative overflow-hidden rounded-xl shadow-card bg-card">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                      <p className="text-accent font-semibold mt-1">
                        ابتداءً من {product.price} ر.س
                      </p>
                      <span className="inline-block mt-3 text-sm font-medium text-primary border border-primary rounded-md px-4 py-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        تحديد الخيارات
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
