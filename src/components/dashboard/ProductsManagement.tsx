import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Search, Loader2, Package, Upload } from "lucide-react";
import { 
  useAdminProducts, 
  useCreateProduct, 
  useUpdateProduct, 
  useDeleteProduct,
  useCategories
} from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  name: z.string().min(2, "اسم المنتج يجب أن يكون حرفين على الأقل"),
  category_id: z.number({ required_error: "يرجى اختيار الفئة" }),
  price: z.string().min(1, "يرجى إدخال السعر"),
  stock: z.number().min(0, "المخزون لا يمكن أن يكون أقل من صفر"),
  status: z.string().min(1, "يرجى اختيار الحالة"),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductsManagement = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: products, isLoading: productsLoading } = useAdminProducts({ search });
  const { data: categories } = useCategories();
  
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { category_id: 1, stock: 0, status: "متوفر" },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const buildFormData = (data: ProductFormData): FormData => {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("category_id", data.category_id.toString());
    fd.append("price", data.price);
    fd.append("stock", data.stock.toString());
    fd.append("status", data.status);
    if (data.description) fd.append("description", data.description);
    if (imageFile) fd.append("image_url", imageFile);
    return fd;
  };

  const onSave = async (data: ProductFormData) => {
    try {
      const formData = buildFormData(data);
      if (editingProduct) {
        await updateMutation.mutateAsync({ id: editingProduct.id, formData });
        toast({ title: "تم التحديث", description: "تم تحديث المنتج بنجاح" });
      } else {
        await createMutation.mutateAsync(formData);
        toast({ title: "تمت الإضافة", description: "تمت إضافة المنتج بنجاح" });
      }
      closeForm();
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل حفظ المنتج" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "تم الحذف", description: "تم حذف المنتج بنجاح" });
      setDeleteConfirm(null);
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل حذف المنتج" });
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setImageFile(null);
    setImagePreview(product.image_url || null);
    reset({
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
      status: product.status,
      description: product.description || "",
    });
    setIsAdding(false);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview(null);
    reset({
      name: "",
      category_id: categories?.[0]?.id || 1,
      price: "",
      stock: 0,
      status: "متوفر",
      description: "",
    });
    setIsAdding(true);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setImageFile(null);
    setImagePreview(null);
    reset();
  };

  const showForm = isAdding || editingProduct;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input type="text" placeholder="بحث عن منتج..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pr-9 pl-4 py-2 rounded-lg border border-border bg-card text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
          <Plus size={16} /> إضافة منتج
        </motion.button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={closeForm}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-6 w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit(onSave)}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</h3>
                  <button type="button" onClick={closeForm} className="p-1 hover:bg-muted rounded-lg"><X size={18} /></button>
                </div>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">اسم المنتج</label>
                    <input {...register("name")} className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-border"}`} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">الفئة</label>
                    <select {...register("category_id", { valueAsNumber: true })} className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.category_id ? "border-destructive" : "border-border"}`}>
                      {categories?.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">السعر</label>
                      <input {...register("price")} className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.price ? "border-destructive" : "border-border"}`} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">المخزون</label>
                      <input type="number" {...register("stock", { valueAsNumber: true })} className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.stock ? "border-destructive" : "border-border"}`} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">الحالة</label>
                    <select {...register("status")} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="متوفر">متوفر</option>
                      <option value="محدود">محدود</option>
                      <option value="نفذ">نفذ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">صورة المنتج</label>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="معاينة" className="w-20 h-20 object-cover rounded-lg mb-2" />
                      ) : (
                        <Upload size={24} className="text-muted-foreground mb-2" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {imageFile ? imageFile.name : "اضغط لاختيار صورة"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">الوصف</label>
                    <textarea {...register("description")} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-20" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" disabled={isSaving}
                    className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : (editingProduct ? "حفظ التعديلات" : "إضافة")}
                  </motion.button>
                  <button type="button" onClick={closeForm} className="flex-1 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium">إلغاء</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-card rounded-xl p-6 w-full max-w-sm shadow-lg text-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-foreground mb-2">حذف المنتج</h3>
              <p className="text-muted-foreground text-sm mb-6">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع.</p>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleDelete(deleteConfirm!)} disabled={deleteMutation.isPending}
                  className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium flex items-center justify-center">
                  {deleteMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : "حذف"}
                </motion.button>
                <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium">إلغاء</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          {productsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
              <p className="text-muted-foreground mt-4 text-sm">جاري تحميل قائمة المنتجات...</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">المنتج</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden sm:table-cell">الفئة</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">السعر</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium hidden md:table-cell">المخزون</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">الحالة</th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <motion.tr key={product.id} whileHover={{ backgroundColor: "hsl(35, 20%, 92%)" }} className="border-b border-border/50">
                    <td className="px-6 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-muted overflow-hidden">
                          {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <Package size={14} className="m-2 text-muted-foreground" />}
                        </div>
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground hidden sm:table-cell">{product.category?.name || "عام"}</td>
                    <td className="px-6 py-3 font-medium text-foreground">{product.price}</td>
                    <td className="px-6 py-3 text-foreground hidden md:table-cell">{product.stock}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === "متوفر" ? "bg-primary/10 text-primary" : product.status === "محدود" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                      }`}>{product.status}</span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openEdit(product)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Edit2 size={15} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDeleteConfirm(product.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                          <Trash2 size={15} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {(!products || products.length === 0) && (
                  <tr><td colSpan={6} className="text-center py-20 text-muted-foreground">
                    <Package className="mx-auto mb-3 opacity-20" size={48} />
                    لا توجد منتجات متوفرة
                  </td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
