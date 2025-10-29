import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { StatCard, SaleCard, EmptyState, ConfirmDialog, SuccessModal } from '../../components';
import { SalesService } from '../../services';

const Home = () => {
  const [todaySales, setTodaySales] = useState([]);
  const [monthSales, setMonthSales] = useState([]);
  const [stats, setStats] = useState({
    todayTotal: 0,
    todayQuantity: 0,
    monthTotal: 0,
    monthQuantity: 0
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const today = SalesService.getTodaySales();
    const month = SalesService.getCurrentMonthSales();

    setTodaySales(today);
    setMonthSales(month);

    setStats({
      todayTotal: SalesService.calculateTotal(today),
      todayQuantity: SalesService.calculateTotalQuantity(today),
      monthTotal: SalesService.calculateTotal(month),
      monthQuantity: SalesService.calculateTotalQuantity(month)
    });
  };

  const handleDeleteSale = (id) => {
    setSaleToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (saleToDelete) {
      SalesService.deleteSale(saleToDelete);
      loadData();
      setSaleToDelete(null);
      setShowSuccessModal(true);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-cream via-kawaii-pink/10 to-kawaii-purple/10">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kawaii-rose to-kawaii-purple mb-2">
            ¡Hola! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Bienvenida a tu panel de ventas de Anibites
          </p>
        </div>

        {/* Quick Action */}
        <div className="mb-8 text-center">
          <Link
            to="/nueva-venta"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-kawaii-rose to-kawaii-purple text-white text-lg font-bold rounded-full shadow-kawaii-lg hover:shadow-kawaii transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-2" size={24} />
            Registrar Nueva Venta
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Ventas de Hoy"
            value={formatCurrency(stats.todayTotal)}
            icon="💰"
            color="from-green-400 to-green-600"
            subtitle={`${stats.todayQuantity} unidades vendidas`}
          />
          <StatCard
            title="Cantidad Hoy"
            value={stats.todayQuantity}
            icon="📦"
            color="from-kawaii-pink to-kawaii-rose"
            subtitle={`${todaySales.length} transacciones`}
          />
          <StatCard
            title="Ventas del Mes"
            value={formatCurrency(stats.monthTotal)}
            icon="📈"
            color="from-kawaii-purple to-purple-600"
            subtitle={`${stats.monthQuantity} unidades vendidas`}
          />
          <StatCard
            title="Total Transacciones"
            value={monthSales.length}
            icon="🎯"
            color="from-kawaii-rose to-pink-600"
            subtitle="Este mes"
          />
        </div>

        {/* Today's Sales */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Calendar className="mr-2 text-kawaii-rose" />
              Ventas de Hoy
            </h2>
            <Link
              to="/calendario"
              className="text-kawaii-rose hover:text-kawaii-purple font-semibold transition-colors"
            >
              Ver Calendario →
            </Link>
          </div>

          {todaySales.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaySales.slice(0, 6).map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onDelete={handleDeleteSale}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="/images/sad.png"
              title="No hay ventas hoy"
              message="¡Comienza registrando tu primera venta del día!"
              actionText="Registrar Venta"
              actionLink="/nueva-venta"
            />
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Best Selling Product */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-kawaii-rose" />
              Producto Más Vendido del Mes
            </h3>
            {(() => {
              const bestProduct = SalesService.getBestSellingProduct(monthSales);
              if (bestProduct) {
                return (
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">
                      {bestProduct.product.getIcon()}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-gray-800">
                        {bestProduct.product.name}
                      </p>
                      <p className="text-gray-600">
                        {bestProduct.quantity} unidades vendidas
                      </p>
                      <p className="text-kawaii-rose font-bold">
                        {formatCurrency(bestProduct.total)}
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <p className="text-gray-500 text-center py-4">
                  No hay datos suficientes
                </p>
              );
            })()}
          </div>

          {/* Average Daily Sales */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <DollarSign className="mr-2 text-kawaii-rose" />
              Promedio de Ventas Diarias
            </h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-kawaii-rose mb-2">
                {formatCurrency(SalesService.getAverageDailySales(monthSales))}
              </p>
              <p className="text-gray-600">por día este mes</p>
            </div>
          </div>
        </div>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={() => {
            setShowConfirmDialog(false);
            setSaleToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar venta?"
          message="¿Estás segura de que deseas eliminar esta venta? Esta acción no se puede deshacer."
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
          type="danger"
        />

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="¡Venta Eliminada!"
          message="La venta se ha eliminado exitosamente"
          icon="🗑️"
        />
      </div>
    </div>
  );
};

export default Home;

