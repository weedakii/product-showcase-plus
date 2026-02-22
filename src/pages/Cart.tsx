import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from "lucide-react";
import { ProductColor } from "@/types/api";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, updateColor, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">السلة فارغة</h2>
          <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات بعد</p>
          <Link to="/store"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            <ArrowRight size={18} />
            تصفح المتجر
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">الرئيسية</Link>
            <span>/</span>
            <span className="text-foreground font-medium">سلة المشتريات</span>
          </nav>
        </div>
      </div>

      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">سلة المشتريات ({totalItems})</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                    {item.product_image ? (
                      <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">لا صورة</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/product/${item.product_id}`} className="font-bold text-foreground hover:text-primary transition-colors">
                        {item.product_name}
                      </Link>
                      <button onClick={() => removeFromCart(index)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Color */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: item.color.hex }} />
                      <span className="text-sm text-muted-foreground">{item.color.name}</span>
                    </div>

                    {/* Dimensions */}
                    {(item.width || item.height) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.width && `العرض: ${item.width} سم`} {item.width && item.height && "•"} {item.height && `الارتفاع: ${item.height} سم`}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-muted rounded-lg border border-border">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-r-lg">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-l-lg">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-accent">
                        {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)} ر.س
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-6">ملخص الطلب</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المنتجات ({totalItems})</span>
                  <span className="text-foreground">{totalPrice.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الشحن</span>
                  <span className="text-primary font-medium">مجاني</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground">الإجمالي</span>
                  <span className="font-bold text-accent text-xl">{totalPrice.toFixed(2)} ر.س</span>
                </div>
              </div>
              <Link to="/checkout"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-center flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                إتمام الشراء
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
