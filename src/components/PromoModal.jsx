import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function PromoModal({ isOpen, onClose, product, onAdd, pizzas, drinks }) {
  const [selectedPizzaId, setSelectedPizzaId] = useState('');
  const [selectedDrinkId, setSelectedDrinkId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (pizzas && pizzas.length > 0) {
      setSelectedPizzaId(pizzas[0].id);
    }
    if (drinks && drinks.length > 0) {
      setSelectedDrinkId(drinks[0].id);
    }
    setQuantity(1);
  }, [isOpen, pizzas, drinks]);

  if (!isOpen || !product) return null;

  const selectedPizza = pizzas.find(p => p.id === selectedPizzaId);
  const selectedDrink = drinks.find(d => d.id === selectedDrinkId);
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    onAdd({
      product,
      pizza: selectedPizza || { name: 'Desconocido' },
      drink: selectedDrink || { name: 'Desconocido' },
      quantity,
      totalPrice
    });

    onClose();
    setQuantity(1);
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden border-2 border-amber-500/30 flex flex-col"
          >
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-slate-950 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-slate-800 text-sm">Elige tu pizza y bebida</p>
              </div>
              <button onClick={onClose} className="bg-slate-950/20 hover:bg-slate-950/30 rounded-full p-2 transition-colors">
                <X className="size-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="space-y-3">
                <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-xl" />
                <p className="text-slate-300 text-sm">{product.description}</p>
                <p className="text-amber-400 font-bold text-lg">Precio promo: ${product.price.toLocaleString('es-CL')}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-amber-400 font-bold text-lg">Selección de pizza</h3>
                <div className="grid grid-cols-1 gap-2">
                  {pizzas.map((pizza) => (
                    <label key={pizza.id} className="flex items-center gap-3 p-3 bg-slate-950/70 rounded-lg border border-slate-700 hover:border-amber-500">
                      <input
                        type="radio"
                        name="promo-pizza"
                        value={pizza.id}
                        checked={selectedPizzaId === pizza.id}
                        onChange={() => setSelectedPizzaId(pizza.id)}
                        className="accent-amber-500"
                      />
                      <span className="text-white font-semibold">{pizza.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-amber-400 font-bold text-lg">Selección de bebida</h3>
                <div className="grid grid-cols-1 gap-2">
                  {drinks.map((drink) => (
                    <label key={drink.id} className="flex items-center gap-3 p-3 bg-slate-950/70 rounded-lg border border-slate-700 hover:border-amber-500">
                      <input
                        type="radio"
                        name="promo-drink"
                        value={drink.id}
                        checked={selectedDrinkId === drink.id}
                        onChange={() => setSelectedDrinkId(drink.id)}
                        className="accent-amber-500"
                      />
                      <span className="text-white font-semibold">{drink.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-amber-400 font-bold text-lg">Cantidad</h3>
                <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-amber-500/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-red-500 text-white size-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white text-xl font-bold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-amber-500 text-slate-950 size-10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border-t border-amber-500/30 p-6 space-y-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-amber-400">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  ${(totalPrice).toLocaleString('es-CL')}
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
