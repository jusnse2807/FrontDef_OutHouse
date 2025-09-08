"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ReservasPage: React.FC = () => {
  const navigate = useNavigate();
  const [numPeople, setNumPeople] = useState<number>(1);
  const [horaReserva, setHoraReserva] = useState<string>("");

  const [evento, setEvento] = useState<any | null>(null);

  const baseUrl = "https://loopa-back.onrender.com/eventos/";
  const eventId = localStorage.getItem("eventId");
  const url = `${baseUrl}${eventId}`;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error obteniendo el evento: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Evento obtenido:", data);

        const formattedEvent = {
          id: data.id,
          name: data.nombre,
          date: data.fecha,
          hour: data.hora,
          cover: data.cover,
          //discoteca: data.discoteca.fullName,
          //redSocial: data.discoteca.redSocial,
          //latitud: data.discoteca.latitud,
          //longitud: data.discoteca.longitud,
          //flyer: data.discoteca.profileImage || "/defaultrumba.jpg",
          description: data.descripcion || "Un evento increíble 🎶✨",
        };

        setEvento(formattedEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [url]);

  const handleReserva = () => {
    if (!evento) return;

    console.log("Reserva realizada:", {
      evento: evento.name,
      numPeople,
      horaReserva,
    });

    // TODO: post reservation to backend here

    navigate("/");
  };

  if (!evento) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-stone-600">Cargando evento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50/40 to-orange-50/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,113,108,0.08)_1px,transparent_0)] bg-[length:32px_32px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-3xl">
        {/* Event Info */}
        <div className="bg-gradient-to-br from-stone-50/95 to-amber-50/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-stone-200/50 mb-10">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">
            Reserva para {evento.name}
          </h1>
          <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6">
            <img
            //  src={evento.flyer}
            //  alt={evento.name}
            //  className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          <p className="text-stone-700 mb-2">{evento.description}</p>
          <p className="text-stone-800 font-semibold">
            📍 {evento.discoteca} | 🕐 {evento.hour} | 💰 ${evento.cover}
          </p>
        </div>

        {/* Reservation Form */}
        <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-8 rounded-2xl border border-purple-300 shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            Detalles de tu Reserva
          </h2>

          <div className="space-y-6">
            {/* Number of people */}
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">
                Número de personas
              </label>
              <input
                type="number"
                min="1"
                value={numPeople}
                onChange={(e) => setNumPeople(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">
                Hora de la Reserva
              </label>
              <input
                type="time"
                value={horaReserva}
                onChange={(e) => setHoraReserva(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Reservar Button */}
            <button
              onClick={handleReserva}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
