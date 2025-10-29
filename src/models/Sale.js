/**
 * Modelo de Venta
 * Representa una transacción de venta de gomitas
 */

export class Sale {
  constructor(product, quantity, date = new Date(), notes = '') {
    this.id = this.generateId();
    this.product = product;
    this.quantity = quantity;
    this.date = date;
    this.notes = notes;
    this.total = product.price * quantity;
  }

  generateId() {
    return `sale-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      id: this.id,
      product: this.product.toJSON(),
      quantity: this.quantity,
      date: this.date.toISOString(),
      notes: this.notes,
      total: this.total
    };
  }

  // Obtiene la fecha/hora local sin conversión de zona horaria
  getLocalDateTime() {
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const day = String(this.date.getDate()).padStart(2, '0');
    const hours = String(this.date.getHours()).padStart(2, '0');
    const minutes = String(this.date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  static fromJSON(json) {
    const { Product } = require('./Product');
    const product = Product.fromJSON(json.product);
    const sale = new Sale(
      product,
      json.quantity,
      new Date(json.date),
      json.notes
    );
    sale.id = json.id;
    sale.total = json.total;
    return sale;
  }

  getFormattedDate() {
    return this.date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getFormattedTime() {
    return this.date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getFormattedTotal() {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(this.total);
  }
}

