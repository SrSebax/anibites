/**
 * Modelo de Producto
 * Representa un tipo de gomita con su tamaño, precio y variedades disponibles
 */

import { PRODUCT_VARIETY_ICONS } from '../config/icons';

export const ProductSize = {
  MEDIANA: 'mediana',
  JUMBO: 'jumbo'
};

export const ProductVariety = {
  MIXTA: 'mixta',
  PICOSITA: 'picosita',
  AHOGADA: 'ahogada'
};

export class Product {
  constructor(size, variety, price) {
    this.id = `${size}-${variety}`;
    this.size = size;
    this.variety = variety;
    this.price = price;
    this.name = `Gomitas ${this.getSizeName()} - ${this.getVarietyName()}`;
  }

  getSizeName() {
    return this.size === ProductSize.MEDIANA ? 'Medianas' : 'Jumbo';
  }

  getVarietyName() {
    const varieties = {
      [ProductVariety.MIXTA]: 'Mixta',
      [ProductVariety.PICOSITA]: 'Picosita',
      [ProductVariety.AHOGADA]: 'Ahogada'
    };
    return varieties[this.variety];
  }

  /**
   * Obtiene el componente de icono para la variedad
   * @returns {React.Component} Componente de icono de lucide-react
   */
  getIconComponent() {
    return PRODUCT_VARIETY_ICONS[this.variety]?.component;
  }

  /**
   * Obtiene el color del icono
   * @returns {string} Clase de color CSS
   */
  getIconColor() {
    return PRODUCT_VARIETY_ICONS[this.variety]?.color || 'text-gray-500';
  }

  /**
   * Obtiene el color de fondo para el icono
   * @returns {string} Clase de color de fondo CSS
   */
  getIconBgColor() {
    return PRODUCT_VARIETY_ICONS[this.variety]?.bgColor || 'bg-gray-100';
  }

  getColor() {
    const colors = {
      [ProductVariety.MIXTA]: 'bg-gradient-to-br from-kawaii-pink to-kawaii-purple',
      [ProductVariety.PICOSITA]: 'bg-gradient-to-br from-red-400 to-orange-400',
      [ProductVariety.AHOGADA]: 'bg-gradient-to-br from-kawaii-rose to-red-500'
    };
    return colors[this.variety];
  }

  toJSON() {
    return {
      id: this.id,
      size: this.size,
      variety: this.variety,
      price: this.price,
      name: this.name
    };
  }

  static fromJSON(json) {
    return new Product(json.size, json.variety, json.price);
  }
}

// Catálogo de productos disponibles
export const PRODUCTS_CATALOG = [
  // Medianas
  new Product(ProductSize.MEDIANA, ProductVariety.MIXTA, 5500),
  new Product(ProductSize.MEDIANA, ProductVariety.PICOSITA, 5500),
  new Product(ProductSize.MEDIANA, ProductVariety.AHOGADA, 5500),
  // Jumbo
  new Product(ProductSize.JUMBO, ProductVariety.MIXTA, 10000),
  new Product(ProductSize.JUMBO, ProductVariety.PICOSITA, 10000),
  new Product(ProductSize.JUMBO, ProductVariety.AHOGADA, 10000),
];
