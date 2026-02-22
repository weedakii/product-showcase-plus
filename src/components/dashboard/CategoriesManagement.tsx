import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Search, Loader2, Package } from "lucide-react";
import { 
  useAdminCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory,
} from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categorieschema = z.object({
  name: z.string().min(2, "اسم المنتج يجب أن يكون حرفين على الأقل"),
});

type CategoryFormData = z.infer<typeof categorieschema>;

const CategoriesManagement = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const { data: categories, isLoading: categoriesLoading } = useAdminCategories({
      search,
    });
  
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorieschema),
    defaultValues: {
      name: "",
    }
  });

  const onSave = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({ ...data, id: editingCategory.id });
        toast({ title: "تم التحديث", description: "تم تحديث الفئة بنجاح" });
      } else {
        await createMutation.mutateAsync(data);
        toast({ title: "تمت الإضافة", description: "تمت إضافة الفئة بنجاح" });
      }
      closeForm();
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل حفظ الفئة" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "تم الحذف", description: "تم حذف الفئة بنجاح" });
      setDeleteConfirm(null);
    } catch (err) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل حذف الفئة" });
    }
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    reset({
      name: category.name,
    });
    setIsAdding(false);
  };

  const openAdd = () => {
    setEditingCategory(null);
    reset({
      name: "",
    });
    setIsAdding(true);
  };

  const closeForm = () => {
    setEditingCategory(null);
    setIsAdding(false);
    reset();
  };

  const showForm = isAdding || editingCategory;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="بحث عن فئة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 pl-4 py-2 rounded-lg border border-border bg-card text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
        >
          <Plus size={16} />
          إضافة فئة
        </motion.button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-6 w-full max-w-md shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit(onSave)}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">
                    {editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
                  </h3>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="p-1 hover:bg-muted rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      اسم الفئة
                    </label>
                    <input
                      {...register("name")}
                      className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-border"}`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center"
                  >
                    {isSaving ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : editingCategory ? (
                      "حفظ التعديلات"
                    ) : (
                      "إضافة"
                    )}
                  </motion.button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-card rounded-xl p-6 w-full max-w-sm shadow-lg text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                حذف الفئة
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                هل أنت متأكد من حذف هذه الفئة؟ لا يمكن التراجع.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDelete(deleteConfirm!)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium flex items-center justify-center"
                >
                  {deleteMutation.isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "حذف"
                  )}
                </motion.button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          {categoriesLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
              <p className="text-muted-foreground mt-4 text-sm">
                جاري تحميل قائمة الفئات...
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    الفئة
                  </th>
                  <th className="text-right px-6 py-3 text-muted-foreground font-medium">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <motion.tr
                    key={category.id}
                    whileHover={{ backgroundColor: "hsl(35, 20%, 92%)" }}
                    className="border-b border-border/50"
                  >
                    <td className="px-6 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEdit(category)}
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 size={15} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeleteConfirm(category.id)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={15} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {(!categories || categories.length === 0) && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-20 text-muted-foreground"
                    >
                      <Package className="mx-auto mb-3 opacity-20" size={48} />
                      لا توجد فئات متوفرة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
