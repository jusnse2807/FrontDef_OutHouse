// src/components/NavBar.tsx
import type React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-stone-700 via-stone-600 to-amber-800 p-6 shadow-2xl border-b-4 border-stone-500/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Loopa
          </h1>
        </div>

        <ul className="flex space-x-8">
          <li>
            <a
              href="#today-events"
              className="text-white/90 hover:text-amber-300 transition-all duration-300 font-medium text-lg relative group"
            >
              Eventos Hoy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#map-section"
              className="text-white/90 hover:text-amber-300 transition-all duration-300 font-medium text-lg relative group"
            >
              Mapa
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#future-events"
              className="text-white/90 hover:text-amber-300 transition-all duration-300 font-medium text-lg relative group"
            >
              Próximos Eventos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
