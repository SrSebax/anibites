const StatCard = ({ title, value, icon, color = 'from-kawaii-pink to-kawaii-purple', subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-kawaii transition-all duration-300 overflow-hidden">
      <div className={`bg-gradient-to-br ${color} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-white/90 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-white/80 text-xs mt-1">{subtitle}</p>
            )}
          </div>
          <div className="text-5xl opacity-80">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

