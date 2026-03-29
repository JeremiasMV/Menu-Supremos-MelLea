import { useState, useMemo } from 'react';
import { MenuHeader } from './components/MenuHeader';
import { ProductCard } from './components/ProductCard';
import { CartButton } from './components/CartButton';
import { CartModal } from './components/CartModal';
import { CategoryFilter } from './components/CategoryFilter';
import MenuFooter from './components/MenuFooter';
import { toast, Toaster } from 'sonner';
import SerranoRucula from './assets/PizzaSerranoRucula.jpeg';
import Hawaiana from './assets/PizzaHawaiana.jpeg';
import Vegetariana from './assets/PizzaVegetariana.jpeg';
import Marina from './assets/Marina.jpg';
import Mechada from './assets/PizzaMechada.jpeg';
import PolloBBQ from './assets/PizzaPolloBBQ.jpeg';
import Peperoni from './assets/PizzaPeperoni.jpeg';
import Napolitana from './assets/PizzaNapolitana.jpeg';
import JamonQueso from './assets/jamon-queso.jpg';
import SalameQueso from './assets/sanwich-salame-queso.jpg';
import Huevo from './assets/sandwich-huevo.jpg';
import HuevoSalame from './assets/huevo-salame.png';
import HuevoQueso from './assets/sandwich-huevo-queso.png';
import HuevoJamon from './assets/Pan-Huevo-Jamon.jpg';
import JamonPalta from './assets/sandwich-palta-jamon.png';
import QuesoPalta from './assets/sandwich-queso-palta.png';
import PalitosAjo from './assets/PalitosAjo.jpeg';
import PromoPizza from './assets/pizza-bebida-promo.jpg';
import BebidaLata from './assets/Bebida-lata-350cc.jpg';
import Bebida586 from './assets/bebida-586.jpg';
import ScoreLata from './assets/score-lata.jpg';
import AguaMineral from './assets/agua-mineral.jpg';
import Bebida125 from './assets/bebida-125l.jpg';
import Bebida150 from './assets/bebida-125l.jpg';
import te from './assets/te-vaso.jpg';
import cafe from './assets/cafe-vaso.jpg';
import MuffinArandano from './assets/MuffinArandano.png';
import MuffinTrozoChocolate from './assets/MufinTrozoChocolate.jpeg';
import AlfajorMaicena from './assets/AlfajorMaicena.jpeg';
import AlfajorChocolate from './assets/AlfajorChocolate.jpeg';
import Delicia from './assets/Delicia.jpeg';
import AlfajorChico from './assets/AlfajorArtesanalChico.jpeg';
import AlfajorGrande from './assets/AlfajorArtesanalGrande.jpeg';
import PieLimon from './assets/PieLimon.jpeg';
import CheesecakeOreo from './assets/CheesecakeOreo.jpeg';
//Modificaciones asociadas a Vercel para publicar el proyecto sin problemas.
const products = [
  // Pizzas
  {
    id: '1',
    name: 'Jamón Serrano Rúcula',
    description: 'Masa fina tipo romana 30 cm, salsa tomate casera, queso mozzarella, tomate serrano y rúcula',
    price: 9000,
    image: SerranoRucula,
    category: 'Pizzas'
  },
  {
    id: '2',
    name: 'Marina',
    description: 'Masa fina tipo romana 30 cm, salsa pomodoro casera, queso mozzarella, tomates asados, camarones, aros de calamar, choritos y albahaca',
    price: 10000,
    image: Marina,
    category: 'Pizzas'
  },
  {
    id: '3',
    name: 'Mechada',
    description: 'Masa fina tipo romana 30 cm, salsa tomate casera, mechada, tomates asados, queso mozzarella, cebolla caramelizada y albahaca',
    price: 10000,
    image: Mechada,
    category: 'Pizzas'
  },
  {
    id: '4',
    name: 'Pollo BBQ',
    description: 'Masa fina tipo romana 30 cm, salsa Pomodoro casera, queso mozzarella, pollo barbecue, pimientos, cebolla acarameladas, hojas de albahaca',
    price: 10000,
    image: PolloBBQ,
    category: 'Pizzas'
  },
  {
    id: '5',
    name: 'Pepperoni',
    description: 'Masa fina tipo romana 30 cm, salsa tomate casera, queso mozzarella, peperoni y orégano',
    price: 8000,
    image: Peperoni,
    category: 'Pizzas'
  },
  {
    id: '6',
    name: 'Napolitana',
    description: 'Masa fina tipo romana 30 cm, salsa de tomate casera, queso mozzarella, tomate, jamón pierna, queso, aceituna y orégano',
    price: 8000,
    image: Napolitana,
    category: 'Pizzas'
  },
  {
    id: '7',
    name: 'Vegetariana',
    description: 'Masa fina tipo romana 30 cm, salsa tomate casera, queso mozzarella, champiñones, pimiento, palmito, tomate, rúcula y orégano',
    price: 8000,
    image: Vegetariana,
    category: 'Pizzas'
  },
  {
    id: '8',
    name: 'Hawaiana',
    description: 'Masa fina tipo romana 30 cm, salsa tomate casera, queso mozzarella, jamón, tomate y piña',
    price: 8000,
    image: Hawaiana,
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
    description: 'Huevo revuelto en pan fresco',
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
    description: 'Huevo con queso',
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
    description: 'Queso con palta fresca',
    price: 1500,
    image: QuesoPalta,
    category: 'Sandwiches'
  },
  
  {
    id: '27',
    name: 'Muffin Arándano',
    description: 'Muffin casero de arándano',
    price: 1000,
    image: MuffinArandano,
    category: 'Pastelitos'
  },
  {
    id: '28',
    name: 'Muffin trozo chocolate',
    description: 'Muffin con trozos de chocolate',
    price: 1000,
    image: MuffinTrozoChocolate,
    category: 'Pastelitos'
  },
  {
    id: '29',
    name: 'Alfajor maicena',
    description: 'Alfajor tradicional de maicena',
    price: 1000,
    image: AlfajorMaicena,
    category: 'Pastelitos'
  },
  {
    id: '30',
    name: 'Alfajor chocolate',
    description: 'Alfajor de chocolate',
    price: 1000,
    image: AlfajorChocolate,
    category: 'Pastelitos'
  },
  {
    id: '31',
    name: 'Delicia',
    description: 'Delicia casera',
    price: 1000,
    image: Delicia,
    category: 'Pastelitos'
  },
  {
    id: '32',
    name: 'Alfajor art. chico',
    description: 'Alfajor artesanal pequeño',
    price: 500,
    image: AlfajorChico,
    category: 'Pastelitos'
  },
  {
    id: '33',
    name: 'Alfajor art. grande',
    description: 'Alfajor artesanal grande',
    price: 1000,
    image: AlfajorGrande,
    category: 'Pastelitos'
  },
  {
    id: '34',
    name: 'Pie de Limón',
    description: 'Pie de limón casero',
    price: 2000,
    image: PieLimon,
    category: 'Pastelitos'
  },
  {
    id: '35',
    name: 'Cheesecake Oreo',
    description: 'Cheesecake de Oreo',
    price: 2000,
    image: CheesecakeOreo,
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
