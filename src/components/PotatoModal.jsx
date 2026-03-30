import { X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function PotatoModal({ isOpen, onClose, product, onAdd, toppings }) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) {
    return null;
  }

  const handleToppingChange = (topping) => {
    setSelectedToppings(prev => {
      const exists = prev.find(t => t.id === topping.id);
      if (exists) {
        return prev.filter(t => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const toppingsCost = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
  const totalPrice = (product.price + toppingsCost) * quantity;

  const handleAddToCart = () => {
    onAdd({
      product,
      toppings: selectedToppings,
      quantity,
      totalPrice
    });
    
    // Reset modal
    setSelectedToppings([]);
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden border-2 border-amber-500/30 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-slate-950 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold">{product?.name}</h2>
                <p className="text-slate-800 text-sm">Personaliza tu pedido</p>
              </div>
              <button
                onClick={onClose}
                className="bg-slate-950/20 hover:bg-slate-950/30 rounded-full p-2 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Product Image and Description */}
              <div className="space-y-3">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <p className="text-slate-300 text-sm">{product?.description}</p>
                <p className="text-amber-400 font-bold text-lg">
                  Precio base: ${product?.price.toLocaleString('es-CL')}
                </p>
              </div>

              {/* Toppings Section */}
              <div className="space-y-4">
                <h3 className="text-amber-400 font-bold text-lg">Escoge tus Toppings</h3>
                <p className="text-slate-400 text-sm">Selecciona los ingredientes que deseas adicionar (opcional)</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/50 p-4 rounded-xl">
                  {toppings.map((topping) => {
                    const isSelected = selectedToppings.find(t => t.id === topping.id);
                    return (
                      <label
                        key={topping.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500'
                            : 'bg-slate-900 border-slate-700 hover:border-amber-500/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToppingChange(topping)}
                          className="size-5 cursor-pointer accent-amber-500"
                        />
                        <div className="flex-1">
                          <p className="text-white font-semibold">{topping.name}</p>
                          <p className="text-amber-400 text-sm">+${topping.price.toLocaleString('es-CL')}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Summary */}
              {selectedToppings.length > 0 && (
                <div className="bg-slate-950/50 p-4 rounded-xl space-y-2 border border-amber-500/20">
                  <div className="flex justify-between text-slate-300">
                    <span>Precio base:</span>
                    <span>${product?.price.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Toppings:</span>
                    <span>+${toppingsCost.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="border-t border-amber-500/20 pt-2 flex justify-between text-amber-400 font-bold">
                    <span>Subtotal:</span>
                    <span>
                      ${(product?.price + toppingsCost).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Section */}
              <div className="space-y-3">
                <h3 className="text-amber-400 font-bold text-lg">Cantidad</h3>
                <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-amber-500/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-red-500 text-white size-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <Minus className="size-5" />
                  </button>
                  <span className="text-white text-xl font-bold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-amber-500 text-slate-950 size-10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer with Total and Add Button */}
            <div className="bg-slate-900/80 border-t border-amber-500/30 p-6 space-y-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-amber-400">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  ${totalPrice.toLocaleString('es-CL')}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all"
              >
                Agregar al Carrito
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
