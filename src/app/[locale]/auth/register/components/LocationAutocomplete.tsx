"use client";

import { useEffect, useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { LocateIcon } from "lucide-react";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Place {
  formatted_address?: string;
  address_components?: AddressComponent[];
}

const libraries: ("places")[] = ["places"];

export function LocationAutocomplete({ value = "", onChange, error }: LocationAutocompleteProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace() as Place;
      if (place.formatted_address) {
        const isInArgentina = place.address_components?.some(
          (component) =>
            component.types.includes("country") && component.long_name === "Argentina"
        );

        if (isInArgentina) {
          onChange(place.formatted_address);
          setInputValue(place.formatted_address);
        } else {
          onChange("");
          setInputValue("");
          alert("Por favor, selecciona una ubicación en Argentina");
        }
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LocateIcon className="h-5 w-5 text-[#1E4063]" />
        </div>
        <input
          type="text"
          className="pl-10 block w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-[#7dd3c8] focus:border-transparent var(--font-nunito) transition-all duration-200"
          placeholder="Cargando..."
          disabled
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="location"
        className="block text-sm font-bold text-gray-700 var(--font-nunito)"
      >
        Ubicación
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LocateIcon className="h-5 w-5 text-[#1E4063]" />
        </div>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          restrictions={{ country: "ar" }}
        >
          <input
            id="location"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
            className={`pl-10 block w-full px-4 py-2.5 border ${
              error ? "border-red-300" : "border-gray-200"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-[#7dd3c8] focus:border-transparent var(--font-nunito) transition-all duration-200`}
            placeholder="Córdoba, Argentina"
          />
        </Autocomplete>
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
} 