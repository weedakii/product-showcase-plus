import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useProducts, useCategories } from "@/hooks/use-api";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Store = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  // Fetch products based on category
  const { data: productsData, isLoading: productsLoading } = useProducts(
    activeCategory !== "الكل" ? { category: activeCategory } : undefined,
  );

  // Client-side search filtering
  const filteredProducts = useMemo(() => {
    if (!productsData) return [];
    if (!searchQuery.trim()) return productsData;

    const query = searchQuery.toLowerCase();
    return productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query),
    );
  }, [productsData, searchQuery]);

  const categories = ["الكل", ...(categoriesData?.map((c) => c.name) || [])];

  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            المتجر
          </motion.h1>
          <p className="text-primary-foreground/70 mt-3 text-lg">
            اكتشف مجموعتنا المتنوعة من الستائر عالية الجودة
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            {categoriesLoading ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-24 bg-muted animate-pulse rounded-full"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground border border-border hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            )}

            <div className="relative w-full md:w-80">
              <SearchIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                placeholder="بحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
            </div>
          </div>

          {productsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
              <p className="text-muted-foreground mt-4">
                جاري تحميل المنتجات...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-shadow duration-500">
                    <div className="aspect-square overflow-hidden bg-muted">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground italic">
                          لا توجد صورة
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">
                        {product.description ||
                          "لا يوجد وصف متوفر لهذا المنتج حالياً."}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-accent font-bold text-lg">
                          {product.price}
                        </span>
                        {/* <AnimatedButton
                          to={`/contact?product=${product.id}`}
                          size="sm"
                        >
                          اطلب الآن
                        </AnimatedButton> */}
                        <AnimatedButton to={`/product/${product.id}`} size="sm">
                          عرض المنتج
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {!productsLoading && filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20 bg-muted/30 rounded-2xl">
                  <p className="text-muted-foreground text-lg">
                    لا توجد منتجات تطابق بحثك حالياً
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Store;
