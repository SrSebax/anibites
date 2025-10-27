/**
 * CONFIGURACIÓN CENTRALIZADA DE ICONOS
 * 
 * Este archivo permite gestionar todos los iconos de la aplicación desde un solo lugar.
 * Puedes cambiar fácilmente entre diferentes iconos o incluso usar imágenes.
 * 
 * USO:
 * import { ICONS, getIcon } from '@/config/icons';
 * 
 * // Como componente:
 * <ICONS.home size={24} />
 * 
 * // Usando la función helper:
 * {getIcon('home', 24, 'text-red-500')}
 */

import {
  // Navegación
  Home,
  Plus,
  Calendar,
  BarChart3,
  
  // Productos y Ventas
  Candy,
  Flame,
  Droplet,
  ShoppingBag,
  Package,
  DollarSign,
  
  // Estadísticas
  TrendingUp,
  PieChart,
  Target,
  
  // Acciones
  Save,
  Trash2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  
  // UI
  Menu,
  X,
  Clock,
  
  // Estados
  Inbox,
  PackageX,
  Heart,
  Sparkles,
  
  // Otros
  Star,
  Award,
} from 'lucide-react';

/**
 * ICONOS PRINCIPALES DE LA APLICACIÓN
 * Agrupa todos los iconos usados en la app
 */
export const ICONS = {
  // Navegación principal
  home: Home,
  plus: Plus,
  calendar: Calendar,
  stats: BarChart3,
  
  // Productos - Variedades
  mixta: Candy,           // Para gomitas mixtas
  picosita: Flame,        // Para gomitas picositas
  ahogada: Droplet,       // Para gomitas ahogadas
  
  // Ventas y transacciones
  shopping: ShoppingBag,
  package: Package,
  money: DollarSign,
  coin: DollarSign,
  
  // Estadísticas y análisis
  trending: TrendingUp,
  pieChart: PieChart,
  target: Target,
  chart: BarChart3,
  
  // Acciones
  save: Save,
  delete: Trash2,
  back: ArrowLeft,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  
  // UI y controles
  menu: Menu,
  close: X,
  clock: Clock,
  
  // Estados vacíos
  empty: Inbox,
  noData: PackageX,
  
  // Decorativos
  heart: Heart,
  sparkles: Sparkles,
  star: Star,
  award: Award,
};

/**
 * ICONOS POR CATEGORÍA
 * Organiza los iconos por su uso en la aplicación
 */
export const ICON_CATEGORIES = {
  navigation: {
    home: ICONS.home,
    newSale: ICONS.plus,
    calendar: ICONS.calendar,
    stats: ICONS.stats,
  },
  
  products: {
    mixta: ICONS.mixta,
    picosita: ICONS.picosita,
    ahogada: ICONS.ahogada,
  },
  
  sales: {
    shopping: ICONS.shopping,
    package: ICONS.package,
    money: ICONS.money,
  },
  
  stats: {
    trending: ICONS.trending,
    chart: ICONS.chart,
    target: ICONS.target,
  },
};

/**
 * CONFIGURACIÓN DE TAMAÑOS PREDEFINIDOS
 */
export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
};

/**
 * FUNCIÓN HELPER PARA RENDERIZAR ICONOS
 * 
 * @param {string} iconName - Nombre del icono (de ICONS)
 * @param {number|string} size - Tamaño (número o key de ICON_SIZES)
 * @param {string} className - Clases CSS adicionales
 * @param {object} props - Props adicionales para el icono
 * @returns {JSX.Element} - Componente del icono
 * 
 * @example
 * getIcon('home', 'lg', 'text-blue-500')
 * getIcon('mixta', 24, 'text-pink-500', { strokeWidth: 2 })
 */
export const getIcon = (iconName, size = 'md', className = '', props = {}) => {
  const IconComponent = ICONS[iconName];
  
  if (!IconComponent) {
    console.warn(`Icono "${iconName}" no encontrado en ICONS`);
    return null;
  }
  
  const iconSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  
  return <IconComponent size={iconSize} className={className} {...props} />;
};

/**
 * MAPEO DE VARIEDADES A ICONOS
 * Para uso directo en el modelo Product
 */
export const PRODUCT_VARIETY_ICONS = {
  mixta: {
    component: ICONS.mixta,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
  },
  picosita: {
    component: ICONS.picosita,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
  },
  ahogada: {
    component: ICONS.ahogada,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
};

/**
 * ICONOS PARA ESTADOS VACÍOS
 */
export const EMPTY_STATE_ICONS = {
  noSales: ICONS.package,
  noData: ICONS.noData,
  empty: ICONS.empty,
};

/**
 * ICONOS PARA STATS CARDS
 */
export const STAT_CARD_ICONS = {
  todaySales: ICONS.money,
  quantity: ICONS.package,
  monthSales: ICONS.trending,
  transactions: ICONS.target,
  bestProduct: ICONS.award,
  average: ICONS.chart,
};

export default ICONS;

