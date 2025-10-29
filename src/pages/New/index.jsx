import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { ProductCard, SuccessModal } from '../../components';
import { PRODUCTS_CATALOG, ChamoyFlavor, ProductSize } from '../../models';
import { SalesService } from '../../services';

const getLocalDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const New = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(getLocalDateTime());
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert('Por favor selecciona un producto');
    if (quantity < 1) return alert('La cantidad debe ser mayor a 0');
    setIsSubmitting(true);
    try {
      const saleDate = new Date(date);
      await SalesService.addSale(selectedProduct, quantity, saleDate, notes);
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (error) {
      console.error('Error al registrar venta:', error);
      alert('Hubo un error al registrar la venta. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => (!selectedProduct ? 0 : selectedProduct.price * quantity);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-cream via-kawaii-pink/10 to-kawaii-purple/10 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-kawaii-rose hover:text-kawaii-purple transition-colors mb-4"
          >
            <ArrowLeft className="mr-2" size={20} />
            Volver al Inicio
          </button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kawaii-rose to-kawaii-purple mb-2">
            Nueva Venta 🍬
          </h1>
          <p className="text-gray-600">Registra una nueva venta de gomitas enchiladas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">1. Selecciona el Producto</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border-2 border-orange-200 rounded-xl p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-3 shadow-md">
                  <span className="text-3xl">🥭</span>
                  <h3 className="text-lg font-bold text-orange-800">Chamoy Mango</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <div className="text-center bg-orange-100 rounded-lg py-2 mb-2 font-bold text-orange-800 text-sm">
                      Medianas
                    </div>
                    {PRODUCTS_CATALOG.filter(
                      (p) => p.chamoyFlavor === ChamoyFlavor.MANGO && p.size === ProductSize.MEDIANA
                    ).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selected={selectedProduct?.id === product.id}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="text-center bg-orange-100 rounded-lg py-2 mb-2 font-bold text-orange-800 text-sm">
                      Jumbo
                    </div>
                    {PRODUCTS_CATALOG.filter(
                      (p) => p.chamoyFlavor === ChamoyFlavor.MANGO && p.size === ProductSize.JUMBO
                    ).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selected={selectedProduct?.id === product.id}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-2 border-pink-200 rounded-xl p-4 bg-gradient-to-br from-pink-50 to-red-50">
                <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-3 shadow-md">
                  <span className="text-3xl">🍓</span>
                  <h3 className="text-lg font-bold text-red-800">Chamoy Fresa</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <div className="text-center bg-pink-100 rounded-lg py-2 mb-2 font-bold text-red-800 text-sm">
                      Medianas
                    </div>
                    {PRODUCTS_CATALOG.filter(
                      (p) => p.chamoyFlavor === ChamoyFlavor.FRESA && p.size === ProductSize.MEDIANA
                    ).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selected={selectedProduct?.id === product.id}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="text-center bg-pink-100 rounded-lg py-2 mb-2 font-bold text-red-800 text-sm">
                      Jumbo
                    </div>
                    {PRODUCTS_CATALOG.filter(
                      (p) => p.chamoyFlavor === ChamoyFlavor.FRESA && p.size === ProductSize.JUMBO
                    ).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selected={selectedProduct?.id === product.id}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedProduct && (
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-kawaii-rose focus:outline-none transition-colors text-lg font-semibold"
                    required
                  />
                </div>
                <div className="bg-gradient-to-r from-kawaii-pink to-kawaii-purple rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/90 mb-1">Total a Cobrar</p>
                      <p className="text-4xl font-bold">{formatCurrency(calculateTotal())}</p>
                    </div>
                    <div className="text-6xl">💰</div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    <Save className="mr-2" size={20} />
                    Registrar Venta
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="¡Venta Registrada!"
          message="La venta se ha registrado exitosamente"
          icon="🎉"
        />
      </div>
    </div>
  );
};

export default New;
