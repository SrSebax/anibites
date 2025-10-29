import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = '¡Éxito!', 
  message = 'La acción se realizó correctamente.',
  icon = '✅',
  autoClose = true,
  autoCloseDelay = 2000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-3">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-center">{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <div className="text-6xl mb-4 animate-bounce">
            {icon}
          </div>
          <p className="text-gray-700 text-lg">{message}</p>
          
          {autoClose && (
            <p className="text-gray-500 text-sm mt-4">
              Este mensaje se cerrará automáticamente
            </p>
          )}

          {!autoClose && (
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              Entendido
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

