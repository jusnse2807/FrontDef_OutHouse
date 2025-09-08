"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface eventPopupProps {
  message: string;
  onClose: () => void;
}

const EventPopup: React.FC<eventPopupProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
      <div className="bg-white border border-orange-200 p-8 rounded-2xl shadow-2xl relative max-w-md mx-4 transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
        >
          ×
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ¡Evento creado exitosamente!
          </h3>
          <p className="text-gray-600 font-medium">"{message}"</p>
        </div>
      </div>
    </div>
  );
};

export const AddEvent = () => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cover, setCover] = useState("");

  const [eventPopup, setEventPopup] = useState(false);

  const empresaId = localStorage.getItem("empresaId");

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const url = "https://back-and-front-nigthlifemedellin.onrender.com/eventos";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        fecha,
        hora,
        cover,
        discotecaId: empresaId,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
        });

        setEventPopup(true);
      } else {
        alert("Evento no puedo ser agregado");

        console.log(empresaId);
      }
    });
  };

  const profile = () => {
    navigate("/editarPerfilUsuario");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-orange-50">
      <div className="pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-700 mb-2 tracking-tight">
              Crear Nuevo Evento
            </h1>
            <p className="text-lg text-stone-600 font-medium">
              Comparte tu evento con la comunidad de Medellín
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Información del Evento
                </h2>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label
                    className="block text-sm font-semibold text-stone-700 mb-3"
                    htmlFor="nombreEvento"
                  >
                    Nombre del evento
                  </label>
                  <input
                    type="text"
                    id="nombreEvento"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-stone-700 font-medium"
                    placeholder="Ej: Concierto de Rock en el Parque"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-semibold text-stone-700 mb-3"
                      htmlFor="fecha"
                    >
                      Fecha del evento
                    </label>
                    <input
                      type="date"
                      id="fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-stone-700 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold text-stone-700 mb-3"
                      htmlFor="hora"
                    >
                      Hora de inicio
                    </label>
                    <input
                      type="time"
                      id="hora"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-stone-700 font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-stone-700 mb-3"
                    htmlFor="cover"
                  >
                    Precio de entrada
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-500 font-medium">
                      $
                    </span>
                    <input
                      type="text"
                      id="cover"
                      value={cover}
                      onChange={(e) => setCover(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-stone-700 font-medium"
                      placeholder="0 (Gratis) o 50000"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6">
              <h3 className="text-lg font-bold text-stone-700 mb-4">
                Acciones
              </h3>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Crear Evento</span>
                </div>
              </button>

              <button
                onClick={profile}
                className="w-full bg-stone-600 hover:bg-stone-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 border-2 border-transparent hover:border-stone-500"
              >
                Editar Perfil de Empresa
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-200 p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Tip</h4>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Asegúrate de incluir toda la información importante para que
                    los asistentes puedan planificar su visita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {eventPopup && (
        <EventPopup message={nombre} onClose={() => setEventPopup(false)} />
      )}
    </div>
  );
};
