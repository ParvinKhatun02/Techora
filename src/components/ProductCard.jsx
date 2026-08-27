import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const discount = Math.round(product.discountPercentage || 0);
  return (
    <article className="group relative flex min-w-0 flex-col rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <button className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-400 shadow hover:text-red-500" aria-label="Add to wishlist"><Heart size={17}/></button>
      <div className="flex h-[210px] items-center justify-center overflow-hidden rounded-md bg-[#f7f7f7] p-5"><img src={product.thumbnail || product.images?.[0]} alt={product.title} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" loading="lazy" /></div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{product.brand || product.category}</p>
        <h3 className="line-clamp-2 min-h-[42px] text-sm font-semibold leading-5 text-[#172337]">{product.title}</h3>
        <div className="mt-2 flex items-center gap-2"><span className="flex items-center gap-1 rounded bg-[#fff3cd] px-1.5 py-0.5 text-xs font-bold text-[#7a4f00]"><Star size={12} fill="currentColor" /> {product.rating}</span><span className="text-xs text-gray-500">{Math.round(product.rating * 300)} ratings</span></div>
        <div className="mt-3 flex items-baseline gap-2"><span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>{discount > 0 && <span className="text-xs font-bold text-[#c45500]">{discount}% off</span>}</div>
        <p className="mt-1 text-xs text-gray-500">FREE Delivery</p>
        <button onClick={() => dispatch(addToCart(product))} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-2 text-sm font-bold hover:bg-[#f7ca00]"><ShoppingCart size={16}/> Add to Cart</button>
      </div>
    </article>
  );
};

export default ProductCard;
