# 🏗️ GUÍA DE ARQUITECTURA - CÓMO EXTENDER EL PROYECTO

## 📦 Estructura del Proyecto

```
src/
├── App.jsx                 (Punto de entrada - Estado global del carrito)
├── App.css                 (Estilos globales)
├── index.css               (Reset CSS)
├── main.jsx                (Inicio de React)
├── tailwind.css            (Configuración Tailwind)
│
├── components/
│   ├── Header.jsx          (Encabezado principal)
│   ├── CartButton.jsx      (Botón flotante del carrito)
│   ├── ProductCard.jsx     (Tarjeta de producto normal)
│   ├── PotatoCard.jsx      (Tarjeta de papas fritas)
│   ├── CategoryFilter.jsx  (Filtro de categorías)
│   ├── CartModal.jsx       (Modal del carrito + checkout)
│   ├── PotatoModal.jsx     (Modal de personalización de papas)
│   ├── CustomToast.jsx     (Sistema de notificaciones)
│   ├── MenuHeader.jsx      (Header del menú)
│   ├── MenuFooter.jsx      (Footer del menú)
│   └── data/
│       └── businessInfo.json (Info del restaurante)
│
└── assets/
    └── [40+ imágenes de productos]
```

---

## 🔄 FLUJO DE DATOS

### Carrito de Productos Normales (ProductCard)
```
ProductCard
  ↓ click en +
  ↓
App.jsx (setState cart)
  ↓
CartButton (muestra contador)
  ↓
CartModal (muestra lista + totales)
```

### Carrito de Papas Fritas (PotatoCard)
```
PotatoCard
  ↓ click en "Personalizar"
  ↓
PotatoModal (abre)
  ↓ Usuario selecciona toppings
  ↓ Usuario selecciona cantidad
  ↓ click "Agregar al Carrito"
  ↓
App.jsx (setState potatoCart con ID único)
  ↓
CartModal (muestra papas con toppings)
```

### Sistema de Toasts
```
Cualquier componente
  ↓ import useCustomToast
  ↓ const toast = useCustomToast()
  ↓ toast.success("Mensaje")
  ↓
CustomToast (maneja estado global)
  ↓
ToastContainer (renderiza visualmente)
```

---

##  CÓMO AGREGAR NUEVAS FUNCIONALIDADES

### 1️⃣ AGREGAR UNA NUEVA CATEGORÍA DE PRODUCTOS

**Paso 1**: En `App.jsx`, agregar en el array `products`:

```javascript
const products = [
  // ...productos existentes...
  {
    id: 'empanada-pollo',
    name: 'Empanada de Pollo',
    category: 'Empanadas', // Nueva categoría
    price: 1200,
    image: 'https://via.placeholder.com/.../Empanada',
    description: 'Empanada casera de pollo con papas'
  }
];
```

**Paso 2**: Las categorías se generan automáticamente del array (no hay lista hardcodeada)

**Resultado**: CategoryFilter mostrará automáticamente "Empanadas"

---

### 2️⃣ AGREGAR UN NUEVO TOPPING A PAPAS

**En `App.jsx`**, busca `const potatoToppings`:

```javascript
const potatoToppings = [
  // ...toppings existentes...
  {
    id: 'queso-cheddar',
    name: 'Queso Cheddar',
    price: 1200
  }
];
```

**Automáticamente**:
- Aparece en el modal de papas
- Se calcula en el precio total
- Se muestra en el carrito

---

### 3️⃣ CREAR UN NUEVO COMPONENTE DE PRODUCTO ESPECIAL

**Ejemplo**: "Combo de Sandwich + Bebida"

**Archivo**: `src/components/ComboCard.jsx`

```javascript
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComboCard({ product, quantity, onCartClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div className="bg-slate-800 rounded-lg overflow-hidden">
      <img src={product.image} />
      <div className="p-4">
        <h3>{product.name}</h3>
        <p className="text-lg font-bold">${product.price}</p>
        <button onClick={() => onCartClick(product)}>
          <ShoppingCart size={20} /> Personalizar Combo
        </button>
      </div>
    </motion.div>
  );
}
```

**En `App.jsx`**:

```javascript
import ComboCard from './components/ComboCard';

// En el map de renderizado:
{product.category === 'Combos' ? (
  <ComboCard 
    key={product.id}
    product={product}
    onCartClick={() => openComboModal(product)}
  />
) : ...}
```

---

### 4️⃣ CAMBIAR COLORES Y ESTILOS

**Opción A** (Rápido): Editar `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    colors: {
      primary: '#FF6B6B',    // Cambiar color principal
      secondary: '#4ECDC4',
      // ...
    }
  }
}
```

**Opción B** (Flexible): Usar CSS variables en `index.css`

```css
:root {
  --color-primary: #f59e0b;
  --color-secondary: #1e293b;
}
```

---

### 5️⃣ AGREGAR UN NUEVO TIPO DE TOAST

**En `CustomToast.jsx`**, agregar tipo a la config:

```javascript
const typeConfig = {
  // ...tipos existentes...
  success: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
  promo: 'bg-gradient-to-r from-purple-500 to-pink-500' // NUEVO
};
```

**Uso**:
```javascript
const toast = useCustomToast();
toast.promo('¡Tienes una promoción especial!');
```

---

### 6️⃣ AGREGAR VALIDACIÓN PERSONALIZADA

**Ejemplo**: Validar emails

```javascript
// En CartModal.jsx o donde sea necesario
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// En handleSendWhatsApp:
if (!validateEmail(formData.email)) {
  toast.warning('Por favor, ingresa un email válido');
  return;
}
```

---

### 7️⃣ AGREGAR PERSISTENCIA (localStorage)

**En `App.jsx`**, usar `useEffect`:

```javascript
// Guardar carrito
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('potatoCart', JSON.stringify(potatoCart));
}, [cart, potatoCart]);

// Recuperar al iniciar
useEffect(() => {
  const savedCart = localStorage.getItem('cart');
  const savedPotatoCart = localStorage.getItem('potatoCart');
  
  if (savedCart) setCart(JSON.parse(savedCart));
  if (savedPotatoCart) setPotatoCart(JSON.parse(savedPotatoCart));
}, []);
```

---

### 8️⃣ AGREGAR UN NUEVO CAMPO AL FORMULARIO

**En `CartModal.jsx`**, agregar field:

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',           // NUEVO
  paymentMethod: 'efectivo'
});

// En handleInputChange:
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// En JSX:
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleInputChange}
  placeholder="tu@email.com"
/>
```

---

### 9️⃣ AGREGAR FILTRO ADICIONAL

**Ejemplo**: Filtrar por rango de precio

```javascript
const [priceFilter, setPriceFilter] = useState(null);

const filteredByPrice = products.filter(p => {
  if (priceFilter === 'cheap') return p.price < 2000;
  if (priceFilter === 'expensive') return p.price >= 5000;
  return true;
});
```

---

### 🔟 CONECTAR CON UN BACKEND

**Ejemplo**: Obtener productos desde API

```javascript
useEffect(() => {
  fetch('https://api.ejemplo.com/products')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => {
      toast.error('Error al cargar productos');
      console.error(err);
    });
}, []);
```

---

## ⚡ PATRONES COMUNES

### Hook para peticiones HTTP
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Uso:
const { data: products, loading } = useFetch('/api/products');
```

### Usar useMemo para optimizar
```javascript
// Evita cálculos innecesarios
const totalPrice = useMemo(() => {
  return cartItems.reduce((total, item) => total + item.price, 0);
}, [cartItems]); // Solo recalcula si cartItems cambia
```

### Manejo de errores seguro
```javascript
const handleAction = async () => {
  try {
    const result = await doSomething();
    toast.success('¡Éxito!');
  } catch (error) {
    console.error('Error:', error);
    toast.error('Algo salió mal');
  }
};
```

---

## 📱 MOBILE-FIRST TIPS

1. **Usar Tailwind responsive**:
   ```jsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     {/* Automático en mobile/tablet/desktop */}
   </div>
   ```

2. **Testear en diferentes tamaños**:
   - Abre DevTools (F12)
   - Click en icono de responsive
   - Prueba con iPhone/Tablet

3. **Evitar overflow**:
   ```jsx
   <div className="overflow-x-auto">
     {/* Content que puede ser muy ancho */}
   </div>
   ```

---

## 🎨 CUSTOMIZACIÓN DE COLORES

Los colores principales están en el CSS:

**Ambar/Gold** (Actual):
- `#f59e0b` - Hover buttons
- `#d97706` - Active buttons
- `#7c2d12` - Backgrounds

Para cambiar a otro esquema (ej. verde):
1. Reemplazar en los componentes
2. Actualizar gradientes
3. Testear constraste (accesibilidad)

---

---

## 📚 REQUISITOS PARA MANTENER EL CÓDIGO

✅ Nombres descriptivos
✅ Componentes pequeños y enfocados
✅ Props validadas
✅ Comentarios en lógica compleja
✅ Sin console.logs en producción
✅ Hacer commit frecuente
✅ Escribir mensajes de commit claros

---

## 🎯 PRÓXIMOS PASOS SUGERIDOS

1. **Inmediato**:
   - Conseguir imágenes diferentes para papas (chicas, medianas, grandes)
   - Agregar localStorage para persistencia

2. **Corto plazo**:
   - Agregar más categorías si es necesario
   - Implementar búsqueda de productos
   - Mejorar accesibilidad

3. **Mediano plazo**:
   - Conectar con backend real
   - Sistema de autenticación
   - Historial de órdenes

4. **Largo plazo**:
   - App móvil (React Native)
   - Sistema de promociones dinámicas
   - Dashboard de administración


