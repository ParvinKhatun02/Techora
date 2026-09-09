import { useEffect, useMemo, useState } from "react";
 import { useProducts } from "../context/ProductContext";
  import { useDispatch } from "react-redux";
   import { addToCart } from "../features/cart/cartSlice";
   
   
   export const useHeroCarousel = () => { const { products, loading } = useProducts();
   
   const dispatch = useDispatch();
   
   const [index, setIndex] = useState(0);
   
 const slides = useMemo(() => { const preferred = products.filter((product) => 
    [ "smartphones", "laptops", "tablets", "mens-watches", "womens-watches", ]
    .includes(product.category), );
     return (preferred.length ? preferred : products)
     .slice(0, 6); }, [products]);
      
        useEffect(() => { if (slides.length < 2) return undefined;
         const timer = setInterval(() => { setIndex((prev) => (prev + 1) % slides.length); }, 5500); 
         return () => clearInterval(timer); }, [slides.length]);
          
           useEffect(() => { 
            if (index >= slides.length && slides.length > 0) 
                { setIndex(0); } }, [slides.length, index]);
            
            const nextSlide = () => { 
                setIndex((prev) => (prev + 1) % slides.length);

             }; 
            
            const previousSlide = () => { 
                setIndex((prev) => (prev - 1 + slides.length) % slides.length); 
            }; 
            
            const goToSlide = (slideIndex) => { setIndex(slideIndex); }; 
            
            const handleAddToCart = (product) => { 
                dispatch(addToCart(product));

             };
             
             const product = slides[index]; 
             
             const frontImage = product?.images?.[0] || product?.thumbnail;
             
             const backImage = product?.images?.[1] || product?.thumbnail;
             
             const discount = Math.round(product?.discountPercentage || 10);
             
             const oldPrice = product ? product.price / (1 - Math.min(product.discountPercentage || 10, 70) / 100) : 0;
             
             return {
                 products,
                  loading,
                   slides, index,
                    product,
                     frontImage,
                      backImage, discount,
                       oldPrice,
                        nextSlide,
                         previousSlide, 
                         goToSlide,
                          handleAddToCart, };
                        
                        };