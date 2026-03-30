# 🐛 REPORTE DE BUGS Y PROBLEMAS ENCONTRADOS

## ✅ BUGS CORREGIDOS

### 1. **Imports de imágenes inexistentes** [CRÍTICO] ✓ CORREGIDO
- **Problema**: Se intentaban importar 3 imágenes que no existen:
  - `PapasFritas.webp`
  - `PapasFritasChicas.jpg`
  - `PapasFritasGrandes.webp`
- **Impacto**: Error de compilación, breaking change en la app
- **Solución**: Se reemplazaron con `PapasSupremas` que sí existe en assets

### 2. **Modal Overflow - Botón oculto** [CRÍTICO] ✓ CORREGIDO
- **Problema**: El botón "Agregar al Carrito" podría estar oculto en PotatoModal
- **Causa**: Layout con `max-h-[90vh]` y scroll interno no garantizaba footer visible
- **Solución**: Cambiar a `flex flex-col` con `flex-1` para contenido y `flex-shrink-0` para footer
  ```jsx
  // ANTES - Problematico
  <motion.div className="... max-h-[90vh]">
    <div>Header</div>
    <div className="max-h-[calc(90vh-6rem)]">Content</div>
    <div>Footer (podría estar oculto)</div>
  </motion.div>
  
  // DESPUÉS - Correcto
  <motion.div className="... max-h-[90vh] flex flex-col">
    <div className="flex-shrink-0">Header</div>
    <div className="flex-1 overflow-y-auto">Content</div>
    <div className="flex-shrink-0">Footer (siempre visible)</div>
  </motion.div>
  ```

### 3. **Fallback imagen incorrecto en PotatoCard** [MENOR] ✓ CORREGIDO
- **Problema**: Fallback usaba `'./assets/PapasFritas.webp'` que no existe
- **Solución**: Cambiar a placeholder URL válido: `https://via.placeholder.com/...`

---

## ⚠️ PROBLEMAS POTENCIALES DETECTADOS

### **4. Validación de NULL en CartModal**
- **Archivo**: `src/components/CartModal.jsx` línea 80+
- **Problema**: No hay validación si `product.image` es undefined
- **Riesgo**: Si una imagen falla, se muestra imagen rota
- **Recomendación**: Agregar fallback
  ```jsx
  <img src={product.image || 'https://via.placeholder.com/...'} />
  ```

### **5. Descripción de productos puede contener HTML**
- **Archivo**: `src/components/ProductCard.jsx` línea 45
- **Problema**: Se renderiza `{product.description}` sin sanitizar
- **Riesgo**: XSS si alguien inyecta HTML/JS
- **Recomendación**: Usar `textContent` o librería de sanitización

### **6. ID duplicado en papas** 
- **Archivo**: `src/App.jsx` línea 137, 145, 153
- **Problema**: Todas usan la misma imagen `PapasSupremas`
- **Impacto**: Menor (solo visual), pero confunde al usuario
- **Recomendación**: Conseguir 3 imágenes diferentes o usar servicios como:
  - Unsplash API
  - Placeholder con texto diferente
  - Generar imágenes dinámicamente

### **7. Error handling en WhatsApp**  
- **Archivo**: `src/App.jsx` línea 451
- **Problema**: Si `window.open()` falla (popup bloqueado), no hay notificación
- **Solución**: Agregar try-catch
  ```jsx
  try {
    window.open(whatsappUrl, '_blank');
    toast.success('Redirigiendo a WhatsApp...');
  } catch (error) {
    toast.error('Error al abrir WhatsApp');
  }
  ```

### **8. Sincronización de form en CartModal**
- **Archivo**: `src/components/CartModal.jsx` línea 154-184
- **Problema**: El estado `formData` no se resetea después de enviar
- **Impacto**: Si abres modal de nuevo, el nombre anterior persiste
- **Solución**: Agregar reset en `onClose` o después de `onSendWhatsApp`

### **9. Precision de números decimales**
- **Archivo**: Múltiples archivos
- **Problema**: `toLocaleString()` puede redondear de forma inesperada
- **Recomendación**: Asegurar que los precios estén siempre en números enteros (sin decimales)

### **10. Performance - useMemo sin dependencias necesarias**
- **Archivo**: `src/App.jsx` línea 335-365
- **Problema**: `cartItems` recalcula cada vez que `potatoCart` cambia (incluso sin cambios)
- **Solución**: Verificar dependencias correctas

### **11. Botón categoria "Papas Fritas" no aparece en orden**
- **Archivo**: `src/App.jsx` línea 331
- **Problema**: Las categorías se ordenan con `.sort()`, pero "Papas Fritas" puede no quedar en buen orden
- **Solución**: Definir orden explícito de categorías

### **12. Toast duplicados al eliminar**
- **Archivo**: `src/App.jsx` línea 512-517
- **Problema**: Se llama `toast.success()` en el callback de `onRemoveItem`
- **Impacto**: Dos toasts pueden aparecer (del callback + original)
- **Solución**: Mover lógica a un solo lugar

### **13. Keyboard accessibility**
- **Problema**: Los botones de cantidad (+/-) no tienen acceso por teclado
- **Recomendación**: Agregar eventos de teclado (Enter, Espacio) a inputs numéricos

### **14. Mobile responsive issues**
- **Problema**: Modal de papas puede ser demasiada grande en mobile
- **Recomendación**: Agregar `max-h-[95vh]` y ajustar paddings en mobile

---

## 🔍 CHECKLIST DE VERIFICACIÓN

- [x] ✅ Imports de imágenes correcto
- [x] ✅ Modal no oculta botones
- [x] ✅ Botón "Agregar al Carrito" visible y funcional
- [ ] ❌ Validación de imágenes con fallback en todas partes
- [ ] ❌ Sanitización de HTML en descripciones
- [ ] ❌ Error handling en WhatsApp
- [ ] ❌ Reset de form después de enviar
- [ ] ❌ Imágenes diferentes para cada tamaño de papas
- [ ] ❌ Accessibility (keyboard, screen readers)
- [ ] ❌ Mobile responsive perfecto

---

## 📝 PRÓXIMOS PASOS RECOMENDADOS

1. **Urgente**: Obtener imágenes reales de papas chicas, medianas y grandes
2. **Importante**: Implementar validaciones de null/undefined en imágenes
3. **Importante**: Agregar error handling para WhatsApp
4. **Nice to have**: Mejorar accessibility y responsive design
5. **Testing**: Probar en diferentes navegadores y devices

---

## 🧪 TESTING MANUAL RECOMENDADO

- [ ] Seleccionar papas + toppings + cantidad → Agregar al carrito → Verificar precio
- [ ] Abrir modal 2 veces seguidas → Verificar que se resetea el estado
- [ ] Eliminar papa del carrito → Verificar toast y recalculo de total
- [ ] Enviar pedido a WhatsApp → Verificar formato del mensaje
- [ ] Abrir en mobile → Verificar modal no se sale de pantalla
- [ ] Cambiar categoría mientras hay papas en carrito → Verificar persistencia

