import { memo } from 'react';
import { Check } from 'lucide-react';

const ProductCard = memo(({ product, onSelect, selected = false }) => {
  const formatPrice = (price, isMobile = false) => {
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
    
    // En móvil, usar formato más compacto: "$10.000" en lugar de "$ 10.000"
    if (isMobile) {
      return formatted.replace(/\s+/g, '');
    }
    return formatted;
  };

  return (
    <button
      onClick={() => onSelect(product)}
      className={`relative w-full rounded-xl transition-all duration-300 transform hover:scale-102 overflow-hidden min-w-0 ${
        selected
          ? 'ring-4 ring-kawaii-rose shadow-kawaii-lg scale-102'
          : 'shadow-md hover:shadow-lg'
      }`}
      style={{ minHeight: 0 }}
    >
      {/* Background con gradiente */}
      <div className={`${product.getColor()} p-2 sm:p-4 md:p-5 w-full`}>
        
        {/* Iconos grandes arriba */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">{product.getIcon()}</span>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-lg">{product.getChamoyIcon()}</span>
        </div>

        {/* Información del producto - Jerarquía clara */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 w-full min-w-0 box-border">
          {/* Tamaño - Lo más importante */}
          <h3 className="text-gray-800 font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 text-center">
            {product.getSizeName()}
          </h3>
          
          {/* Variedad */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl md:text-2xl">{product.getIcon()}</span>
            <p className="text-gray-700 font-semibold text-xs sm:text-sm md:text-base">
              {product.getVarietyName()}
            </p>
          </div>
          
          {/* Sabor chamoy */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 pb-2 sm:pb-3 border-b border-gray-200">
            <span className="text-base sm:text-lg md:text-xl">{product.getChamoyIcon()}</span>
            <p className="text-gray-600 text-xs sm:text-sm leading-tight text-center">
              Chamoy {product.getChamoyFlavorName()}
            </p>
          </div>

          {/* Precio destacado */}
          <div className="mt-2 sm:mt-3 w-full min-w-0 px-0.5 sm:px-1">
            <p className="text-kawaii-rose text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center leading-tight">
              <span className="block sm:hidden">{formatPrice(product.price, true)}</span>
              <span className="hidden sm:block">{formatPrice(product.price, false)}</span>
            </p>
          </div>
        </div>

        {/* Indicador de selección */}
        {selected && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-lg py-1 sm:py-2 px-2 sm:px-4">
            <Check size={16} className="text-white sm:w-5 sm:h-5" strokeWidth={3} />
            <span className="text-white font-bold text-xs sm:text-sm">SELECCIONADO</span>
          </div>
        )}
      </div>
    </button>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

