import { useState } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import CategorySection from './components/CategorySection';
import ProductSection from './components/ProductSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#eaeded] text-gray-900">
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <HeroCarousel />
        <CategorySection />
        <ProductSection />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default App;
