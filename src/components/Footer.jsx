export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-kawaii-rose to-kawaii-purple text-white py-10 mt-12">
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        {/* Logo */}
        <a
          href="https://www.instagram.com/anibites.udea/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center hover:opacity-90 transition"
        >
          <img
            src="/anibites.svg"
            alt="Anibites Logo"
            className="h-20 w-20 mb-6"
          />
          <div className="mb-3 text-center">
            <p className="text-2xl font-bold tracking-wide">Anibites</p>
            <p className="text-lg mt-1">Creado por Ana Naranjo & Ana Giraldo</p>
          </div>
        </a>

        {/* Desarrollador */}
        <a
          href="https://www.instagram.com/sebax_lond/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center hover:opacity-90 transition"
        >
          <div className="border-t border-white/30 pt-4 w-full max-w-md">
            <p className="text-base text-white/90">
              Desarrollado por{" "}
              <span className="font-semibold">Sebastian Londoño</span>
            </p>
          </div>
        </a>
      </div>
    </footer>
  );
};
