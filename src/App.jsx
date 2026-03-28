import { useState, useMemo } from 'react';
import { MenuHeader } from './components/MenuHeader';
import { ProductCard } from './components/ProductCard';
import { CartButton } from './components/CartButton';
import { CartModal } from './components/CartModal';
import { CategoryFilter } from './components/CategoryFilter';
import MenuFooter from './components/MenuFooter';
import { toast, Toaster } from 'sonner';
import SerranoRucula from './assets/Jamón-Serrano-Rúcula.jpg';
import Marina from './assets/Marina.jpg';
import Mechada from './assets/pizza-mechada.jpg';
import PolloBBQ from './assets/pollo-bbq.jpg';
import Peperoni from './assets/peperoni.jpg';
import Napolitana from './assets/napolitana.jpg';
import JamonQueso from './assets/jamon-queso.jpg';
import SalameQueso from './assets/sanwich-salame-queso.jpg';
import Huevo from './assets/sandwich-huevo.jpg';
import HuevoSalame from './assets/huevo-salame.png';
import HuevoQueso from './assets/sandwich-huevo-queso.png';
import HuevoJamon from './assets/Pan-Huevo-Jamon.jpg';
import JamonPalta from './assets/sandwich-palta-jamon.png';
import QuesoPalta from './assets/sandwich-queso-palta.png';
import PalitosAjo from './assets/Pan-al-ajo.jpg';
import PromoPizza from './assets/pizza-bebida-promo.jpg';
import BebidaLata from './assets/Bebida-lata-350cc.jpg';
import Bebida586 from './assets/bebida-586.jpg';
import ScoreLata from './assets/score-lata.jpg';
import AguaMineral from './assets/agua-mineral.jpg';
import Bebida125 from './assets/bebida-125l.jpg';
import Bebida150 from './assets/bebida-125l.jpg';
import te from './assets/te-vaso.jpg';
import cafe from './assets/cafe-vaso.jpg';
//Modificaciones asociadas a Vercel para publicar el proyecto sin problemas.
const products = [
  // Pizzas
  {
    id: '1',
    name: 'Jamón Serrano Rúcula',
    description: 'Exquisita combinación de jamón serrano con rúcula fresca',
    price: 9000,
    image: SerranoRucula,
    category: 'Pizzas'
  },
  {
    id: '2',
    name: 'Marina',
    description: 'Deliciosos frutos del mar sobre salsa de tomate',
    price: 10000,
    image: Marina,
    category: 'Pizzas'
  },
  {
    id: '3',
    name: 'Mechada',
    description: 'Sabrosa carne mechada con queso y cebolla',
    price: 10000,
    image: Mechada,
    category: 'Pizzas'
  },
  {
    id: '4',
    name: 'Pollo BBQ',
    description: 'Jugoso pollo con salsa BBQ y cebolla caramelizada',
    price: 10000,
    image: PolloBBQ,
    category: 'Pizzas'
  },
  {
    id: '5',
    name: 'Pepperoni',
    description: 'Clásica pizza con pepperoni y queso mozzarella',
    price: 8000,
    image: Peperoni,
    category: 'Pizzas'
  },
  {
    id: '6',
    name: 'Napolitana',
    description: 'Salsa de tomate, mozzarella, tomate fresco y albahaca',
    price: 8000,
    image: Napolitana,
    category: 'Pizzas'
  },
  {
    id: '7',
    name: 'Vegetariana',
    description: 'Variedad de vegetales frescos con queso',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1611007304706-279fe3d29bda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGl6emElMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3NDI2MDA0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizzas'
  },
  {
    id: '8',
    name: 'Hawaiana',
    description: 'Jamón, piña y mozzarella',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1671572579989-fa11cbd86eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXdhaWlhbiUyMHBpenphJTIwcGluZWFwcGxlJTIwaGFtfGVufDF8fHx8MTc3NDMyODQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pizzas'
  },
  
  // Sandwiches - Todos a $1.500
  {
    id: '9',
    name: 'Sandwich Jamón-Queso',
    description: 'Jamón y queso en pan fresco',
    price: 1500,
    image: JamonQueso,
    category: 'Sandwiches'
  },
  {
    id: '10',
    name: 'Sandwich Salame-Queso',
    description: 'Salame italiano con queso',
    price: 1500,
    image: SalameQueso,
    category: 'Sandwiches'
  },
  {
    id: '11',
    name: 'Sandwich Huevo',
    description: 'Huevo revuelto en pan casero',
    price: 1500,
    image: Huevo,
    category: 'Sandwiches'
  },
  {
    id: '12',
    name: 'Sandwich Huevo-Salame',
    description: 'Huevo con salame',
    price: 1500,
    image: HuevoSalame,
    category: 'Sandwiches'
  },
  {
    id: '13',
    name: 'Sandwich Huevo-Queso',
    description: 'Huevo con queso derretido',
    price: 1500,
    image: HuevoQueso,
    category: 'Sandwiches'
  },
  {
    id: '14',
    name: 'Sandwich Huevo-Jamón',
    description: 'Huevo con jamón',
    price: 1500,
    image: HuevoJamon,
    category: 'Sandwiches'
  },
  {
    id: '15',
    name: 'Sandwich Jamón-Palta',
    description: 'Jamón con palta fresca',
    price: 1500,
    image: JamonPalta,
    category: 'Sandwiches'
  },
  {
    id: '16',
    name: 'Sandwich Queso-Palta',
    description: 'Queso con palta cremosa',
    price: 1500,
    image: QuesoPalta,
    category: 'Sandwiches'
  },
  // Pastelitos (sin imagen por ahora, a futuro se importan y asignan en image)
  {
    id: '27',
    name: 'Muffin Arándano',
    description: 'Muffin casero de arándano',
    price: 1000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '28',
    name: 'Muffin trozo chocolate',
    description: 'Muffin con trozos de chocolate',
    price: 1000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '29',
    name: 'Alfajor maicena',
    description: 'Alfajor tradicional de maicena',
    price: 1000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '30',
    name: 'Alfajor chocolate',
    description: 'Alfajor de chocolate',
    price: 1000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '31',
    name: 'Delicia',
    description: 'Delicia casera',
    price: 1000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '32',
    name: 'Alfajor art. chico',
    description: 'Alfajor artesanal pequeño',
    price: 500,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '33',
    name: 'Alfajor art. grande',
    description: 'Alfajor artesanal grande',
    price: 1000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '34',
    name: 'Pie de Limón',
    description: 'Pie de limón casero',
    price: 2000,
    image: '',
    category: 'Pastelitos'
  },
  {
    id: '35',
    name: 'Cheesecake Oreo',
    description: 'Cheesecake de Oreo',
    price: 2000,
    image: '',
    category: 'Pastelitos'
  },

  // Otros
  {
    id: '17',
    name: 'Palitos de Ajo',
    description: '6 unidades de deliciosos palitos de ajo',
    price: 5000,
    image: PalitosAjo,
    category: 'Otros'
  },
  {
    id: '18',
    name: 'Promo Pizza + Bebida',
    description: 'Pizza a elección + bebida',
    price: 5000,
    image: PromoPizza,
    category: 'Promociones'
  },
  
  // Bebidas
  {
    id: '19',
    name: 'Bebida Lata 350cc',
    description: 'Lata de bebida 350cc',
    price: 1000,
    image: BebidaLata,
    category: 'Bebidas'
  },
  {
    id: '20',
    name: 'Bebida 586ml',
    description: 'Botella de bebida 586ml',
    price: 1300,
    image: Bebida586,
    category: 'Bebidas'
  },
  {
    id: '21',
    name: 'Score Lata',
    description: 'Energética Score en lata',
    price: 1500,
    image: ScoreLata,
    category: 'Bebidas'
  },
  {
    id: '22',
    name: 'Agua 500cc',
    description: 'Agua mineral 500cc',
    price: 1000,
    image: AguaMineral,
    category: 'Bebidas'
  },
  {
    id: '23',
    name: 'Bebida 1.25L',
    description: 'Botella grande de bebida 1.25L',
    price: 1500,
    image: Bebida125,
    category: 'Bebidas'
  },
  {
    id: '24',
    name: 'Bebida 1.5L',
    description: 'Botella familiar de bebida 1.5L',
    price: 2000,
    image: Bebida150,
    category: 'Bebidas'
  },
  {
    id: '25',
    name: 'Té',
    description: 'Té caliente',
    price: 800,
    image: te,
    category: 'Bebidas'
  },
  {
    id: '26',
    name: 'Café',
    description: 'Café caliente recién preparado',
    price: 800,
    image: cafe,
    category: 'Bebidas'
  }
];
export default function App() {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("+56987308245");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['Todos', ...cats.sort()];
  }, []);

    const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

    const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        product: products.find(p => p.id === productId),
        quantity
      }))
      .filter(item => item.product); 
  }, [cart]);

    const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

    const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    const product = products.find(p => p.id === productId);
    toast.success(`${product?.name} agregado al carrito`, {
      duration: 2000,
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 0) {
        newCart[productId]--;
      }
      return newCart;
    });
  };

  const removeItemCompletely = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
    toast.success('Producto eliminado del carrito');
  };

    const sendToWhatsApp = (formData) => {
    let message = '¡Hola! 🍕 Me gustaría hacer el siguiente pedido:\n\n';
    
    message += `*DATOS DEL CLIENTE:*\n`;
    message += `• Nombre: ${formData.name}\n`;
    message += `• Método de Pago: ${formData.paymentMethod}\n\n`;
    
    message += `*PRODUCTOS:*\n`;
    cartItems.forEach(({ product, quantity }) => {
      message += `• ${product.name} x${quantity} - $${(product.price * quantity).toLocaleString('es-CL')}\n`;
    });

    message += `\n*Total: $${totalPrice.toLocaleString('es-CL')}*\n\n¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${selectedPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('Redirigiendo a WhatsApp...');
  }; 

    return (
<div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #2d2922 0%, #1e1a16 100%)' }}>
      <Toaster position="top-center" richColors />
      
      <MenuHeader 
        selectedPhone={selectedPhone}
        onPhoneChange={setSelectedPhone}
      />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onAdd={() => addToCart(product.id)}
              onRemove={() => removeFromCart(product.id)}
            />
          ))}
        </div>
      </div>

      <CartButton
        itemCount={totalItems}
        total={totalPrice}
        onClick={() => setIsCartOpen(true)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeItemCompletely}
        onSendWhatsApp={sendToWhatsApp}
        total={totalPrice}
      />
      <MenuFooter />
    </div>
  );
}
