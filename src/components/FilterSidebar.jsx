import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setCategory,
  setMaxPrice,
  setMinPrice,
  setRating,
} from "../features/filter/filterSlice";
import { useProducts } from "../context/ProductContext";

const FilterSidebar = ({ mobile = false, onDone }) => {
  const dispatch = useDispatch();
  const { categories } = useProducts();
  const filters = useSelector((state) => state.filter);

  return (
    <aside
      className={`${mobile ? "block" : "hidden lg:block"} rounded-lg bg-white p-5`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-black">
          <SlidersHorizontal size={18} /> Filters
        </h3>
        <button
          onClick={() => dispatch(resetFilters())}
          className="flex items-center gap-1 text-xs font-semibold text-[#146eb4]"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>
      <label className="mb-2 block text-sm font-bold">Category</label>
      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="mb-6 w-full rounded border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="all">All Categories</option>
        {categories.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.name || item.slug}
          </option>
        ))}
      </select>
      <label className="mb-2 block text-sm font-bold">Minimum price</label>
      <input
        type="number"
        min="0"
        value={filters.minPrice || ""}
        onChange={(e) => dispatch(setMinPrice(e.target.value))}
        placeholder="$0"
        className="mb-4 w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <label className="mb-2 block text-sm font-bold">Maximum price</label>
      <input
        type="number"
        min="0"
        value={filters.maxPrice || ""}
        onChange={(e) => dispatch(setMaxPrice(e.target.value))}
        placeholder="No limit"
        className="mb-6 w-full rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <label className="mb-2 block text-sm font-bold">Customer rating</label>
      <select
        value={filters.rating}
        onChange={(e) => dispatch(setRating(e.target.value))}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="0">All ratings</option>
        <option value="4">4★ & above</option>
        <option value="3">3★ & above</option>
        <option value="2">2★ & above</option>
      </select>
      {mobile && (
        <button
          onClick={onDone}
          className="mt-6 w-full rounded bg-[#ffd814] py-2 font-bold"
        >
          Apply Filters
        </button>
      )}
    </aside>
  );
};

export default FilterSidebar;
