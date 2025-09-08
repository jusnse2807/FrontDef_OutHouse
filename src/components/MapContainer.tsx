"use client";

// src/components/MapContainer.tsx
import type React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "16px",
};

const center = {
  lat: 6.2088, // Center the map on El Poblado, Medellín
  lng: -75.5679,
};

const mapOptions = {
  mapId: "ee53c635f9d0620a",
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ color: "#f5f5f4" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#a7f3d0" }],
    },
  ],
};

interface MapContainerProps {
  events: any[];
  passEventsToMap: (events: any) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ passEventsToMap }) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [eventos, setEventos] = useState<any[]>([]);

  const url = "https://back-and-front-nigthlifemedellin.onrender.com/eventos";

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true);
        clearInterval(intervalId);
      }
    }, 100);

    const fetchEvents = async () => {
      console.log("MAPA");

      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          const today = new Date().toISOString().split("T")[0];
          console.log(today);
          const filteredEvents = data.filter(
            (event: any) => event.fecha === today
          );
          console.log(filteredEvents);

          const formattedEvents = filteredEvents.map((event: any) => ({
            id: event.id,
            name: event.nombre,
            date: event.fecha,
            hour: event.hora,
            cover: event.cover,
            discoteca: event.discoteca.fullName,
            redSocial: event.discoteca.redSocial,
            latitud: event.discoteca.latitud,
            longitud: event.discoteca.longitud,
            img: event.discoteca.profileImage || "/defaultrumba.jpg",
          }));

          setEventos(formattedEvents);
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
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-stone-100 via-emerald-50 to-green-100 p-6 rounded-2xl shadow-2xl border border-emerald-200/50">
        <LoadScript googleMapsApiKey="AIzaSyDLzZMfEaVuDdL73BDqlleX9wFGQaEJ2EI">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={mapOptions}
          >
            {isGoogleMapsLoaded &&
              eventos.map((event) => (
                <Marker
                  key={event.id}
                  position={{
                    lat: Number(event.latitud),
                    lng: Number(event.longitud),
                  }}
                  icon={{
                    url: event.img,
                    scaledSize: new window.google.maps.Size(50, 50),
                  }}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}

            {selectedEvent && (
              <div className="fixed top-4 right-4 bg-white p-4 rounded-xl shadow-xl border border-emerald-200 max-w-sm z-10">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-stone-800">
                    {selectedEvent.name}
                  </h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-stone-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
                <p className="text-stone-600 text-sm mb-2">
                  {selectedEvent.discoteca}
                </p>
                <p className="text-emerald-600 font-semibold">
                  ${selectedEvent.cover}
                </p>
              </div>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapContainer;
