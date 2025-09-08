"use client";

// src/components/DateTimeDisplay.tsx
import type React from "react";
import { useState, useEffect } from "react";

const DateTimeDisplay: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the date and time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const dateString = currentDateTime.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = currentDateTime.toLocaleTimeString("es-CO");

  return (
    <div className="bg-gradient-to-br from-stone-700 via-amber-800 to-stone-800 p-8 rounded-2xl shadow-2xl border border-stone-500/30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-amber-200 tracking-wide uppercase">
            Fecha de Hoy
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto"></div>
        </div>

        <p className="text-4xl font-extrabold text-amber-200 tracking-tight leading-tight">
          {dateString}
        </p>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-amber-200 tracking-wide uppercase">
            Hora Actual
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full mx-auto"></div>
        </div>

        <p className="text-5xl font-extrabold text-orange-200 tracking-tight font-mono">
          {timeString}
        </p>

        <div className="mt-8 p-4 bg-black/20 rounded-xl border border-stone-500/30">
          <p className="text-lg text-amber-100 font-serif italic leading-relaxed">
            "La vida es una celebración, encuentra tu evento perfecto en
            Medellín"
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
