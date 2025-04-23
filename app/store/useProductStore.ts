
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";



// نوع بيانات المنتج (تعدليه حسب الـ backend عندك)
interface Product {
    _id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    category?: string;
    quantity?: number;
    // أضيفي باقي الخصائص حسب الحاجة
}
type CartProduct = Product & { quantity: number };




// نوع بيانات الحالة
interface ProductStore {
    products: Product[];

    loading: boolean;
    error?: string;
    productInCart: CartProduct[];
    cartProducts: CartProduct[];

    setProductInCart: (product: Product[]) => void;
    fetchAllProducts: () => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    toggleFeaturedProduct: (productId: string) => Promise<void>;
    getProductbyCategory: (category: string) => Promise<void>;
    getAllProducts: () => Promise<void>;
    bestSellers: Product[];
    fetchBestSellers: () => Promise<void>;
    productCategory: Product[];

    // updateCartProduct: CartProduct[];
    // cartProducts: CartProduct[];
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => void;

    setProducts: (products: Product[]) => void;
    createProduct: (productData: Partial<Product>) => Promise<void>;
    addToCart: (productId: string) => Promise<void>;
    getCartProducts: () => Promise<void>;
    updateCartProduct: (productId: string, quantity: number) => Promise<void>;
    recommendesProducts: () => Promise<void>;

}




export const useProductStore = create<ProductStore>((set) => ({



    products: [],
    loading: false,



    cartProducts: [],
    bestSellers: [],
    productCategory: [],
    productInCart: [],
    error: undefined,


    setProductInCart: (product) => set({ productInCart: product }),

    productCategoryMap: {},





    setProducts: (products) => set({ products }),


    createProduct: async (productData) => {
        set({ loading: true });

        try {
            const userString = localStorage.getItem("karfora-user");
            const user = userString ? JSON.parse(userString) : null;

            if (!user?.token) {
                toast.error("المستخدم غير مسجل الدخول.");
                set({ loading: false });
                return;
            }

            console.log("🔐 Token Sent:", user?.token);

            const res = await axios.post<Product>(
                "https://halwany-backend-production.up.railway.app/product/create",
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        token: ` ${user?.token}`,
                    },
                }
            );

            if (res.status !== 201) {
                toast.error("حدث خطأ أثناء إنشاء المنتج");
                set({ loading: false });
                return;
            }

            toast.success("تم إنشاء المنتج بنجاح");

            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false,
            }));
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "حدث خطأ أثناء إنشاء المنتج");
            set({ loading: false });
        }
    },


    fetchAllProducts: async () => {
        set({ loading: true });
        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        try {
            const response = await axios.get<Product[]>("https://halwany-backend-production.up.railway.app/product/all", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    token: `${user?.token}`,
                },
            });
            console.log("response", response?.data);

            set({ products: response?.data, loading: false });
            if (response.status !== 200) {
                toast.error("حدث خطأ أثناء جلب المنتجات");
                set({ loading: false });
                return;
            }
            toast.success("تم جلب المنتجات بنجاح");
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            console.error("Error fetching products:", error);
        }
    },

    deleteProduct: async (productId) => {

        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            await axios.delete(`https://halwany-backend-production.up.railway.app/product/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    token: ` ${user?.token}`,
                },
            });
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء حذف المنتج");
            console.error("Error deleting product:", error);
        }
    },

    toggleFeaturedProduct: async (productId) => {
        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.put(`https://halwany-backend-production.up.railway.app/product/${productId}`, {
                isFeatured: true,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    token: ` ${user?.token}`,
                },
            });
            // this will update the isFeatured prop of the product
            set((prevProducts) => ({
                products: prevProducts.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
                ),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء تحديث المنتج المميز");
            console.error("Error updating featured product:", error);
        }
    },

    fetchBestSellers: async () => {
        set({ loading: true });
        try {
            const response = await axios.get<Product[]>("https://halwany-backend-production.up.railway.app/product/best-selling", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            set({ bestSellers: response?.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch best sellers", loading: false });
            console.error("Error fetching best sellers:", error);
        }
    },


    getProductbyCategory: async (category) => {
        set({ loading: true });

        try {
            const response = await axios.get<Product[]>(`https://halwany-backend-production.up.railway.app/product/category/${category}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });


            set({ productCategory: response?.data, loading: false });
            if (response.status !== 200) {
                toast.error("حدث خطأ أثناء جلب المنتجات حسب الفئة");
                set({ loading: false });
                return;
            }
            toast.success("تم جلب المنتجات حسب الفئة بنجاح");
        } catch (error) {
            set({ error: "Failed to fetch products by category", loading: false });
            console.error("Error fetching products by category:", error);
        }
    },

    addToCart: async (productId) => {
        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            const response = await axios.post<Product>(
                `https://halwany-backend-production.up.railway.app/cart/${productId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        token: ` ${user?.token}`,
                    },
                }
            );
            set((prevState) => ({
                productInCart: [...prevState.productInCart, response.data],
                loading: false,
            }));
            toast.success("تم إضافة المنتج إلى السلة بنجاح");
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء إضافة المنتج إلى السلة");
            console.error("Error adding product to cart:", error);
        }
    },

    getCartProducts: async () => {

        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            const response = await axios.get<Product[]>(
                `https://halwany-backend-production.up.railway.app/cart`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        token: ` ${user?.token}`,
                    },
                }
            );
            set({ cartProducts: response?.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء جلب المنتجات من السلة");
            console.error("Error fetching cart products:", error);
        }
    },

    updateCartProduct: async (productId, quantity) => {
        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            const response = await axios.put<Product>(
                `https://halwany-backend-production.up.railway.app/cart/${productId}`,
                { quantity },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        token: `${user?.token}`,
                    },
                }
            );

            if (response.status === 200) {
                // فقط إعادة جلب السلة بعد التحديث
                await useProductStore.getState().getCartProducts();
                set({ loading: false });
                toast.success("تم تحديث المنتج في السلة بنجاح");
            } else {
                set({ loading: false });
                toast.error("حدث خطأ أثناء تحديث المنتج في السلة");
            }
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء تحديث المنتج في السلة");
            console.error("Error updating cart product:", error);
        }
    },


    removeFromCart: async (productId: string) => {
        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            await axios.delete<Product>(
                `https://halwany-backend-production.up.railway.app/cart/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        token: `${user?.token}`,
                    },
                }
            );

            set((prevState) => ({
                cartProducts: prevState.cartProducts.filter((product) => product._id !== productId),
                loading: false,
            }));
            toast.success("تم إزالة المنتج من السلة بنجاح");
            // إعادة جلب السلة بعد الحذف
            await useProductStore.getState().getCartProducts();

        }
        catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء إزالة المنتج من السلة");
            console.error("Error removing product from cart:", error);
        }
    },


    clearCart: async () => {
        const userString = localStorage.getItem("karfora-user");
        const user = userString ? JSON.parse(userString) : null;
        if (!user?.token) {
            toast.error("المستخدم غير مسجل الدخول.");
            set({ loading: false });
            return;
        }
        set({ loading: true });
        try {
            await axios.delete(
                `https://halwany-backend-production.up.railway.app/cart/delete`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        token: `${user?.token}`,
                    },
                }
            );
            set({ cartProducts: [], loading: false });
            toast.success("تم تفريغ السلة بنجاح");
        }
        catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء تفريغ السلة");
            console.error("Error clearing cart:", error);
        }
    },

    getAllProducts: async () => {

        set({ loading: true });
        try {
            const response = await axios.get<Product[]>(
                `https://halwany-backend-production.up.railway.app/product/get`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            set({ products: response?.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء جلب المنتجات");
            console.error("Error fetching products:", error);
        }
    },


    recommendesProducts: async () => {

        set({ loading: true });
        try {
            const response = await axios.get<Product[]>(
                `https://halwany-backend-production.up.railway.app/product/recommended`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            set({ products: response?.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error("حدث خطأ أثناء جلب المنتجات");
            console.error("Error fetching products:", error);
        }
    },






}));
