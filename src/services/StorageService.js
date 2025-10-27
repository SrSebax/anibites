/**
 * Servicio de Almacenamiento
 * Maneja la persistencia de datos en localStorage
 */

const STORAGE_KEYS = {
  SALES: 'anibites_sales',
  SETTINGS: 'anibites_settings'
};

class StorageService {
  /**
   * Guarda datos en localStorage
   */
  save(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
      return false;
    }
  }

  /**
   * Carga datos desde localStorage
   */
  load(key) {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized);
    } catch (error) {
      console.error('Error al cargar desde localStorage:', error);
      return null;
    }
  }

  /**
   * Elimina datos de localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error al eliminar de localStorage:', error);
      return false;
    }
  }

  /**
   * Limpia todo el localStorage de la aplicación
   */
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.remove(key);
    });
  }

  // Métodos específicos para ventas
  saveSales(sales) {
    return this.save(STORAGE_KEYS.SALES, sales);
  }

  loadSales() {
    return this.load(STORAGE_KEYS.SALES) || [];
  }

  // Métodos específicos para configuración
  saveSettings(settings) {
    return this.save(STORAGE_KEYS.SETTINGS, settings);
  }

  loadSettings() {
    return this.load(STORAGE_KEYS.SETTINGS) || {};
  }
}

export default new StorageService();

