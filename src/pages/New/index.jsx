import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components';
import { PRODUCTS_CATALOG } from '../../models';
import { SalesService } from '../../services';
import { ICONS } from '../../config/icons';

const New = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert('Por favor selecciona un producto');
      return;
    }

    if (quantity < 1) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    setIsSubmitting(true);

    try {
      const saleDate = new Date(date);
      SalesService.addSale(selectedProduct, quantity, saleDate, notes);
      
      alert('¡Venta registrada exitosamente!');
      
      navigate('/');
    } catch (error) {
      console.error('Error al registrar venta:', error);
      alert('Hubo un error al registrar la venta. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * quantity;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-cream via-kawaii-pink/10 to-kawaii-purple/10 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-kawaii-rose hover:text-kawaii-purple transition-colors mb-4"
          >
            <ICONS.back className="mr-2" size={20} />
            Volver al Inicio
          </button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kawaii-rose to-kawaii-purple mb-2">
            Nueva Venta
          </h1>
          <p className="text-gray-600">
            Registra una nueva venta de gomitas enchiladas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Selecciona el Producto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS_CATALOG.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedProduct?.id === product.id}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </div>

          {/* Sale Details */}
          {selectedProduct && (
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                2. Detalles de la Venta
              </h2>

              <div className="space-y-6">
                {/* Quantity */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-kawaii-rose focus:outline-none transition-colors text-lg font-semibold"
                    required
                  />
                </div>

                {/* Date and Time */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Fecha y Hora
                  </label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-kawaii-rose focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Notas (Opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: Cliente frecuente, pedido especial, etc."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-kawaii-rose focus:outline-none transition-colors resize-none"
                    rows="3"
                  />
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-kawaii-pink to-kawaii-purple rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/90 mb-1">Total a Cobrar</p>
                      <p className="text-4xl font-bold">
                        {formatCurrency(calculateTotal())}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <ICONS.money size={48} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedProduct && (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-kawaii-rose to-kawaii-purple text-white font-bold rounded-xl shadow-kawaii hover:shadow-kawaii-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <ICONS.save className="mr-2" size={20} />
                    Registrar Venta
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default New;
