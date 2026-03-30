# ✅ CHECKLIST PRE-COMMIT Y DEPLOYMENT

## 🔍 VERIFICACIÓN FINAL DEL CÓDIGO

### Antes de hacer commit
- [x] No hay `console.log()` en código de producción
- [x] No hay `alert()` reemplazados por `toast`
- [x] No hay imports de módulos no usados
- [x] No hay archivos temporales o .tmp
- [x] Archivos .gitignore configurado correctamente
- [x] No hay contraseñas o keys en el código

### Compilación
- [x] `npm run build` ejecuta sin errores
- [x] No hay warnings de compilación
- [x] `npm run dev` funciona correctamente
- [x] Carpeta `dist` generada correctamente

### Git
- [x] Ningún archivo sin rastrear importante
- [x] Cambios staged para commit
- [x] Mensaje de commit descriptivo

---

## 📋 CHECKLIST FUNCIONAL

### Producto & Carrito
- [x] Mostrar 41 productos en grid
- [x] Filtros de categoría funcionan
- [x] Botón +/- agrega/quita del carrito
- [x] "Ver más/Ver menos" en descripciones largas
- [x] Contador en CartButton es correcto
- [x] Precio total se calcula bien

### Papas Fritas
- [x] PotatoCard muestra 4 productos de papas
- [x] Modal abre al hacer click en "Personalizar"
- [x] Modal NO se cierra al tocar afuera
- [x] Checkboxes de toppings funciona
- [x] Botones +/- cantidad funcionan (min 1)
- [x] Precio total se calcula bien (base + toppings × qty)
- [x] Botón "Agregar al Carrito" siempre visible
- [x] Papas aparecen en carrito con toppings

### Carrito Modal
- [x] Muestra todos los items (normales + papas)
- [x] Botón eliminar funciona por producto
- [x] Papas muestran sus toppings
- [x] Formulario de nombre es obligatorio
- [x] Toast de validación aparece si falta nombre
- [x] Form se resetea al cerrar
- [x] Form se resetea después de enviar
- [x] Botón WhatsApp funciona
- [x] Mensaje tiene todos los detalles

### Notificaciones
- [x] Toast de éxito muestra al agregar al carrito
- [x] Toast de validación muestra cuando falta nombre
- [x] Toast de error muestra si hay problema WhatsApp
- [x] Toast se cierra automáticamente
- [x] Toast aparece en ubicación correcta (top-right)

### Experiencia del Usuario
- [x] Animaciones son suaves (no abruptas)
- [x] No hay flickering o parpadeos
- [x] Hover effects funcionan en todos los botones
- [x] El carrito persiste al cambiar filtro
- [x] Las imágenes cargan correctamente
- [x] Fallback de imágenes funciona si hay error

### Mobile (en teléfono)
- [x] Grid se adapta a pantalla pequeña
- [x] Botones son clickeables (no muy pequeños)
- [x] Modal modal es usable en móvil
- [x] Scroll horizontal no aparece innecesariamente
- [x] Touch events funcionan correctamente

---

## 🗑️ LIMPIEZA PRE-COMMIT

### Archivos que permanecerán
```
✅ src/           (código fuente)
✅ public/        (assets estáticos)
✅ package.json   (dependencias)
✅ vite.config.js
✅ tailwind.config.js
✅ postcss.config.js
✅ eslint.config.js
✅ README.md
✅ BUGS_REPORT.md     (registro de issues)
✅ ANALISIS_PROYECTO.md (análisis completo)
✅ ARQUITECTURA_GUIA.md (guía para expandir)
```

### Archivos/carpetas que NO irrán en git
```
❌ node_modules/  (en .gitignore)
❌ dist/          (construido desde build)
❌ .env.local     (si tienes variables privadas)
❌ .DS_Store      (Mac)
❌ Thumbs.db      (Windows)
```

