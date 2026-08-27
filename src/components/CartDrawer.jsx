import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseQuantity, removeFromCart } from '../features/cart/cartSlice';

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/50" onClick={onClose}>
      <aside onClick={(e) => e.stopPropagation()} className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-5"><h2 className="flex items-center gap-2 text-lg font-black"><ShoppingCart size={21}/> Your Cart ({totalQuantity})</h2><button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100"><X/></button></div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingCart size={48} className="text-gray-300"/><h3 className="mt-4 font-bold">Your cart is empty</h3><p className="mt-1 text-sm text-gray-500">Add something you love.</p></div> : <div className="space-y-4">{items.map((item) => <div key={item.id} className="flex gap-3 border-b pb-4"><img src={item.thumbnail} alt={item.title} className="h-20 w-20 rounded bg-gray-50 object-contain"/><div className="min-w-0 flex-1"><h3 className="line-clamp-2 text-sm font-bold">{item.title}</h3><p className="mt-1 font-black">${item.price.toFixed(2)}</p><div className="mt-2 flex items-center gap-2"><button onClick={() => dispatch(decreaseQuantity(item.id))} className="rounded border p-1"><Minus size={13}/></button><span className="min-w-5 text-center text-sm">{item.quantity}</span><button onClick={() => dispatch(addToCart(item))} className="rounded border p-1"><Plus size={13}/></button><button onClick={() => dispatch(removeFromCart(item.id))} className="ml-auto text-red-500"><Trash2 size={16}/></button></div></div></div>)}</div>}
        </div>
        {items.length > 0 && <div className="border-t p-5"><div className="mb-4 flex justify-between text-lg font-black"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div><button className="w-full rounded-lg bg-[#ffd814] py-3 font-black hover:bg-[#f7ca00]">Proceed to Checkout</button><button onClick={() => dispatch(clearCart())} className="mt-3 w-full text-sm font-semibold text-red-600">Clear Cart</button></div>}
      </aside>
    </div>
  );
};

export default CartDrawer;
