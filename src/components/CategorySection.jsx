import { useDispatch } from "react-redux";
import { setCategory } from "../features/filter/filterSlice";
import { useProducts } from "../context/ProductContext";

const icons = {
  smartphones: "📱",
  laptops: "💻",
  tablets: "📲",
  mensWatches: "⌚",
  womensWatches: "💎",
  fragrances: "🌸",
  skincare: "🧴",
  beauty: "💄",
  groceries: "🛒",
  furniture: "🛋️",
  tops: "👕",
  sunglasses: "🕶️",
};

const pretty = (value) =>
  value.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

const CategorySection = () => {
  const dispatch = useDispatch();
  const { categories } = useProducts();
  const items = categories.slice(0, 12);

  return (
    <section className="mx-auto max-w-[1600px] bg-white px-5 py-8 sm:px-8 lg:px-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#c45500]">
            Shop by category
          </p>
          <h2 className="mt-1 text-2xl font-black text-[#172337]">
            Explore all categories
          </h2>
        </div>
        <button
          onClick={() => dispatch(setCategory("all"))}
          className="text-sm font-semibold text-[#146eb4] hover:underline"
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {items.map((item) => (
          <button
            key={item.slug}
            onClick={() => {
              dispatch(setCategory(item.slug));
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#f3f3f3] text-4xl group-hover:bg-[#fff4e5]">
              {icons[item.slug] || "🛍️"}
            </div>
            <p className="text-sm font-bold text-gray-700">
              {item.name || pretty(item.slug)}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
