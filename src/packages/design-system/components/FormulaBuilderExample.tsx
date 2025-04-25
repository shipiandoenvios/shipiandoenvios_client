"use client";

import React, { useState } from "react";
import AdvancedFormulaBuilder from "./AdvancedFormulaBuilder";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner";

// Ejemplo de campos disponibles para la fórmula
const exampleFields = [
  { id: "ventas", name: "ventas", label: "Ventas Totales", type: "number" },
  { id: "costos", name: "costos", label: "Costos Directos", type: "number" },
  { id: "gastos", name: "gastos", label: "Gastos Operativos", type: "number" },
  {
    id: "impuestos",
    name: "impuestos",
    label: "Tasa de Impuestos (%)",
    type: "number",
  },
  { id: "descuentos", name: "descuentos", label: "Descuentos", type: "number" },
];

const FormulaBuilderExample: React.FC = () => {
  const [currentFormula, setCurrentFormula] = useState<string>("");

  // Ejemplo de fórmula inicial
  const initialFormula = "ventas - costos - gastos";

  const handleSaveFormula = (formula: string) => {
    setCurrentFormula(formula);
    toast.success("Fórmula guardada correctamente", {
      description: `Se guardó la fórmula: ${formula}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ejemplo de Constructor de Fórmulas</CardTitle>
        <CardDescription>
          Este ejemplo muestra cómo utilizar el constructor de fórmulas avanzado
          con un conjunto de campos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AdvancedFormulaBuilder
          fields={exampleFields}
          initialFormula={initialFormula}
          onSave={handleSaveFormula}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <span className="text-sm text-muted-foreground">Fórmula actual:</span>
          <p className="font-mono bg-muted p-2 rounded mt-1">
            {currentFormula || "No hay fórmula definida"}
          </p>
        </div>
        <Button onClick={() => handleSaveFormula(currentFormula)}>
          Guardar Fórmula
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormulaBuilderExample;
