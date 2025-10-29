/**
 * Modelo de Producto
 * Representa un tipo de gomita con su tamaño, precio, variedades y sabor de chamoy
 */

export const ProductSize = {
  MEDIANA: 'mediana',
  JUMBO: 'jumbo'
};

export const ProductVariety = {
  MIXTA: 'mixta',
  PICOSITA: 'picosita',
  AHOGADA: 'ahogada'
};

export const ChamoyFlavor = {
  MANGO: 'mango',
  FRESA: 'fresa'
};

export class Product {
  constructor(size, variety, chamoyFlavor, price) {
    this.id = `${size}-${variety}-${chamoyFlavor}`;
    this.size = size;
    this.variety = variety;
    this.chamoyFlavor = chamoyFlavor;
    this.price = price;
    this.name = `Gomitas ${this.getSizeName()} - ${this.getVarietyName()} - Chamoy ${this.getChamoyFlavorName()}`;
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

  getChamoyFlavorName() {
    const flavors = {
      [ChamoyFlavor.MANGO]: 'Mango',
      [ChamoyFlavor.FRESA]: 'Fresa'
    };
    return flavors[this.chamoyFlavor];
  }

  getIcon() {
    const icons = {
      [ProductVariety.MIXTA]: '🍬',
      [ProductVariety.PICOSITA]: '🌶️',
      [ProductVariety.AHOGADA]: '💧'
    };
    return icons[this.variety];
  }

  getChamoyIcon() {
    const icons = {
      [ChamoyFlavor.MANGO]: '🥭',
      [ChamoyFlavor.FRESA]: '🍓'
    };
    return icons[this.chamoyFlavor];
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
      chamoyFlavor: this.chamoyFlavor,
      price: this.price,
      name: this.name
    };
  }

  static fromJSON(json) {
    return new Product(json.size, json.variety, json.chamoyFlavor, json.price);
  }
}

// Catálogo de productos disponibles
export const PRODUCTS_CATALOG = [
  // Medianas - Chamoy Mango
  new Product(ProductSize.MEDIANA, ProductVariety.MIXTA, ChamoyFlavor.MANGO, 5500),
  new Product(ProductSize.MEDIANA, ProductVariety.PICOSITA, ChamoyFlavor.MANGO, 5500),
  new Product(ProductSize.MEDIANA, ProductVariety.AHOGADA, ChamoyFlavor.MANGO, 5500),
  
  // Medianas - Chamoy Fresa
  new Product(ProductSize.MEDIANA, ProductVariety.MIXTA, ChamoyFlavor.FRESA, 5500),
  new Product(ProductSize.MEDIANA, ProductVariety.PICOSITA, ChamoyFlavor.FRESA, 5500),
  new Product(ProductSize.MEDIANA, ProductVariety.AHOGADA, ChamoyFlavor.FRESA, 5500),
  
  // Jumbo - Chamoy Mango
  new Product(ProductSize.JUMBO, ProductVariety.MIXTA, ChamoyFlavor.MANGO, 10000),
  new Product(ProductSize.JUMBO, ProductVariety.PICOSITA, ChamoyFlavor.MANGO, 10000),
  new Product(ProductSize.JUMBO, ProductVariety.AHOGADA, ChamoyFlavor.MANGO, 10000),
  
  // Jumbo - Chamoy Fresa
  new Product(ProductSize.JUMBO, ProductVariety.MIXTA, ChamoyFlavor.FRESA, 10000),
  new Product(ProductSize.JUMBO, ProductVariety.PICOSITA, ChamoyFlavor.FRESA, 10000),
  new Product(ProductSize.JUMBO, ProductVariety.AHOGADA, ChamoyFlavor.FRESA, 10000),
];

