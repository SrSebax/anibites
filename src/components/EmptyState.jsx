import { Link } from 'react-router-dom';

const EmptyState = ({ 
  IconComponent,
  title = 'No hay datos', 
  message = 'Aún no hay información para mostrar',
  actionText,
  actionLink 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {IconComponent && (
        <div className="mb-6 bg-gradient-to-br from-kawaii-pink/20 to-kawaii-purple/20 rounded-full p-8">
          <IconComponent size={64} className="text-kawaii-rose" strokeWidth={1.5} />
        </div>
      )}
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
