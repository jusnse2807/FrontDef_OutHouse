"use client";

// src/components/EventPopup.tsx
import type React from "react";

interface EventDetails {
  flyer: string;
  name: string;
  description: string;
  location: string;
  cover: string;
  hora: string;
  onClose: () => void;
}

const EventPopup: React.FC<EventDetails> = ({
  flyer,
  name,
  description,
  location,
  onClose,
  cover,
  hora,
}) => {
  return (
    <div className="fixed inset-0 flex justify-end bg-black/80 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 text-stone-800 shadow-2xl transform transition-all duration-500 ease-out translate-x-0 border-l-4 border-amber-600">
        <div className="p-8 space-y-6 h-full overflow-y-auto">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-stone-800 leading-tight">
                {name}
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-red-500 transition-colors duration-200 text-3xl font-light hover:rotate-90 transform transition-transform"
            >
              ×
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={flyer || "/placeholder.svg"}
              alt={name}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="space-y-4">
            {description && (
              <div className="bg-white/60 p-4 rounded-xl border border-amber-200">
                <p className="text-stone-700 leading-relaxed">{description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Ubicación
                    </p>
                    <p className="font-semibold text-green-800">{location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-700">
                      Precio de Entrada
                    </p>
                    <p className="font-semibold text-orange-800">${cover}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🕐</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700">
                      Hora de Inicio
                    </p>
                    <p className="font-semibold text-purple-800">{hora}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={onClose}
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
