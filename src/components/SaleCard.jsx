import { ICONS } from '../config/icons';

const SaleCard = ({ sale, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const IconComponent = sale.product.getIconComponent();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-kawaii transition-all duration-300 overflow-hidden">
      {/* Header con gradiente */}
      <div className={`${sale.product.getColor()} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              {IconComponent && <IconComponent size={24} className="text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-white/90 text-sm">{sale.product.getVarietyName()}</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(sale.id)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            aria-label="Eliminar venta"
          >
            <ICONS.delete size={20} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Cantidad */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <ICONS.package className="mr-2" size={18} />
            <span>Cantidad:</span>
          </div>
          <span className="font-bold text-kawaii-rose text-xl">
            {sale.quantity} {sale.quantity === 1 ? 'unidad' : 'unidades'}
          </span>
        </div>

        {/* Fecha */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <ICONS.calendar className="mr-2" size={16} />
            <span>{sale.getFormattedDate()}</span>
          </div>
          <div className="flex items-center">
            <ICONS.clock className="mr-2" size={16} />
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
            <span className="text-2xl font-bold text-kawaii-rose flex items-center gap-1">
              <ICONS.money size={20} />
              {formatPrice(sale.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
