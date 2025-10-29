import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon = '📦', 
  title = 'No hay datos', 
  message = 'Aún no hay información para mostrar',
  actionText,
  actionLink 
}) => {
  // Detectar si el icon es una ruta de imagen
  const isImage = typeof icon === 'string' && (icon.includes('.png') || icon.includes('.jpg') || icon.includes('.svg') || icon.includes('.gif') || icon.includes('.webp'));

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4 animate-bounce">
        {isImage ? (
          <img src={icon} alt={title} className="w-24 h-24 object-contain" />
        ) : (
          <div className="text-8xl">{icon}</div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        {message}
      </p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-6 py-3 bg-gradient-to-r from-kawaii-rose to-kawaii-purple text-white rounded-full font-semibold shadow-kawaii hover:shadow-kawaii-lg transition-all duration-300 transform hover:scale-105"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

