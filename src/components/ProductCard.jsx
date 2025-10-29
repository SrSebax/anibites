import { Check } from 'lucide-react';

const ProductCard = ({ product, onSelect, selected = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <button
      onClick={() => onSelect(product)}
      className={`relative w-full rounded-xl transition-all duration-300 transform hover:scale-102 overflow-hidden ${
        selected
          ? 'ring-4 ring-kawaii-rose shadow-kawaii-lg scale-102'
          : 'shadow-md hover:shadow-lg'
      }`}
    >
      {/* Background con gradiente */}
      <div className={`${product.getColor()} p-5`}>
        
        {/* Iconos grandes arriba */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl drop-shadow-lg">{product.getIcon()}</span>
          <span className="text-4xl drop-shadow-lg">{product.getChamoyIcon()}</span>
        </div>

        {/* Información del producto - Jerarquía clara */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 mb-3">
          {/* Tamaño - Lo más importante */}
          <h3 className="text-gray-800 font-bold text-xl mb-2">
            {product.getSizeName()}
          </h3>
          
          {/* Variedad */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{product.getIcon()}</span>
            <p className="text-gray-700 font-semibold text-base">
              {product.getVarietyName()}
            </p>
          </div>
          
          {/* Sabor chamoy */}
          <div className="flex items-center justify-center gap-2 pb-3 border-b border-gray-200">
            <span className="text-xl">{product.getChamoyIcon()}</span>
            <p className="text-gray-600 text-sm">
              Chamoy {product.getChamoyFlavorName()}
            </p>
          </div>

          {/* Precio destacado */}
          <div className="mt-3">
            <p className="text-kawaii-rose text-3xl font-bold">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        {/* Indicador de selección */}
        {selected && (
          <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4">
            <Check size={20} className="text-white" strokeWidth={3} />
            <span className="text-white font-bold text-sm">SELECCIONADO</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProductCard;

