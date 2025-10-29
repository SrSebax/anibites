import { Trash2, Calendar, Clock, Package } from 'lucide-react';

const SaleCard = ({ sale, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-kawaii transition-all duration-300 overflow-hidden">
      {/* Header con gradiente */}
      <div className={`${sale.product.getColor()} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl">{sale.product.getIcon()}</span>
              <span className="text-xl">{sale.product.getChamoyIcon()}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">{sale.product.getSizeName()} - {sale.product.getVarietyName()}</h3>
              <p className="text-white/90 text-sm">Chamoy {sale.product.getChamoyFlavorName()}</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(sale.id)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            aria-label="Eliminar venta"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Cantidad */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Package className="mr-2" size={18} />
            <span>Cantidad:</span>
          </div>
          <span className="font-bold text-kawaii-rose text-xl">
            {sale.quantity} {sale.quantity === 1 ? 'unidad' : 'unidades'}
          </span>
        </div>

        {/* Fecha */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="mr-2" size={16} />
            <span>{sale.getFormattedDate()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" size={16} />
            <span>{sale.getFormattedTime()}</span>
          </div>
        </div>

        {/* Notas */}
        {sale.notes && (
          <div className="bg-kawaii-cream rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Nota:</span> {sale.notes}
            </p>
          </div>
        )}

        {/* Total */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-semibold">Total:</span>
            <span className="text-2xl font-bold text-kawaii-rose">
              {formatPrice(sale.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;

