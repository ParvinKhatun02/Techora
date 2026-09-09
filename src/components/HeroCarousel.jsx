
import { ChevronLeft,ChevronRight, ShoppingCart, Star, ShieldCheck, Truck, BadgeCheck, } from "lucide-react";
 import { useHeroCarousel } from "./HeroCarouselLogic"; 
      
 const HeroCarousel = () => { 
  const { loading, slides, index, product,frontImage, backImage, discount, oldPrice,
     nextSlide, previousSlide, goToSlide, handleAddToCart, } = useHeroCarousel();
      if (loading || !slides.length) { return ( 
       <div className="mx-auto h-[300px] max-w-[1600px] animate-pulse bg-gray-200 sm:h-[400px] md:h-[590px]" /> 
       );
   }
     return ( 
     <section className="relative mx-auto max-w-[1600px] overflow-hidden bg-white hero-gradient">
   <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.96)_0%,rgba(255,255,255,.72)_46%,rgba(255,255,255,0)_78%)]" />
                   
  <button onClick={previousSlide} aria-label="Previous slide" className="absolute left-1 
  top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full
 bg-white/90 shadow-md hover:bg-white sm:left-3 sm:h-10 sm:w-10 md:left-4 md:h-12 md:w-12" >
  <ChevronLeft size={18} className="sm:h-5 sm:w-5 md:h-6 md:w-6" />
  </button>
                       
                        
 <button onClick={nextSlide} aria-label="Next slide" className="absolute right-1 top-1/2 
 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 
 shadow-md hover:bg-white sm:right-3 sm:h-10 sm:w-10 md:right-4 md:h-12 md:w-12" > 
                        
 <ChevronRight size={18} className="sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        
 </button>
                         
                         
 <div className=" relative grid min-h-[285px] grid-cols-[55%_45%] items-center px-6
 py-3 sm:min-h-[380px] sm:grid-cols-[52%_48%] sm:px-10 sm:py-6 md:min-h-[590px] md:grid-cols-2 
md:px-20 md:py-10 lg:px-28 " >
                           
 <div className="z-20 max-w-[620px]">
 <p className=" mb-1 text-[7px] font-bold uppercase tracking-[1px] text-[#c45500] 
  sm:mb-2 sm:text-[10px] sm:tracking-[2px] md:mb-4 md:text-sm md:tracking-[3px] " >
   Featured Collection
 </p>
                               
 <h1 className=" max-w-[600px] text-xl font-black leading-[1.02] text-[#17233] sm:text-3xl
  md:text-5xl lg:text-6xl " >
                                
   {product.title}
  </h1>
                                  
  <p className=" mt-2 max-w-[540px] text-[9px] leading-4 text-gray-600
   line-clamp-2 sm:mt-3 sm:text-xs sm:leading-5 md:mt-6 md:text-base md:leading-7 md:line-clamp-3 " > 
   {product.description}
   </p>
                                       
 <div className=" mt-2 flex items-center gap-1 sm:mt-3 sm:gap-2 md:mt-5 md:gap-4 " >
 <div className="flex items-center gap-0.5 text-[#f59e0b]">
                                       
   {Array.from({ length: 5 }).map((_, i) => (
  <Star key={i} size={10}  className="sm:h-3 sm:w-3 md:h-[17px] md:w-[17px]"
      fill={ i < Math.round(product.rating) ? "currentColor" : "none" } />
     )
   )
 } 
 </div> 
                                        
 <span className="text-[9px] font-bold text-[#146eb4] sm:text-xs md:text-base"> 
  {product.rating} 
</span>
                                         
<span className="hidden text-gray-500 sm:inline sm:text-[10px] md:text-sm">
                                         
   ({Math.round(product.rating * 600)} ratings)
 </span>
                                          
</div> 
                                           
<div className=" mt-2 flex flex-wrap items-end gap-1 sm:mt-3 sm:gap-2 md:mt-5 md:gap-3 " >
 <span className="text-lg font-black text-[#111827] sm:text-2xl md:text-3xl">
 ${product.price.toFixed(2)} 
   </span> 
                                            
  <span className="text-[8px] text-gray-400 line-through sm:text-xs md:text-sm"> 
    ${oldPrice.toFixed(2)} 
   </span> 
                                            
 <span className="text-[9px] font-bold text-[#c45500] sm:text-xs md:text-base">
   {discount}% off 
   </span>
                                             
</div> 
                                             
<div className=" mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2 md:mt-7 md:gap-3 " > 
 <button onClick={() => handleAddToCart(product)}
   className=" flex items-center gap-1 rounded-md bg-[#ffd814] px-2.5 py-1.5 text-[9px] 
   font-bold text-gray-900 shadow-sm hover:bg-[#f7ca00] sm:gap-1.5 sm:px-4 sm:py-2 
   sm:text-xs md:gap-2 md:rounded-lg md:px-7 md:py-3 md:text-base " >
                                               
  <ShoppingCart size={11} className="sm:h-4 sm:w-4 md:h-[19px] md:w-[19px]" /> 
   Add to Cart
   </button>
                                               
   <button className=" rounded-md border border-gray-500 bg-white px-2.5 py-1.5 text-[9px]
     font-bold hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-xs md:rounded-lg md:px-7 md:py-3 md:text-base " >
     Learn More
   </button> 
  </div>
                                                     
<div className=" mt-3 grid max-w-[600px] grid-cols-3 gap-1 border-t border-gray-200 
   pt-2 text-[7px] sm:mt-5 sm:gap-2 sm:pt-3 sm:text-[10px] md:mt-9 md:gap-4 md:pt-5 md:text-sm " >
    <div className="flex gap-1 sm:gap-1.5 md:gap-2">
  <ShieldCheck className="shrink-0 text-[#147eb3]" size={13} />
 <span> <b className="block">Secure</b>  Payments </span> 
  </div> 
<div className="flex gap-1 sm:gap-1.5 md:gap-2">
 <Truck className="shrink-0 text-[#147eb3]" size={13} /> 
  <span> <b className="block">Fast</b> Delivery </span> 
   </div> 
  <div className="flex gap-1 sm:gap-1.5 md:gap-2"> 
  <BadgeCheck className="shrink-0 text-[#147eb3]" size={13} />
  <span> 
  <b className="block">Top Rated</b> Product  </span> 
  </div> 
 </div> 
 </div>
                                                        
<div className=" relative mx-auto h-[220px] w-full max-w-[600px] sm:h-[300px] md:h-[430px] " >
                                                          
  <div className=" absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full
   bg-orange-200/60 blur-3xl sm:h-[220px] sm:w-[220px] md:h-[350px] md:w-[350px] " />
   <div className=" absolute right-0 top-1 z-40 flex h-12 w-12 flex-col items-center justify-center
 rounded-full bg-[#ff9900] text-white shadow-xl sm:h-16 sm:w-16 md:right-3 md:top-5 md:h-24 md:w-24 " > 
 <span className="text-sm font-black sm:text-lg md:text-2xl">
 {discount}% 
 </span>
 <span className="text-[8px] font-bold sm:text-xs md:text-base"> OFF </span>
</div>
                                                                  
<img src={frontImage} alt={product.title} className=" product-image absolute left-1/2 top-1/2 z-20 
 h-[145px] w-[170px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_20px_15px_rgba(0,0,0,.22)] transition-all duration-500
  sm:h-[210px] sm:w-[240px] md:hidden " /> 
                                                                    
 <img src={backImage} alt={product.title} className=" product-image absolute left-[12%] top-[8%]
   z-10 hidden h-[340px] w-[260px] rotate-[-9deg] object-contain drop-shadow-[0_30px_25px_rgba(0,0,0,.2)]
   transition-all duration-500 md:block " />
  <img src={frontImage} alt={product.title} className=" product-image absolute right-[8%] top-[18%]
    z-20 hidden h-[330px] w-[280px] rotate-[8deg] object-contain drop-shadow-[0_35px_25px_rgba(0,0,0,.25)] 
   transition-all duration-500 md:block " />
                                                                       
 <div className=" absolute bottom-1 left-1/2 z-0 h-5 w-[180px] -translate-x-1/2 rounded-[50%]
   bg-gray-500/30 blur-xl sm:bottom-4 sm:h-7 sm:w-[280px] md:bottom-6 md:h-8 md:w-[390px] " /> 

   </div>
</div>
                                                                           
<div className=" absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 gap-1.5 sm:bottom-4 sm:gap-2 md:bottom-5 " >
{slides.map((slide, i) => ( 
  <button key={slide.id} onClick={() => goToSlide(i)}
  aria-label={`Go to slide ${i + 1}`}
  className={`h-1.5 rounded-full transition-all sm:h-2 md:h-2.5 ${ i === index ? 
  "w-5 bg-[#131921] sm:w-6 md:w-8" : "w-1.5 bg-gray-300 sm:w-2 md:w-2.5" }`
 }  />
))
} 
</div>
</section>
 );
                                                                
};
                                                                
                                                                
 export default HeroCarousel;