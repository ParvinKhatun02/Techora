import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProductContext = createContext(null);
const API = "https://dummyjson.com";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API}/products?limit=0`);
      if (!response.ok) throw new Error("Unable to load products.");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API}/products/categories`);
      if (!response.ok) throw new Error("Unable to load categories.");
      const data = await response.json();
      const normalized = (data || []).map((item) => {
        if (typeof item === "string") return { slug: item, name: item };
        return { slug: item.slug, name: item.name || item.slug };
      });
      setCategories(normalized);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      error,
      fetchProducts,
      fetchCategories,
    }),
    [products, categories, loading, error, fetchProducts, fetchCategories],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used inside ProductProvider");
  return context;
};
