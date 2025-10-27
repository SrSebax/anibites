# 🍬 Anibites - Gestor de Ventas de Gomitas Enchiladas

<div align="center">
  <img src="public/anibites.svg" alt="Anibites Logo" width="200"/>
</div>

Una aplicación web moderna y responsiva para gestionar las ventas de gomitas enchiladas. Diseñada con un estilo kawaii y colores rosados, funciona perfectamente en dispositivos móviles, tablets y escritorio.

## ✨ Características

- 📊 **Dashboard Interactivo**: Visualiza tus ventas del día y del mes
- 🛍️ **Registro de Ventas**: Interfaz intuitiva para registrar nuevas ventas
- 📅 **Calendario de Ventas**: Visualiza y gestiona tus ventas por día
- 📈 **Estadísticas Detalladas**: Gráficos y análisis de tus ventas
- 🎨 **Diseño Kawaii**: Interfaz colorida y amigable con tema rosado
- 📱 **Responsive**: Funciona perfectamente en móvil, tablet y escritorio
- 💾 **Almacenamiento Local**: Tus datos se guardan en tu dispositivo
- 🚀 **PWA Ready**: Instala la app en tu dispositivo como una app nativa

## 🛍️ Productos

### Gomitas Medianas - $5,500 COP
- Mixta 🍬
- Picosita 🌶️
- Ahogada 💧

### Gomitas Jumbo - $10,000 COP
- Mixta 🍬
- Picosita 🌶️
- Ahogada 💧

## 🏗️ Arquitectura Mejorada (MVC)

El proyecto sigue una arquitectura MVC (Modelo-Vista-Controlador) con nombres concisos y estructura organizada:

```
anibites/
├── public/                    # Archivos públicos
│   ├── anibites.svg          # Logo principal (también usado como favicon)
│   ├── manifest.json         # PWA manifest
│   └── vite.svg
│
├── src/
│   ├── pages/                # 📄 PAGES (Vistas principales)
│   │   ├── Home/            # Página de inicio/dashboard
│   │   │   └── index.jsx
│   │   ├── New/             # Nueva venta
│   │   │   └── index.jsx
│   │   ├── Calendar/        # Calendario de ventas
│   │   │   └── index.jsx
│   │   ├── Stats/           # Estadísticas
│   │   │   └── index.jsx
│   │   └── index.js         # Exportaciones centralizadas
│   │
│   ├── components/          # 🧩 COMPONENTS (Componentes reutilizables)
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SaleCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── EmptyState.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── index.js
│   │
│   ├── services/            # 🔧 SERVICES (Lógica de negocio - Controlador)
│   │   ├── SalesService.js
│   │   ├── StorageService.js
│   │   └── index.js
│   │
│   ├── models/              # 📦 MODELS (Modelos de datos)
│   │   ├── Product.js
│   │   ├── Sale.js
│   │   └── index.js
│   │
│   ├── styles/              # 🎨 STYLES (Estilos globales)
│   │   └── index.css
│   │
│   ├── App.jsx             # Componente principal con routing
│   └── main.jsx            # Punto de entrada
│
├── index.html               # HTML principal con meta tags y PWA
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .gitignore
└── README.md
```

### 📐 Estructura MVC Explicada

**🔴 MODELO** (`src/models/`)
- Definición de datos y estructuras
- `Product.js` - Productos con precios y variedades
- `Sale.js` - Ventas con cálculos y formatos

**🟢 VISTA** (`src/pages/` + `src/components/`)
- **Pages**: Páginas completas de la aplicación
  - `Home/` - Dashboard principal
  - `New/` - Registro de ventas
  - `Calendar/` - Vista de calendario
  - `Stats/` - Estadísticas y gráficos
- **Components**: Componentes reutilizables UI

**🔵 CONTROLADOR** (`src/services/`)
- Lógica de negocio y operaciones
- `SalesService.js` - Gestión de ventas y estadísticas
- `StorageService.js` - Persistencia de datos

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o acceder al repositorio**
   ```bash
   cd /Users/sebaslon/Desktop/Nørdware/anibites
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   
   La aplicación estará disponible en: `http://localhost:3000`

## 📱 Uso en Dispositivos Móviles

La aplicación es completamente responsive y se adapta a diferentes tamaños de pantalla:

### Para Android/iOS:
1. Abre la aplicación en tu navegador móvil
2. Puedes agregar la aplicación a tu pantalla de inicio para un acceso rápido:
   - **iOS**: Tap en "Compartir" → "Agregar a pantalla de inicio"
   - **Android**: Menú → "Agregar a pantalla de inicio"

## 🎨 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación entre páginas
- **Tailwind CSS** - Estilos y diseño responsive
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas
- **LocalStorage API** - Persistencia de datos

## 📖 Guía de Uso

### 1️⃣ **Home (Dashboard)**
- Visualiza el resumen de ventas del día y del mes
- Ve las ventas más recientes
- Accede rápidamente a registrar una nueva venta
- Consulta el producto más vendido
- Revisa el promedio de ventas diarias

### 2️⃣ **New (Nueva Venta)**
- Selecciona el tipo de gomita (tamaño y variedad)
- Ingresa la cantidad vendida
- Agrega fecha/hora (por defecto es ahora)
- Opcionalmente agrega notas
- Confirma para registrar la venta

### 3️⃣ **Calendar (Calendario)**
- Visualiza tus ventas organizadas por día
- Navega entre meses
- Haz clic en cualquier día para ver sus ventas
- Los días con ventas se destacan con un indicador
- Ve el resumen del día seleccionado

### 4️⃣ **Stats (Estadísticas)**
- Gráfico de barras de últimos 7 días
- Gráfico de pastel por distribución de productos
- Tabla detallada por producto
- Estadísticas por tamaño (Medianas vs Jumbo)
- Estadísticas por variedad (Mixta, Picosita, Ahogada)
- Totales y promedios del mes

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Genera la build de producción
npm run preview      # Previsualiza la build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 💾 Persistencia de Datos

Los datos se almacenan localmente en tu navegador usando LocalStorage. Esto significa:

✅ **Ventajas:**
- No necesitas conexión a internet
- Tus datos son privados y permanecen en tu dispositivo
- Acceso instantáneo a la información

⚠️ **Consideraciones:**
- Los datos solo están disponibles en el navegador donde los guardaste
- Si limpias los datos del navegador, perderás la información
- No hay sincronización entre dispositivos

### Respaldo de Datos

Para respaldar tus datos:
1. Abre las DevTools del navegador (F12)
2. Ve a "Application" → "Local Storage"
3. Copia los valores de `anibites_sales`
4. Guárdalos en un archivo de texto seguro

## 🎨 Personalización

### Cambiar Colores
Edita `tailwind.config.js` para personalizar la paleta de colores:

```javascript
colors: {
  kawaii: {
    pink: '#FFB6C1',    // Rosa claro
    rose: '#FF69B4',    // Rosa fucsia
    purple: '#DDA0DD',  // Púrpura
    // ... más colores
  }
}
```

### Agregar Nuevos Productos
Edita `src/models/Product.js`:

```javascript
export const PRODUCTS_CATALOG = [
  // Agrega nuevos productos aquí
  new Product(ProductSize.NUEVA_CATEGORIA, ProductVariety.NUEVA_VARIEDAD, precio),
];
```

### Modificar Rutas
Edita `src/App.jsx` para agregar nuevas rutas:

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/nueva-ruta" element={<NuevaPagina />} />
  {/* ... más rutas */}
</Routes>
```

## 🐛 Solución de Problemas

### La aplicación no inicia
```bash
# Limpia node_modules e instala de nuevo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Los estilos no se aplican correctamente
```bash
# Limpia la caché de Vite
rm -rf node_modules/.vite
npm run dev
```

### El logo no aparece
- Verifica que `public/anibites.svg` exista
- Asegúrate de que el servidor de desarrollo esté corriendo
- Limpia la caché del navegador (Ctrl+Shift+R)

### Los datos no se guardan
- Verifica que el navegador no esté en modo incógnito
- Asegúrate de que LocalStorage esté habilitado en tu navegador
- Revisa la consola del navegador por errores

## 📦 Build para Producción

Para generar una versión optimizada para producción:

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist/`. Puedes desplegar esta carpeta en cualquier servicio de hosting estático como:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- Cloudflare Pages

## 🤝 Contribuir

Si deseas agregar nuevas funcionalidades:

1. Crea una nueva rama
2. Implementa los cambios siguiendo la estructura MVC
3. Asegúrate de que todo funcione correctamente
4. Crea un pull request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 💖 Hecho con Amor

<div align="center">
  <img src="public/anibites.svg" alt="Anibites Logo" width="150"/>
  <p>Desarrollado con ❤️ para el negocio de gomitas enchiladas <strong>Anibites</strong></p>
</div>

---

## 🆘 Soporte

Si tienes preguntas o problemas, puedes:
- Revisar la documentación en este README
- Consultar la consola del navegador para errores
- Revisar los comentarios en el código fuente

## 🚀 Próximas Funcionalidades

Posibles mejoras futuras:
- [ ] Exportar ventas a Excel/CSV
- [ ] Modo oscuro
- [ ] Múltiples usuarios/negocios
- [ ] Sincronización en la nube
- [ ] Notificaciones de ventas
- [ ] Metas y objetivos de ventas
- [ ] Inventario de productos
- [ ] Sistema de clientes frecuentes
- [ ] Reportes en PDF
- [ ] Dashboard con widgets personalizables

---

**¡Que tengas excelentes ventas! 🍬💰**
