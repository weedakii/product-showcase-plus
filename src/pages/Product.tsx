import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Loader2, ShoppingCart, CheckCircle, Truck, Award, Minus, Plus, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useProduct } from "@/hooks/use-api";
import { useCart } from "@/contexts/CartContext";
import { ProductColor } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);

  const allImages = product ? [product.image_url, ...(product.gallery || [])].filter(Boolean) as string[] : [];

  const handleAddToCart = () => {
    if (!product) return;
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({ variant: "destructive", title: "يرجى اختيار اللون" });
      return;
    }
    addToCart({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url,
      price: product.price,
      quantity,
      color: selectedColor || { name: "افتراضي", hex: "#000000" },
      width: product.width,
      height: product.height,
    });
    toast({ title: "تمت الإضافة", description: `تم إضافة ${product.name} إلى السلة` });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <p className="text-xl text-destructive">المنتج غير موجود أو حدث خطأ</p>
          <AnimatedButton to="/store" className="mt-6">العودة إلى المتجر</AnimatedButton>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link to="/store" className="hover:text-foreground transition-colors">المتجر</Link>
            <ChevronLeft size={14} />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted border border-border relative group">
                <AnimatePresence mode="wait">
                  {allImages.length > 0 ? (
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={allImages[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">لا توجد صورة متاحة</div>
                  )}
                </AnimatePresence>
                {allImages.length > 1 && (
                  <>
                    <button onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={20} />
                    </button>
                    <button onClick={() => setSelectedImage(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronLeft size={20} />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === i ? "border-primary shadow-elegant" : "border-border hover:border-primary/50"
                      }`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Category badge */}
              {product.category && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {product.category.name}
                </span>
              )}

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">{product.name}</h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-accent">{product.price} ر.س</span>
                {product.sale_price && (
                  <span className="text-lg text-muted-foreground line-through">{product.sale_price} ر.س</span>
                )}
              </div>

              {/* Availability */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                product.stock > 0 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              }`}>
                <CheckCircle size={14} />
                {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : "غير متوفر"}
              </div>

              {/* Short Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              {/* Dimensions */}
              {(product.width || product.height) && (
                <div className="bg-muted/50 rounded-xl p-4 border border-border">
                  <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
                    <Ruler size={16} />
                    الأبعاد
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.width && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">العرض</span>
                        <span className="font-medium text-foreground">{product.width} سم</span>
                      </div>
                    )}
                    {product.height && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الارتفاع</span>
                        <span className="font-medium text-foreground">{product.height} سم</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium text-foreground mb-3">اختر اللون</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, i) => (
                      <button key={i} onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                          selectedColor?.hex === color.hex
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50"
                        }`}>
                        <span className="w-5 h-5 rounded-full border border-border shadow-sm" style={{ backgroundColor: color.hex }} />
                        <span className="text-sm font-medium text-foreground">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-medium text-foreground mb-3">الكمية</h3>
                <div className="flex items-center gap-1 bg-muted rounded-xl border border-border w-fit">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-r-xl transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-l-xl transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart size={22} />
                أضف إلى السلة
              </motion.button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck size={18} />
                  <span>توصيل مجاني داخل المملكة</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Award size={18} />
                  <span>ضمان لمدة عام</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Long Description */}
          {product.long_description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 bg-card rounded-2xl border border-border p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">الوصف التفصيلي</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.long_description}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Product;
