// src/components/InfoWindowComponent.tsx
import type React from "react";
import { InfoWindow } from "@react-google-maps/api";

interface InfoWindowComponentProps {
  discoteca: string;
  name: string;
  description: string;
  cover: number | null; // Cover charge can be null if no cover
  flyer: string; // Path to the event flyer
  onClose: () => void;
  position: { lat: number; lng: number };
}

const InfoWindowComponent: React.FC<InfoWindowComponentProps> = ({
  discoteca,
  name,
  description,
  cover,
  flyer,
  onClose,
  position,
}) => {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className="p-4 text-white bg-gradient-to-r from-stone-800 via-amber-700 to-stone-800 rounded-lg shadow-lg max-w-xs border border-amber-200/30">
        {/* Event Flyer */}
        <img
          src={flyer || "/placeholder.svg"}
          alt={name}
          className="w-full h-32 object-cover rounded-lg mb-2"
        />

        {/* Venue Name */}
        <h2 className="text-2xl font-extrabold text-amber-200 mb-1">
          {discoteca}
        </h2>

        {/* Event Name */}
        <h3 className="text-xl font-bold text-orange-300 mb-2">{name}</h3>

        {/* Description */}
        <p className="text-stone-200 mb-4">{description}</p>

        {/* Price and Cover Details */}
        <div className="flex items-center justify-between">
          {/* Cover Charge */}
          <div className="text-orange-400 text-lg">
            {cover ? (
              <span>Entrada: ${cover}</span>
            ) : (
              <span>Entrada libre</span>
            )}
          </div>
        </div>

        {/* Event Flair */}
        <div className="mt-4">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wider">
            Evento
          </span>
        </div>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowComponent;
