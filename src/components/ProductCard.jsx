import { ICONS } from '../config/icons';

const ProductCard = ({ product, onSelect, selected = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const IconComponent = product.getIconComponent();

  return (
    <button
      onClick={() => onSelect(product)}
      className={`w-full p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
        selected
          ? 'ring-4 ring-kawaii-rose shadow-kawaii-lg scale-105'
          : 'shadow-lg hover:shadow-kawaii'
      } ${product.getColor()}`}
    >
      <div className="text-center">
        {/* Icono del producto */}
        <div className="flex justify-center mb-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            {IconComponent && <IconComponent size={48} className="text-white" strokeWidth={2} />}
          </div>
        </div>

        {/* Nombre del producto */}
        <h3 className="text-white font-bold text-lg mb-2">
          {product.getSizeName()}
        </h3>
        <p className="text-white/90 font-medium mb-3">
          {product.getVarietyName()}
        </p>

        {/* Precio */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
          <p className="text-white text-2xl font-bold">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Indicador de selección */}
        {selected && (
          <div className="flex items-center justify-center text-white">
            <ICONS.shopping className="mr-2" size={20} />
            <span className="font-semibold">Seleccionado</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProductCard;
