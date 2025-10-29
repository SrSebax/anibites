/**
 * Servicio de Ventas
 * Maneja toda la lógica de negocio relacionada con las ventas
 * AHORA USA FIREBASE FIRESTORE
 */

import { Sale } from '../models/Sale';
import { Product } from '../models/Product';
import FirebaseService from './FirebaseService';

class SalesService {
  constructor() {
    this.sales = [];
    this.isLoaded = false;
  }

  /**
   * Carga las ventas desde Firebase Firestore
   */
  async loadSales() {
    try {
      const salesData = await FirebaseService.getAllSales();
      this.sales = salesData.map(saleJson => {
        const product = Product.fromJSON(saleJson.product);
        const sale = new Sale(
          product,
          saleJson.quantity,
          new Date(saleJson.date),
          saleJson.notes
        );
        sale.id = saleJson.id;
        sale.firestoreId = saleJson.firestoreId; // ID de Firestore
        sale.total = saleJson.total;
        return sale;
      });
      this.isLoaded = true;
      return this.sales;
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      return [];
    }
  }

  /**
   * Agrega una nueva venta
   */
  async addSale(product, quantity, date = new Date(), notes = '') {
    try {
      const sale = new Sale(product, quantity, date, notes);
      const saleData = sale.toJSON();
      
      // Guardar en Firebase
      const savedSale = await FirebaseService.addSale(saleData);
      
      // Actualizar el ID de Firestore
      sale.firestoreId = savedSale.firestoreId;
      
      // Agregar a la lista local
      this.sales.push(sale);
      
      return sale;
    } catch (error) {
      console.error('Error al agregar venta:', error);
      throw error;
    }
  }

  /**
   * Obtiene todas las ventas (carga si no está cargado)
   */
  async getAllSales() {
    if (!this.isLoaded) {
      await this.loadSales();
    }
    return [...this.sales];
  }

  /**
   * Obtiene una venta por ID
   */
  getSaleById(id) {
    return this.sales.find(sale => sale.id === id);
  }

  /**
   * Elimina una venta
   */
  async deleteSale(id) {
    try {
      const index = this.sales.findIndex(sale => sale.id === id);
      if (index !== -1) {
        const sale = this.sales[index];
        
        // Eliminar de Firebase
        if (sale.firestoreId) {
          await FirebaseService.deleteSale(sale.firestoreId);
        }
        
        // Eliminar de la lista local
        this.sales.splice(index, 1);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      throw error;
    }
  }

  /**
   * Actualiza una venta
   */
  async updateSale(id, updates) {
    try {
      const sale = this.getSaleById(id);
      if (sale) {
        // Actualizar propiedades
        Object.assign(sale, updates);
        if (updates.quantity || updates.product) {
          sale.total = sale.product.price * sale.quantity;
        }
        
        // Actualizar en Firebase
        if (sale.firestoreId) {
          const updateData = {
            quantity: sale.quantity,
            notes: sale.notes,
            total: sale.total,
            date: sale.date.toISOString()
          };
          
          if (updates.product) {
            updateData.product = sale.product.toJSON();
          }
          
          await FirebaseService.updateSale(sale.firestoreId, updateData);
        }
        
        return sale;
      }
      return null;
    } catch (error) {
      console.error('Error al actualizar venta:', error);
      throw error;
    }
  }

  /**
   * Obtiene ventas por fecha
   */
  getSalesByDate(date) {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return this.sales.filter(sale => {
      const saleDate = new Date(sale.date);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === targetDate.getTime();
    });
  }

  /**
   * Obtiene ventas por rango de fechas
   */
  getSalesByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    return this.sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });
  }

  /**
   * Obtiene ventas del mes actual
   */
  getCurrentMonthSales() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return this.getSalesByDateRange(firstDay, lastDay);
  }

  /**
   * Obtiene ventas de hoy
   */
  getTodaySales() {
    return this.getSalesByDate(new Date());
  }

  /**
   * Calcula el total de ventas
   */
  calculateTotal(sales = this.sales) {
    return sales.reduce((total, sale) => total + sale.total, 0);
  }

  /**
   * Calcula la cantidad total de productos vendidos
   */
  calculateTotalQuantity(sales = this.sales) {
    return sales.reduce((total, sale) => total + sale.quantity, 0);
  }

  /**
   * Obtiene estadísticas por producto
   */
  getProductStats(sales = this.sales) {
    const stats = {};

    sales.forEach(sale => {
      const productId = sale.product.id;
      if (!stats[productId]) {
        stats[productId] = {
          product: sale.product,
          quantity: 0,
          total: 0,
          sales: 0
        };
      }
      stats[productId].quantity += sale.quantity;
      stats[productId].total += sale.total;
      stats[productId].sales += 1;
    });

    return Object.values(stats);
  }

  /**
   * Obtiene estadísticas por variedad
   */
  getVarietyStats(sales = this.sales) {
    const stats = {};

    sales.forEach(sale => {
      const variety = sale.product.variety;
      if (!stats[variety]) {
        stats[variety] = {
          variety,
          quantity: 0,
          total: 0,
          sales: 0
        };
      }
      stats[variety].quantity += sale.quantity;
      stats[variety].total += sale.total;
      stats[variety].sales += 1;
    });

    return Object.values(stats);
  }

  /**
   * Obtiene estadísticas por tamaño
   */
  getSizeStats(sales = this.sales) {
    const stats = {};

    sales.forEach(sale => {
      const size = sale.product.size;
      if (!stats[size]) {
        stats[size] = {
          size,
          quantity: 0,
          total: 0,
          sales: 0
        };
      }
      stats[size].quantity += sale.quantity;
      stats[size].total += sale.total;
      stats[size].sales += 1;
    });

    return Object.values(stats);
  }

  /**
   * Obtiene ventas agrupadas por fecha
   */
  getSalesGroupedByDate(sales = this.sales) {
    const grouped = {};

    sales.forEach(sale => {
      const dateKey = sale.date.toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          sales: [],
          total: 0,
          quantity: 0
        };
      }
      grouped[dateKey].sales.push(sale);
      grouped[dateKey].total += sale.total;
      grouped[dateKey].quantity += sale.quantity;
    });

    return Object.values(grouped).sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  }

  /**
   * Obtiene el producto más vendido
   */
  getBestSellingProduct(sales = this.sales) {
    const productStats = this.getProductStats(sales);
    if (productStats.length === 0) return null;
    
    return productStats.reduce((best, current) => 
      current.quantity > best.quantity ? current : best
    );
  }

  /**
   * Obtiene el promedio de ventas por día
   */
  getAverageDailySales(sales = this.sales) {
    if (sales.length === 0) return 0;

    const grouped = this.getSalesGroupedByDate(sales);
    const totalDays = grouped.length;
    const totalSales = this.calculateTotal(sales);

    return totalDays > 0 ? totalSales / totalDays : 0;
  }
}

export default new SalesService();
