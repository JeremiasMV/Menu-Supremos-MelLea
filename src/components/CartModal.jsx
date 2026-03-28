import { X, Trash2, Send } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';

export function CartModal({ isOpen, onClose, items, onRemoveItem, onSendWhatsApp, total }) {
  const [formData, setFormData] = useState({
    name: '',
    paymentMethod: 'No especificado'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendWhatsApp = () => {
    if (!formData.name.trim()) {
      alert('Por favor, ingresa tu nombre');
      return;
    }
    onSendWhatsApp(formData);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden border-2 border-amber-500/30"
          >
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-slate-950 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Tu Pedido</h2>
                <p className="text-slate-800 text-sm">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>

              <button
                onClick={onClose}
                className="bg-slate-950/20 hover:bg-slate-950/30 rounded-full p-2 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-300 text-lg">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 bg-slate-950/50 rounded-xl p-4 hover:bg-slate-950/70 transition-colors border border-amber-500/20"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="size-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-amber-400">{product.name}</h3>
                        <p className="text-sm text-slate-300">
                          ${product.price.toLocaleString('es-CL')} × {quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg text-amber-400">
                          ${(product.price * quantity).toLocaleString('es-CL')}
                        </p>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 mt-1"
                        >
                          <Trash2 className="size-4" />
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-amber-500/30 p-6 bg-slate-950/50 space-y-4 max-h-[30vh] overflow-y-auto">
                <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="text-amber-400 text-sm font-semibold block mb-2">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-amber-500/30 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-amber-400 text-sm font-semibold block mb-2">Método de Pago (opcional)</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-amber-500/30 focus:border-amber-500 focus:outline-none"
                    >
                      <option>No especificado</option>
                      <option>Efectivo</option>
                      <option>Transferencia</option>
                      <option>Tarjeta</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-amber-400">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                    ${total.toLocaleString('es-CL')}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendWhatsApp}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="size-6" />
                  Enviar pedido por WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}