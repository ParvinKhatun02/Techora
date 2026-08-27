import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const HeroCarousel = () => {
  const { products, loading } = useProducts();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const preferred = products.filter((p) => ['smartphones', 'laptops', 'tablets', 'mens-watches', 'womens-watches'].includes(p.category));
    return (preferred.length ? preferred : products).slice(0, 6);
  }, [products]);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading || !slides.length) return <div className="mx-auto min-h-[500px] max-w-[1600px] animate-pulse bg-gray-200" />;
  const product = slides[index];
  const backImage = product.images?.[1] || product.thumbnail;
  const frontImage = product.images?.[0] || product.thumbnail;
  const oldPrice = product.price / (1 - Math.min(product.discountPercentage || 10, 70) / 100);

  return (
    <section className="relative mx-auto max-w-[1600px] overflow-hidden bg-white hero-gradient">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.95)_0%,rgba(255,255,255,.7)_46%,rgba(255,255,255,0)_78%)]" />
      <button onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-white" aria-label="Previous slide"><ChevronLeft /></button>
      <button onClick={() => setIndex((prev) => (prev + 1) % slides.length)} className="absolute right-4 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-white" aria-label="Next slide"><ChevronRight /></button>

      <div className="relative grid min-h-[590px] grid-cols-1 items-center px-10 py-10 md:grid-cols-2 md:px-20 lg:px-28">
        <div className="z-20 max-w-[620px] pt-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[3px] text-[#c45500]">Featured Collection</p>
          <h1 className="max-w-[600px] text-4xl font-black leading-[1.02] text-[#172337] sm:text-5xl lg:text-6xl">{product.title}</h1>
          <p className="mt-6 max-w-[540px] text-base leading-7 text-gray-600 line-clamp-3">{product.description}</p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#f59e0b]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={17} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />)}</div>
            <span className="font-bold text-[#146eb4]">{product.rating}</span><span className="text-gray-500">({Math.round(product.rating * 600)} ratings)</span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3"><span className="text-3xl font-black text-[#111827]">${product.price.toFixed(2)}</span><span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span><span className="font-bold text-[#c45500]">{Math.round(product.discountPercentage || 10)}% off</span></div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => dispatch(addToCart(product))} className="flex items-center gap-2 rounded-lg bg-[#ffd814] px-7 py-3 font-bold text-gray-900 shadow-sm hover:bg-[#f7ca00]"><ShoppingCart size={19} /> Add to Cart</button>
            <button className="rounded-lg border border-gray-500 bg-white px-7 py-3 font-bold hover:bg-gray-50">Learn More</button>
          </div>

          <div className="mt-9 grid max-w-[600px] grid-cols-3 gap-4 border-t border-gray-200 pt-5 text-xs sm:text-sm">
            <div className="flex gap-2"><ShieldCheck className="text-[#147eb3]" size={25}/><span><b className="block">Secure</b>Payments</span></div>
            <div className="flex gap-2"><Truck className="text-[#147eb3]" size={25}/><span><b className="block">Fast</b>Delivery</span></div>
            <div className="flex gap-2"><BadgeCheck className="text-[#147eb3]" size={25}/><span><b className="block">Top Rated</b>Product</span></div>
          </div>
        </div>

        <div className="relative mx-auto h-[430px] w-full max-w-[600px]">
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="absolute right-3 top-5 z-40 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#ff9900] text-white shadow-xl"><span className="text-2xl font-black">{Math.round(product.discountPercentage || 10)}%</span><span className="font-bold">OFF</span></div>
          <img src={backImage} alt={product.title} className="product-image absolute left-[12%] top-[8%] z-10 h-[340px] w-[260px] rotate-[-9deg] object-contain drop-shadow-[0_30px_25px_rgba(0,0,0,.2)] transition-all duration-500" />
          <img src={frontImage} alt={product.title} className="product-image absolute right-[8%] top-[18%] z-20 h-[330px] w-[280px] rotate-[8deg] object-contain drop-shadow-[0_35px_25px_rgba(0,0,0,.25)] transition-all duration-500" />
          <div className="absolute bottom-6 left-1/2 z-0 h-8 w-[390px] -translate-x-1/2 rounded-[50%] bg-gray-500/30 blur-xl" />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-2">{slides.map((slide, i) => <button key={slide.id} onClick={() => setIndex(i)} className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#131921]' : 'w-2.5 bg-gray-300'}`} aria-label={`Go to slide ${i + 1}`} />)}</div>
    </section>
  );
};

export default HeroCarousel;
