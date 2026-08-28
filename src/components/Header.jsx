import { useMemo, useState } from "react";
import {
  MapPin,
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  Package,
  Heart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/filter/filterSlice";
import { useProducts } from "../context/ProductContext";

const Header = ({ onCartClick }) => {
  const dispatch = useDispatch();
  const { categories } = useProducts();
  const category = useSelector((state) => state.filter.category);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const [search, setSearch] = useState("");

  const categoryOptions = useMemo(() => categories.slice(0, 12), [categories]);

  const handleSearch = (event) => {
    event.preventDefault();
    const target = document.getElementById("products");
    target?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("techora-search", { detail: search }));
  };

  return (
    <header className="sticky top-0 z-50 text-white shadow-md">
      <div className="bg-[#131921]">
        <div className="mx-auto flex h-[70px] max-w-[1600px] items-center gap-3 px-3 sm:px-5 lg:px-8">
          <button
            className="shrink-0 border border-transparent px-2 py-1 hover:border-white"
            aria-label="Techora home"
          >
            <span className="text-2xl font-black tracking-tight">
              Tech<span className="text-[#ff9900]">ora</span>
            </span>
            <span className="ml-1 text-xs text-gray-300">⌁</span>
          </button>

          <div className="hidden items-center gap-1 border border-transparent px-2 py-1 hover:border-white md:flex">
            <MapPin size={19} />
            <div className="leading-tight">
              <p className="text-[11px] text-gray-300">Deliver to</p>
              <p className="text-sm font-bold">Kolkata 700001</p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex min-w-0 flex-1 overflow-hidden rounded-md bg-white text-gray-900 focus-within:ring-2 focus-within:ring-[#ff9900]"
          >
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="hidden w-28 border-r bg-gray-100 px-2 text-sm outline-none sm:block"
            >
              <option value="all">All</option>
              {categoryOptions.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Techora"
              className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
            />
            <button
              className="flex w-12 shrink-0 items-center justify-center bg-[#febd69] text-gray-900 hover:bg-[#f3a847]"
              aria-label="Search"
            >
              <Search size={23} />
            </button>
          </form>

          <button className="hidden items-center gap-1 border border-transparent px-2 py-2 text-left hover:border-white lg:flex">
            <span className="text-lg">🇮🇳</span>
            <span className="text-sm">EN</span>
            <ChevronDown size={13} />
          </button>
          <button className="hidden border border-transparent px-2 py-2 text-left leading-tight hover:border-white md:block">
            <span className="block text-xs">Hello, Sign in</span>
            <span className="font-bold">Account & Lists</span>
          </button>
          <button className="hidden border border-transparent px-2 py-2 text-left leading-tight hover:border-white lg:block">
            <span className="block text-xs">Returns</span>
            <span className="font-bold">& Orders</span>
          </button>
          <button
            onClick={onCartClick}
            className="relative flex items-center border border-transparent px-2 py-2 hover:border-white"
            aria-label="Open cart"
          >
            <ShoppingCart size={31} />
            <span className="absolute left-[18px] top-0 rounded-full bg-[#ff9900] px-1.5 text-xs font-bold text-gray-900">
              {cartCount}
            </span>
            <span className="hidden font-bold lg:block">Cart</span>
          </button>
        </div>
      </div>

      <nav className="bg-[#232f3e]">
        <div className="mx-auto flex h-11 max-w-[1600px] items-center gap-1 overflow-x-auto px-3 text-sm font-semibold whitespace-nowrap hide-scrollbar sm:px-5 lg:px-8">
          <button className="flex items-center gap-2 px-3 py-2 hover:outline hover:outline-1 hover:outline-white">
            <Menu size={20} /> All
          </button>
          <button
            onClick={() => dispatch(setCategory("all"))}
            className="px-3 py-2 hover:outline hover:outline-1 hover:outline-white"
          >
            Today's Deals
          </button>
          <button
            onClick={() => dispatch(setCategory("smartphones"))}
            className="px-3 py-2 hover:outline hover:outline-1 hover:outline-white"
          >
            Mobiles
          </button>
          <button
            onClick={() => dispatch(setCategory("laptops"))}
            className="px-3 py-2 hover:outline hover:outline-1 hover:outline-white"
          >
            Electronics
          </button>
          <button className="px-3 py-2 hover:outline hover:outline-1 hover:outline-white">
            Best Sellers
          </button>
          <button className="px-3 py-2 hover:outline hover:outline-1 hover:outline-white">
            New Arrivals
          </button>
          <button className="px-3 py-2 hover:outline hover:outline-1 hover:outline-white">
            Customer Service
          </button>
          <span className="ml-auto hidden items-center gap-5 text-xs text-gray-200 xl:flex">
            <span>
              <Package size={14} className="mr-1 inline" /> Fast Delivery
            </span>
            <span>
              <Heart size={14} className="mr-1 inline" /> Wishlist
            </span>
            <span>
              <User size={14} className="mr-1 inline" /> My Account
            </span>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
