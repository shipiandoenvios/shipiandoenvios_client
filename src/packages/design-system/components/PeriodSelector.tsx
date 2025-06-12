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
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PeriodSelector() {
  const { setCurrentPeriod, currentPeriod } = useGlobalStore();

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
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Establecer siempre el periodo actual al montar
  useEffect(() => {
    // Siempre usamos el año y mes actuales al cargar la página
    setSelectedYear(currentYear.toString());
    setSelectedMonth(currentMonth);

    // Actualizar el store con el periodo actual
    setCurrentPeriod({ month: currentMonth, year: currentYear });
  }, [currentMonth, currentYear, setCurrentPeriod]);

  // Actualizar el período en el store cuando cambia la selección
  useEffect(() => {
    setSelectedYear(currentPeriod.year.toString());
    setSelectedMonth(currentPeriod.month);
  }, [currentPeriod]);

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

    if (
      year === currentYear.toString() &&
      parseInt(selectedMonth) > parseInt(currentMonth)
    ) {
      setSelectedMonth(currentMonth);
    }
  };

  const handlePreviousMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex === 0) {
      setSelectedMonth(months[11]);
      setSelectedYear((parseInt(selectedYear) - 1).toString());
    } else {
      setSelectedMonth(months[currentIndex - 1]);
    }
  };

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex === 11) {
      setSelectedMonth(months[0]);
      setSelectedYear((parseInt(selectedYear) + 1).toString());
    } else {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
      <div className="flex items-center mb-0.5 lg:mb-0 lg:mr-1">
        <CalendarIcon className="hidden lg:inline h-4 w-4 text-[#0F8E95]" />
        <span className="hidden lg:inline text-sm font-medium ml-1 text-[#0F8E95]">
          Período:
        </span>
      </div>

      <div className="flex w-full lg:w-auto gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full lg:w-[130px] h-9 bg-white border-gray-200 hover:border-[#EFC74F] focus:ring-[#EFC74F] focus:border-[#EFC74F] rounded-lg shadow-sm transition-all duration-200">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem
                key={month}
                value={month}
                disabled={isMonthDisabled(month)}
                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer rounded data-[state=checked]:bg-[#0F8E95]/10 data-[state=checked]:text-[#0F8E95] data-[state=checked]:font-medium"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-full lg:w-[100px] h-9 bg-white border-gray-200 hover:border-[#EFC74F] focus:ring-[#EFC74F] focus:border-[#EFC74F] rounded-lg shadow-sm transition-all duration-200">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem
                key={year}
                value={year}
                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer rounded data-[state=checked]:bg-[#0F8E95]/10 data-[state=checked]:text-[#0F8E95] data-[state=checked]:font-medium"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
