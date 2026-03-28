import data from "../data/businessInfo.json";
import { Pizza, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export function MenuHeader({ selectedPhone, onPhoneChange }) {
  const phones = data.phones.map((phone) => ({
    label: `+56 9 ${phone.slice(-8)}`,
    number: `+56${phone}`
  }));
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 shadow-2xl border-b border-amber-500/30"
      style={{
        background: 'linear-gradient(135deg, #352e26 0%, #241f18 50%, #1b1814 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-3 shadow-lg">
              <Pizza className="size-8 text-slate-950" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                {data.name}
              </h1>
              <p className="text-amber-200/70 text-sm">Comida casera auténtica</p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-amber-400 text-sm font-medium flex items-center gap-2">
              <Phone className="size-4" />
              Llama ya:
            </span>

            <div className="flex gap-2">
              {phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:${phone.number}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all block ${
                    selectedPhone === phone.number
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'bg-slate-800/50 text-amber-400 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-500/60'
                  }`}
                >
                  {phone.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.header>
  );
}