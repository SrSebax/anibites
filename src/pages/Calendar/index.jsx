import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { SaleCard, ConfirmDialog, SuccessModal } from '../../components';
import { SalesService } from '../../services';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [salesByDate, setSalesByDate] = useState({});
  const [selectedDaySales, setSelectedDaySales] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  useEffect(() => {
    loadMonthSales();
  }, [currentDate]);

  useEffect(() => {
    loadSelectedDaySales();
  }, [selectedDate, salesByDate]);

  const loadMonthSales = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const sales = SalesService.getSalesByDateRange(firstDay, lastDay);

    // Agrupar ventas por fecha
    const grouped = {};
    sales.forEach(sale => {
      const dateKey = sale.date.toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          sales: [],
          total: 0,
          quantity: 0
        };
      }
      grouped[dateKey].sales.push(sale);
      grouped[dateKey].total += sale.total;
      grouped[dateKey].quantity += sale.quantity;
    });

    setSalesByDate(grouped);
  };

  const loadSelectedDaySales = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const daySales = salesByDate[dateKey]?.sales || [];
    setSelectedDaySales(daySales);
  };

  const handleDeleteSale = (id) => {
    setSaleToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (saleToDelete) {
      SalesService.deleteSale(saleToDelete);
      loadMonthSales();
      setSaleToDelete(null);
      setShowSuccessModal(true);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getDaySales = (day) => {
    const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString()
      .split('T')[0];
    return salesByDate[dateKey];
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-cream via-kawaii-pink/10 to-kawaii-purple/10 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kawaii-rose to-kawaii-purple mb-2 flex items-center justify-center">
            <CalendarIcon className="mr-3 text-kawaii-rose" size={40} />
            Calendario de Ventas
          </h1>
          <p className="text-gray-600">
            Visualiza y gestiona tus ventas por día
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-kawaii-pink/20 rounded-lg transition-colors"
                >
                  <ChevronLeft className="text-kawaii-rose" size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {monthName}
                </h2>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-kawaii-pink/20 rounded-lg transition-colors"
                >
                  <ChevronRight className="text-kawaii-rose" size={24} />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const daySales = getDaySales(day);
                  const hasActiveSales = daySales && daySales.sales.length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                      className={`aspect-square rounded-lg p-2 transition-all duration-200 ${
                        isSelectedDate(day)
                          ? 'bg-gradient-to-br from-kawaii-rose to-kawaii-purple text-white shadow-kawaii scale-105'
                          : isToday(day)
                          ? 'bg-kawaii-pink text-white'
                          : hasActiveSales
                          ? 'bg-kawaii-pink/20 hover:bg-kawaii-pink/30'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-sm font-bold">{day}</div>
                      {hasActiveSales && (
                        <div className="text-xs mt-1">
                          <div className={isSelectedDate(day) ? 'text-white' : 'text-kawaii-rose'}>
                            {daySales.quantity}📦
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Day Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {selectedDate.toLocaleDateString('es-CO', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>

              {selectedDaySales.length > 0 ? (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="bg-gradient-to-r from-kawaii-pink to-kawaii-purple rounded-lg p-4 text-white">
                    <p className="text-sm text-white/90 mb-1">Total del Día</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(SalesService.calculateTotal(selectedDaySales))}
                    </p>
                    <p className="text-sm text-white/90 mt-2">
                      {selectedDaySales.length} {selectedDaySales.length === 1 ? 'venta' : 'ventas'}
                    </p>
                  </div>

                  {/* Sales count by product */}
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold mb-2">Resumen:</p>
                    {SalesService.getProductStats(selectedDaySales).map((stat) => (
                      <div key={stat.product.id} className="flex justify-between items-center py-1">
                        <span>{stat.product.getIcon()} {stat.product.name} x{stat.quantity}</span>
                        <span className="font-semibold">{formatCurrency(stat.total)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-4xl mb-2">📭</p>
                  <p className="text-gray-500">No hay ventas este día</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sales List for Selected Day */}
        {selectedDaySales.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ventas del Día Seleccionado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDaySales.map((sale) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onDelete={handleDeleteSale}
                />
              ))}
            </div>
          </div>
        )}

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

export default Calendar;

