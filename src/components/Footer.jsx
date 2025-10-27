import { ICONS } from '../config/icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-kawaii-rose to-kawaii-purple text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <img 
            src="/anibites.svg" 
            alt="Anibites Logo" 
            className="h-8 w-8 mr-2"
          />
          <p className="text-lg font-semibold">
            Anibites - Gestión de Ventas
          </p>
        </div>
        <p className="text-white/80 text-sm flex items-center justify-center gap-2">
          Hecho con <ICONS.heart size={16} className="text-red-200 animate-pulse" /> para tu negocio de gomitas enchiladas
        </p>
      </div>
    </footer>
  );
};

export default Footer;
