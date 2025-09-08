"use client";

// src/components/FutureEvents.tsx
import type React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface FutureEventsProps {
  onEventClick: (event: any) => void;
  passEventsToMap: (events: any) => void;
}

const FutureEvents: React.FC<FutureEventsProps> = ({
  onEventClick,
  passEventsToMap,
}) => {
  const [events, setEvents] = useState<any[]>([]);

  const url = "https://back-and-front-nigthlifemedellin.onrender.com/eventos";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          const today = new Date();
          console.log(today);
          const filteredEvents = data.filter((event: any) => {
            const eventDate = new Date(event.fecha);
            return eventDate > today;
          });
          console.log(filteredEvents);

          const formattedEvents = filteredEvents.map((event: any) => ({
            id: event.id,
            name: event.nombre,
            date: event.fecha,
            hour: event.hora,
            cover: event.cover,
            discoteca: event.discoteca.fullName,
            redSocial: event.discoteca.redSocial,
            img: event.discoteca.profileImage || "/defaultrumba.jpg",
          }));

          setEvents(formattedEvents);
          passEventsToMap(formattedEvents);
        } else {
          throw new Error(
            `Error obteniendo los eventos: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching or processing events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-stone-800 mb-4">
          Próximos Eventos
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="group bg-gradient-to-br from-stone-100 via-purple-50 to-violet-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-purple-200/50 hover:border-purple-300 transform hover:-translate-y-2"
            onClick={() => onEventClick(event)}
          >
            <div className="relative overflow-hidden">
              <img
                src={event.img || "/placeholder.svg"}
                alt={event.discoteca}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Próximamente
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-bold leading-tight mb-1 drop-shadow-lg">
                  {event.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📍</span>
                </div>
                <p className="text-stone-700 font-medium">{event.discoteca}</p>
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📅</span>
                </div>
                <p className="text-stone-700 font-medium">
                  {new Date(event.date).toLocaleDateString("es-CO", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-600 font-semibold">
                    💰 ${event.cover}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600 font-semibold">
                    🕐 {event.hour}
                  </span>
                </div>
              </div>

              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-purple-600 text-sm font-medium text-center">
                  Click para ver detalles →
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-stone-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <p className="text-stone-600 text-lg">
            No hay eventos futuros programados
          </p>
        </div>
      )}
    </div>
  );
};

export default FutureEvents;
