# Techora — Amazon-style React e-commerce project

A portfolio-ready React e-commerce UI using DummyJSON, Context API, Redux Toolkit and Tailwind CSS.

## Features
- Amazon-style two-level header
- Search bar with product search
- Hero carousel using live DummyJSON products
- Two overlapping product images in hero
- All categories section
- Category filtering
- Price range filtering
- Rating filtering
- Sorting by featured, price, rating and discount
- Reusable ProductCard component
- Redux Toolkit cart
- Cart drawer with quantity controls
- Context API for products/categories/API state
- Responsive Tailwind UI
- All DummyJSON products (`limit=0`)

## Run

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Architecture

```text
src/
├── components/
│   ├── Header.jsx
│   ├── HeroCarousel.jsx
│   ├── CategorySection.jsx
│   ├── FilterSidebar.jsx
│   ├── ProductCard.jsx
│   ├── ProductSection.jsx
│   ├── CartDrawer.jsx
│   └── Footer.jsx
├── context/
│   └── ProductContext.jsx
├── features/
│   ├── cart/cartSlice.js
│   └── filter/filterSlice.js
├── services/
│   └── productService.js
├── store.js
├── App.jsx
├── main.jsx
└── index.css
```

## State responsibility
- **Context API:** DummyJSON products, categories, loading/error state and API functions.
- **Redux Toolkit:** cart state and filters/sorting state.
- **Component state:** hero slide, search text and mobile filter drawer.
