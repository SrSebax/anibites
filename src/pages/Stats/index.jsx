import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, Calendar } from 'lucide-react';
import { StatCard, EmptyState } from '../../components';
import { SalesService } from '../../services';

const Stats = () => {
  const [allSales, setAllSales] = useState([]);
  const [monthSales, setMonthSales] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalQuantity: 0,
    monthTotal: 0,
    monthQuantity: 0,
    averageDaily: 0
  });
  const [productStats, setProductStats] = useState([]);
  const [varietyStats, setVarietyStats] = useState([]);
  const [sizeStats, setSizeStats] = useState([]);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = () => {
    const all = SalesService.getAllSales();
    const month = SalesService.getCurrentMonthSales();

    setAllSales(all);
    setMonthSales(month);

    setStats({
      totalSales: SalesService.calculateTotal(all),
      totalQuantity: SalesService.calculateTotalQuantity(all),
      monthTotal: SalesService.calculateTotal(month),
      monthQuantity: SalesService.calculateTotalQuantity(month),
      averageDaily: SalesService.getAverageDailySales(month)
    });

    setProductStats(SalesService.getProductStats(month));
    setVarietyStats(SalesService.getVarietyStats(month));
    setSizeStats(SalesService.getSizeStats(month));

    // Preparar datos para gráfico de ventas diarias (últimos 7 días)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const sales = SalesService.getSalesByDate(date);
      last7Days.push({
        date: date.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric' }),
        total: SalesService.calculateTotal(sales),
        quantity: SalesService.calculateTotalQuantity(sales)
      });
    }
    setDailySalesData(last7Days);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const COLORS = ['#FF69B4', '#DDA0DD', '#FFB6C1', '#FF1493', '#DB7093', '#FFC0CB'];

  if (allSales.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kawaii-cream via-kawaii-pink/10 to-kawaii-purple/10 flex items-center justify-center">
        <EmptyState
          icon="📊"
          title="No hay estadísticas disponibles"
          message="Comienza registrando ventas para ver tus estadísticas"
          actionText="Registrar Primera Venta"
          actionLink="/nueva-venta"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-cream via-kawaii-pink/10 to-kawaii-purple/10 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kawaii-rose to-kawaii-purple mb-2">
            Estadísticas 📊
          </h1>
          <p className="text-gray-600">
            Análisis detallado de tus ventas
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Vendido (Mes)"
            value={formatCurrency(stats.monthTotal)}
            icon="💰"
            color="from-green-400 to-green-600"
          />
          <StatCard
            title="Unidades (Mes)"
            value={stats.monthQuantity}
            icon="📦"
            color="from-kawaii-pink to-kawaii-rose"
          />
          <StatCard
            title="Promedio Diario"
            value={formatCurrency(stats.averageDaily)}
            icon="📈"
            color="from-kawaii-purple to-purple-600"
          />
          <StatCard
            title="Ventas Totales"
            value={monthSales.length}
            icon="🎯"
            color="from-kawaii-rose to-pink-600"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Daily Sales Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="mr-2 text-kawaii-rose" />
              Ventas de los Últimos 7 Días
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'total') return [formatCurrency(value), 'Total'];
                    return [value, 'Unidades'];
                  }}
                />
                <Legend />
                <Bar dataKey="total" fill="#FF69B4" name="Total (COP)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Package className="mr-2 text-kawaii-rose" />
              Distribución por Producto
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productStats}
                  dataKey="quantity"
                  nameKey="product.name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.product.getSizeName()} ${entry.product.getVarietyName()}`}
                >
                  {productStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Stats Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-kawaii-rose" />
            Detalle por Producto (Este Mes)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-kawaii-pink">
                  <th className="text-left py-3 px-4">Producto</th>
                  <th className="text-center py-3 px-4">Ventas</th>
                  <th className="text-center py-3 px-4">Cantidad</th>
                  <th className="text-right py-3 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map((stat, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-kawaii-pink/10 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{stat.product.getIcon()}</span>
                        <div>
                          <p className="font-semibold">{stat.product.name}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(stat.product.price)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 font-semibold">{stat.sales}</td>
                    <td className="text-center py-3 px-4 font-semibold">{stat.quantity}</td>
                    <td className="text-right py-3 px-4 font-bold text-kawaii-rose">
                      {formatCurrency(stat.total)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-kawaii-pink/20 to-kawaii-purple/20 font-bold">
                  <td className="py-3 px-4">TOTAL</td>
                  <td className="text-center py-3 px-4">{monthSales.length}</td>
                  <td className="text-center py-3 px-4">{stats.monthQuantity}</td>
                  <td className="text-right py-3 px-4 text-kawaii-rose">
                    {formatCurrency(stats.monthTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Size and Variety Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Size Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Por Tamaño</h2>
            <div className="space-y-3">
              {sizeStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-kawaii-pink/10 rounded-lg">
                  <div>
                    <p className="font-semibold capitalize">{stat.size}</p>
                    <p className="text-sm text-gray-600">{stat.quantity} unidades</p>
                  </div>
                  <p className="font-bold text-kawaii-rose">{formatCurrency(stat.total)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Variety Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Por Variedad</h2>
            <div className="space-y-3">
              {varietyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-kawaii-purple/10 rounded-lg">
                  <div>
                    <p className="font-semibold capitalize">{stat.variety}</p>
                    <p className="text-sm text-gray-600">{stat.quantity} unidades</p>
                  </div>
                  <p className="font-bold text-kawaii-rose">{formatCurrency(stat.total)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

