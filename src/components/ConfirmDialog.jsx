import { X } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '¿Estás seguro?', 
  message = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger' // danger, success, info
}) => {
  if (!isOpen) return null;

  const typeColors = {
    danger: 'from-red-500 to-red-600',
    success: 'from-green-500 to-green-600',
    info: 'from-kawaii-rose to-kawaii-purple'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className={`bg-gradient-to-r ${typeColors[type]} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">{message}</p>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-3 bg-gradient-to-r ${typeColors[type]} text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

