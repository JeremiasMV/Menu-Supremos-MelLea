import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



export function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all border border-amber-500/20"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">
        <img
  src={product.image || 'https://via.placeholder.com/640x480/2e2a24/ffffff?text=Imagen+pr%C3%B3xima'}
  alt={product.name}
  className="w-full h-full object-cover pointer-events-none"
  draggable="false"
  onContextMenu={(e) => e.preventDefault()}
/>

        {quantity > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 size-10 rounded-full flex items-center justify-center font-bold shadow-lg"
          >
            {quantity}
          </motion.div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full mb-2 border border-amber-500/30">
            {product.category}
          </span>

          <h3 className="font-bold text-xl text-amber-400 mb-2">{product.name}</h3>

          <p className="text-slate-300 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
            ${product.price.toLocaleString('es-CL')}
          </span>

          {quantity === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdd}
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center gap-2"
            >
              <Plus className="size-5" />
              Agregar
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRemove}
                className="bg-red-500 text-white size-9 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
              >
                <Minus className="size-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onAdd}
                className="bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 size-9 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="size-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}