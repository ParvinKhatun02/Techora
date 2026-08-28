import { useEffect, useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { useProducts } from "../context/ProductContext";
import { useDispatch } from "react-redux";
import { setSort } from "../features/filter/filterSlice";

const ProductSection = () => {
  const { products, loading, error } = useProducts();
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    const handler = (event) => setSearch(event.detail || "");
    window.addEventListener("techora-search", handler);
    return () => window.removeEventListener("techora-search", handler);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;
      const matchesSearch =
        !search.trim() ||
        `${product.title} ${product.description} ${product.brand || ""} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesMin = !filters.minPrice || product.price >= filters.minPrice;
      const matchesMax = !filters.maxPrice || product.price <= filters.maxPrice;
      const matchesRating = !filters.rating || product.rating >= filters.rating;
      return (
        matchesCategory &&
        matchesSearch &&
        matchesMin &&
        matchesMax &&
        matchesRating
      );
    });

    if (filters.sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (filters.sort === "discount")
      result.sort(
        (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0),
      );
    return result;
  }, [products, filters, search]);

  return (
    <section
      id="products"
      className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#c45500]">
            Shop Techora
          </p>
          <h2 className="mt-1 text-2xl font-black">Products for every need</h2>
          <p className="mt-1 text-sm text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>
        <button
          onClick={() => setMobileFilters(true)}
          className="flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-bold lg:hidden"
        >
          <SlidersHorizontal size={17} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[230px_1fr]">
        <FilterSidebar />
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold">Sort by:</span>
              <select
                value={filters.sort}
                onChange={(e) => dispatch(setSort(e.target.value))}
                className="rounded border border-gray-300 px-3 py-1.5 font-semibold outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="flex items-center gap-1 text-sm text-[#146eb4]"
              >
                Search: “{search}” <X size={15} />
              </button>
            )}
          </div>

          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[430px] animate-pulse rounded-lg bg-white"
                />
              ))}
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-white p-10 text-center text-red-600">
              {error}
              <button
                className="ml-3 font-bold underline"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="rounded-lg bg-white p-16 text-center">
              <h3 className="text-xl font-black">No products found</h3>
              <p className="mt-2 text-gray-500">
                Try another search or reset your filters.
              </p>
            </div>
          )}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] bg-black/50 p-4 lg:hidden">
          <div className="mx-auto mt-12 max-w-md">
            <div className="mb-2 flex justify-end">
              <button
                onClick={() => setMobileFilters(false)}
                className="rounded-full bg-white p-2"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar mobile onDone={() => setMobileFilters(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
