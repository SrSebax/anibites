/**
 * Servicio de Firebase
 * Maneja la persistencia de datos en Firestore
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTIONS = {
  SALES: 'sales',
  SETTINGS: 'settings'
};

class FirebaseService {
  /**
   * VENTAS - CRUD Operations
   */

  /**
   * Obtiene todas las ventas
   */
  async getAllSales() {
    try {
      const salesRef = collection(db, COLLECTIONS.SALES);
      const q = query(salesRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const sales = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convertir Timestamp de Firestore a Date
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate().toISOString();
        }
        sales.push({
          firestoreId: doc.id,
          ...data
        });
      });
      
      return sales;
    } catch (error) {
      console.error('Error al obtener ventas desde Firebase:', error);
      throw error;
    }
  }

  /**
   * Obtiene una venta por ID
   */
  async getSaleById(id) {
    try {
      const saleRef = doc(db, COLLECTIONS.SALES, id);
      const saleDoc = await getDoc(saleRef);
      
      if (saleDoc.exists()) {
        const data = saleDoc.data();
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate().toISOString();
        }
        return {
          firestoreId: saleDoc.id,
          ...data
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener venta desde Firebase:', error);
      throw error;
    }
  }

  /**
   * Agrega una nueva venta
   */
  async addSale(saleData) {
    try {
      // Convertir fecha a Timestamp de Firestore
      const dataToSave = {
        ...saleData,
        date: Timestamp.fromDate(new Date(saleData.date))
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.SALES), dataToSave);
      
      return {
        firestoreId: docRef.id,
        ...saleData
      };
    } catch (error) {
      console.error('Error al agregar venta a Firebase:', error);
      throw error;
    }
  }

  /**
   * Actualiza una venta existente
   */
  async updateSale(firestoreId, updates) {
    try {
      // Si se actualiza la fecha, convertirla a Timestamp
      const dataToUpdate = { ...updates };
      if (updates.date) {
        dataToUpdate.date = Timestamp.fromDate(new Date(updates.date));
      }
      
      const saleRef = doc(db, COLLECTIONS.SALES, firestoreId);
      await updateDoc(saleRef, dataToUpdate);
      
      return true;
    } catch (error) {
      console.error('Error al actualizar venta en Firebase:', error);
      throw error;
    }
  }

  /**
   * Elimina una venta
   */
  async deleteSale(firestoreId) {
    try {
      const saleRef = doc(db, COLLECTIONS.SALES, firestoreId);
      await deleteDoc(saleRef);
      return true;
    } catch (error) {
      console.error('Error al eliminar venta de Firebase:', error);
      throw error;
    }
  }

  /**
   * Obtiene ventas por rango de fechas
   */
  async getSalesByDateRange(startDate, endDate) {
    try {
      const salesRef = collection(db, COLLECTIONS.SALES);
      const q = query(
        salesRef,
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const sales = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate().toISOString();
        }
        sales.push({
          firestoreId: doc.id,
          ...data
        });
      });
      
      return sales;
    } catch (error) {
      console.error('Error al obtener ventas por rango de fechas:', error);
      throw error;
    }
  }

  /**
   * CONFIGURACIÓN - CRUD Operations
   */

  /**
   * Guarda configuración
   */
  async saveSettings(settings) {
    try {
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'app-settings');
      await updateDoc(settingsRef, settings);
      return true;
    } catch (error) {
      // Si el documento no existe, créalo
      try {
        const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'app-settings');
        await addDoc(collection(db, COLLECTIONS.SETTINGS), settings);
        return true;
      } catch (createError) {
        console.error('Error al guardar configuración:', createError);
        throw createError;
      }
    }
  }

  /**
   * Carga configuración
   */
  async loadSettings() {
    try {
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'app-settings');
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        return settingsDoc.data();
      }
      
      return {};
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      return {};
    }
  }
}

export default new FirebaseService();
