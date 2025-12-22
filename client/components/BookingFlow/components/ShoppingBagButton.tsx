import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface ShoppingBagButtonProps {
  totalItemsCount: number;
  totalPrice: number;
  onClick: () => void;
}

/**
 * Floating shopping bag button component
 */
const ShoppingBagButton: React.FC<ShoppingBagButtonProps> = ({
  totalItemsCount,
  totalPrice,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-12 right-12 z-50 flex items-center gap-6 p-6 bg-white text-black shadow-2xl hover:scale-110 transition-all group border border-black/5 rounded-full"
    >
      <div className="relative">
        <ShoppingBag size={24} />
        {totalItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C4A484] text-white text-[8px] flex items-center justify-center rounded-full font-bold animate-in zoom-in">
            {totalItemsCount}
          </span>
        )}
      </div>
      <div className="pr-6 border-l border-black/10 pl-6 text-left hidden md:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Atelier Bag</p>
        <p className="text-xl font-serif font-bold text-black tabular-nums">${totalPrice}</p>
      </div>
    </button>
  );
};

export default ShoppingBagButton;

