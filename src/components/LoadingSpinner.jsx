const LoadingSpinner = ({ size = 'md', message = 'Cargando...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-kawaii-pink/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-kawaii-rose border-t-transparent animate-spin"></div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

