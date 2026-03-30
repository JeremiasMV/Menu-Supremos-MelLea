import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export function PotatoCard({ product, onCartClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all border border-amber-500/20"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">
        <img
          src={product.image || 'https://via.placeholder.com/640x480/2e2a24/ffffff?text=Papas+Fritas'}
          alt={product.name}
          className="w-full h-full object-cover pointer-events-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCartClick(product)}
            className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center gap-2"
          >
            <ShoppingCart className="size-5" />
            Agregar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
