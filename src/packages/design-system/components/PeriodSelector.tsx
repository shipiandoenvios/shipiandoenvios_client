"use client";

import { useState, useEffect } from "react";
import { useGlobalStore } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/packages/design-system/components/ui/select";
import { CalendarIcon } from "lucide-react";

export function PeriodSelector() {
  const { setCurrentPeriod } = useGlobalStore();

  // Obtener el año y mes actual para validación
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");

  // Inicializar siempre con el periodo actual del sistema
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Generar años disponibles (5 años atrás y hasta el actual)
  const availableYears = Array.from({ length: 6 }, (_, i) =>
    (currentYear - 5 + i).toString()
  );

  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  // Establecer siempre el periodo actual al montar el componente
  useEffect(() => {
    // Siempre usamos el año y mes actuales al cargar la página
    setSelectedYear(currentYear.toString());
    setSelectedMonth(currentMonth);

    // Actualizar el store con el periodo actual
    setCurrentPeriod(`${currentYear}-${currentMonth}`);
  }, []);

  // Actualizar el período en el store cuando cambia la selección
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      setCurrentPeriod(`${selectedYear}-${selectedMonth}`);
    }
  }, [selectedYear, selectedMonth, setCurrentPeriod]);

  // Función para verificar si un mes debe estar deshabilitado
  const isMonthDisabled = (monthValue: string) => {
    // Solo si el año seleccionado es el actual
    if (selectedYear === currentYear.toString()) {
      return parseInt(monthValue) > parseInt(currentMonth);
    }
    return false;
  };

  // Manejar cambio de año para validar meses
  const handleYearChange = (year: string) => {
    setSelectedYear(year);

    // Si seleccionamos el año actual y el mes seleccionado es mayor al actual
    if (
      year === currentYear.toString() &&
      parseInt(selectedMonth) > parseInt(currentMonth)
    ) {
      setSelectedMonth(currentMonth);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2 w-full lg:w-auto lg:mr-2">
      <div className="flex items-center mb-0.5 lg:mb-0 lg:mr-1">
        <CalendarIcon className="hidden lg:inline h-4 w-4 text-[#0F8E95]" />
        <span className="hidden lg:inline text-sm font-medium ml-1 text-[#0F8E95]">
          Período:
        </span>
      </div>

      <div className="flex w-full lg:w-auto gap-2">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full lg:w-[130px] h-9 bg-white border-gray-200 hover:border-[#EFC74F] focus:ring-[#EFC74F] focus:border-[#EFC74F] rounded-lg shadow-sm transition-all duration-200">
            <SelectValue placeholder="Mes" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            {months.map((month) => (
              <SelectItem
                key={month.value}
                value={month.value}
                disabled={isMonthDisabled(month.value)}
                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer rounded data-[state=checked]:bg-[#0F8E95]/10 data-[state=checked]:text-[#0F8E95] data-[state=checked]:font-medium"
              >
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-full lg:w-[90px] h-9 bg-white border-gray-200 hover:border-[#EFC74F] focus:ring-[#EFC74F] focus:border-[#EFC74F] rounded-lg shadow-sm transition-all duration-200">
            <SelectValue placeholder="Año" className="text-gray-700" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            {availableYears.map((year) => (
              <SelectItem
                key={year}
                value={year}
                disabled={parseInt(year) > currentYear}
                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer rounded data-[state=checked]:bg-[#EFC74F]/10 data-[state=checked]:text-[#EFC74F] data-[state=checked]:font-medium"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
