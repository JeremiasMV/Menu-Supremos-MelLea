import { useState, useEffect } from 'react';
import { Check, AlertCircle, X as XIcon, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sistema global de toasts
const toastState = {
  toasts: [],
  listeners: [],
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  notify(toast) {
    const id = Math.random().toString(36).substr(2, 9);
    const toastWithId = { ...toast, id };
    this.toasts.push(toastWithId);
    this.listeners.forEach(listener => listener([...this.toasts]));
    
    if (toast.duration !== false) {
      setTimeout(() => {
        this.remove(id);
      }, toast.duration || 3000);
    }
    return id;
  },
  remove(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.listeners.forEach(listener => listener([...this.toasts]));
  }
};

// Hook para usar toasts
export const useCustomToast = () => {
  const show = (message, options = {}) => {
    return toastState.notify({
      message,
      type: options.type || 'message',
      duration: options.duration || 3000
    });
  };

  return {
    success: (message, options = {}) => show(message, { ...options, type: 'success' }),
    error: (message, options = {}) => show(message, { ...options, type: 'error' }),
    warning: (message, options = {}) => show(message, { ...options, type: 'warning' }),
    info: (message, options = {}) => show(message, { ...options, type: 'info' }),
    message: (message, options = {}) => show(message, { ...options, type: 'message' })
  };
};

// Componente Toast individual
function Toast({ toast, onRemove }) {
  useEffect(() => {
    if (toast.duration === false) return;
    
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const typeConfig = {
    success: {
      bg: 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20',
      border: 'border-emerald-500/50',
      icon: Check,
      iconColor: 'text-emerald-400',
      title: 'Éxito'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500/20 to-red-600/20',
      border: 'border-red-500/50',
      icon: AlertCircle,
      iconColor: 'text-red-400',
      title: 'Error'
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20',
      border: 'border-yellow-500/50',
      icon: AlertCircle,
      iconColor: 'text-yellow-400',
      title: 'Advertencia'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/50',
      icon: Info,
      iconColor: 'text-blue-400',
      title: 'Información'
    },
    message: {
      bg: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20',
      border: 'border-amber-500/50',
      icon: Check,
      iconColor: 'text-amber-400',
      title: 'Notificación'
    }
  };

  const config = typeConfig[toast.type] || typeConfig.message;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      className={`
        ${config.bg} ${config.border}
        border rounded-xl p-4 shadow-2xl backdrop-blur-md
        flex items-start gap-3 min-w-[300px] max-w-[500px]
        backdrop-saturate-150
      `}
    >
      <IconComponent className={`size-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
      
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm line-clamp-3">
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
      >
        <XIcon className="size-4" />
      </button>
    </motion.div>
  );
}

// Contenedor de toasts
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return toastState.subscribe(setToasts);
  }, []);

  const removeToast = (id) => {
    toastState.remove(id);
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              toast={toast}
              onRemove={removeToast}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
