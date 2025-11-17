# ¿Cómo agregar una nueva categoría al navegador?

Si quieres agregar una nueva categoría como "juguetes" al navegador, necesitas modificar **solamente 2 archivos**:

## 1. `/src/components/Nav/Nav.jsx`

Este es el archivo principal que contiene el menú de navegación. Debes agregar un nuevo `<li>` con un `<Link>` para la nueva categoría.

**Ubicación:** Dentro de la lista `<ul className="categorias">`, después de las categorías existentes.

**Ejemplo de código a agregar:**

```jsx
<li>
  <Link
    to={"/category/juguetes"}
    onClick={() => { handleLinkClick(); setNavActivo("/category/juguetes"); irAPrimeraPagina("juguetes"); }}
    className={navActivo === "/category/juguetes" ? "activo" : ""}
  >
    Juguetes
  </Link>
</li>
```

**Notas importantes:**
- Cambia `"juguetes"` por el nombre de tu categoría
- Asegúrate de que el nombre en `to={"/category/juguetes"}` coincida con el valor de `category` en tus productos
- El texto dentro del `<Link>` (ej: "Juguetes") es lo que verán los usuarios en el menú

## 2. `/public/data/products.json`

Este archivo contiene todos los productos del catálogo. Debes agregar productos con la nueva categoría.

**Ejemplo de productos a agregar:**

```json
{
  "id": "228",
  "name": "Auto de Juguete RC",
  "listPrice": 25000,
  "price": 35000,
  "category": "juguetes",
  "description": "Auto a control remoto con batería recargable - Velocidad máxima 15km/h",
  "imageUrl": "/images/autoRC.jfif"
}
```

**Notas importantes:**
- El campo `"category"` debe coincidir exactamente con el nombre usado en la URL del Nav.jsx
- El `id` debe ser único y no repetirse con otros productos
- El `imageUrl` debe apuntar a una imagen existente en la carpeta `/public/images/`

## Archivos que NO necesitan cambios:

### ❌ `/src/App.jsx`
**No requiere cambios** porque usa una ruta dinámica:
```jsx
<Route path="/category/:categoryId" element={<ItemListContainer />} />
```
Esta ruta ya maneja automáticamente cualquier categoría nueva.

### ❌ `/src/components/ItemListContainer/ItemListContainer.jsx`
**No requiere cambios** porque filtra los productos dinámicamente:
```jsx
const coincideCategoria = categoryId ? prod.category === categoryId : true;
```

### ❌ `/src/context/ProductProvider.jsx`
**No requiere cambios** porque no tiene lógica específica de categorías.

## Resumen

Para agregar una categoría llamada "juguetes":

1. ✅ Edita `Nav.jsx` → Agrega el enlace de navegación
2. ✅ Edita `products.json` → Agrega productos con `"category": "juguetes"`
3. ✅ (Opcional) Agrega imágenes en `/public/images/` para los nuevos productos

¡Y listo! La aplicación automáticamente mostrará la nueva categoría y filtrará los productos correctamente.
