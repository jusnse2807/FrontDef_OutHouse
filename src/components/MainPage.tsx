"use client";

// src/App.tsx
import type React from "react";
import { useState } from "react";
import NavBar from "./NavBar";
import TodayEvents from "./TodayEvents";
import FutureEvents from "./FutureEvents";
import EventPopup from "./EventPopup";
import MapContainer from "./MapContainer";
import DateTimeDisplay from "./dateTimeDisplay";

export const MainPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventsForMap, setEventsForMap] = useState<any>([]); // Store events for MapContainer

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  // Function to pass events from TodayEvents and FutureEvents to MapContainer
  const passEventsToMap = (events: any) => {
    setEventsForMap(events); // Merge future and today events
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50/40 to-orange-50/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,113,108,0.08)_1px,transparent_0)] bg-[length:32px_32px]"></div>

      <div className="relative z-10">
        <NavBar />

        <main className="container mx-auto px-6 py-12 space-y-16 max-w-7xl">
          <section className="bg-gradient-to-r from-stone-50/95 to-amber-50/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-stone-200/50 hover:shadow-2xl transition-all duration-300">
            <DateTimeDisplay />
          </section>

          <div className="grid gap-12">
            <section
              id="today-events"
              className="group relative overflow-hidden bg-gradient-to-br from-stone-600/95 to-stone-700/95 backdrop-blur-md rounded-3xl shadow-xl border border-stone-500/40 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-12 bg-gradient-to-b from-amber-300 to-orange-400 rounded-full shadow-lg"></div>
                  <div>
                    <h2 className="text-amber-100 text-5xl font-bold mb-2 text-balance tracking-tight">
                      Eventos de Hoy
                    </h2>
                    <p className="text-amber-200/80 text-lg font-medium">
                      Descubre lo que está pasando ahora
                    </p>
                  </div>
                </div>
                <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/20">
                  <TodayEvents
                    onEventClick={handleEventClick}
                    passEventsToMap={passEventsToMap}
                  />
                </div>
              </div>
            </section>

            <section
              id="map-section"
              className="group relative overflow-hidden bg-gradient-to-br from-amber-700/95 to-orange-800/95 backdrop-blur-md rounded-3xl shadow-xl border border-amber-600/40 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-12 bg-gradient-to-b from-stone-300 to-stone-400 rounded-full shadow-lg"></div>
                  <div>
                    <h2 className="text-stone-100 text-5xl font-bold mb-2 text-balance tracking-tight">
                      Mapa de Eventos
                    </h2>
                    <p className="text-stone-200/80 text-lg font-medium">
                      Explora eventos cerca de ti
                    </p>
                  </div>
                </div>
                <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 border border-stone-200/20 min-h-[400px]">
                  <MapContainer
                    events={eventsForMap}
                    passEventsToMap={passEventsToMap}
                  />
                </div>
              </div>
            </section>

            <section
              id="future-events"
              className="group relative overflow-hidden bg-gradient-to-br from-purple-600/95 to-purple-700/95 backdrop-blur-md rounded-3xl shadow-xl border border-purple-500/40 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-12 bg-gradient-to-b from-amber-300 to-orange-400 rounded-full shadow-lg"></div>
                  <div>
                    <h2 className="text-amber-100 text-5xl font-bold mb-2 text-balance tracking-tight">
                      Próximos Eventos
                    </h2>
                    <p className="text-amber-200/80 text-lg font-medium">
                      Planifica tu agenda cultural
                    </p>
                  </div>
                </div>
                <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/20">
                  <FutureEvents
                    onEventClick={handleEventClick}
                    passEventsToMap={passEventsToMap}
                  />
                </div>
              </div>
            </section>
          </div>

          {showPopup && selectedEvent && (
            <EventPopup
              flyer={selectedEvent.img}
              name={selectedEvent.name}
              description={`Evento en ${
                selectedEvent.venue || selectedEvent.discoteca
              }`}
              location={selectedEvent.venue || selectedEvent.discoteca}
              cover={selectedEvent.cover}
              hora={selectedEvent.hour}
              onClose={() => setShowPopup(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
};
