import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { evaluateFormula } from "../../../utils/formulaValidator";

interface Field {
  id: string;
  name: string;
  type: string;
}

interface FormulaPreviewProps {
  formula: string;
  fields: Field[];
}

const FormulaPreview: React.FC<FormulaPreviewProps> = ({ formula, fields }) => {
  const [exampleValues, setExampleValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Generar valores de ejemplo para cada campo cuando cambian los campos
  useEffect(() => {
    const initialValues: Record<string, any> = {};

    fields.forEach((field) => {
      // Generar valores de ejemplo según el tipo de campo
      if (field.type === "number") {
        initialValues[field.id] = Math.floor(Math.random() * 100);
      } else if (field.type === "boolean") {
        initialValues[field.id] = Math.random() > 0.5;
      } else {
        initialValues[field.id] = `Ejemplo ${field.name}`;
      }
    });

    setExampleValues(initialValues);
  }, [fields]);

  // Evaluar la fórmula cuando cambian los valores de ejemplo
  useEffect(() => {
    if (formula && fields.length > 0) {
      try {
        setIsEvaluating(true);
        // Usar la función actualizada con los tres parámetros
        const result = evaluateFormula(formula, fields, exampleValues);
        setResult(result);
        setError(null);
      } catch (error) {
        console.error("Error evaluando fórmula:", error);
        setResult(null);
        setError("Error al evaluar la fórmula con los valores de ejemplo");
      } finally {
        setIsEvaluating(false);
      }
    }
  }, [formula, exampleValues, fields]);

  // Manejar cambios en los valores de ejemplo
  const handleValueChange = (fieldId: string, value: string) => {
    setExampleValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // Generar nuevos valores aleatorios
  const handleGenerateRandomValues = () => {
    const newValues: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.type === "number") {
        newValues[field.id] = Math.floor(Math.random() * 100);
      } else if (field.type === "boolean") {
        newValues[field.id] = Math.random() > 0.5;
      } else {
        newValues[field.id] = `Ejemplo ${field.name}`;
      }
    });

    setExampleValues(newValues);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Vista previa de la fórmula</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="font-mono text-sm">
              {formula || "No hay fórmula definida"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={`field-${field.id}`}>{field.name}</Label>
                <Input
                  id={`field-${field.id}`}
                  value={
                    exampleValues[field.id] !== undefined
                      ? String(exampleValues[field.id])
                      : ""
                  }
                  onChange={(e) => handleValueChange(field.id, e.target.value)}
                  className="font-mono"
                />
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleGenerateRandomValues}
            className="w-full"
          >
            Generar valores aleatorios
          </Button>

          <div className="bg-muted p-4 rounded-md mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Resultado:</h3>
              {isEvaluating && (
                <span className="text-sm text-muted-foreground">
                  Evaluando...
                </span>
              )}
            </div>

            {error ? (
              <div className="text-destructive mt-2 text-sm">{error}</div>
            ) : (
              <div className="font-mono font-semibold text-lg mt-2">
                {result !== null ? result : "—"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaPreview;
