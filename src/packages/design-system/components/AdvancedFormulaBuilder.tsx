"use client";

import React, { useState, useEffect } from "react";
import FormulaBuilder from "./FormulaBuilder";
import FormulaPreview from "./FormulaPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { validateFormula } from "../../../utils/formulaValidator";

interface Field {
  id: string;
  name: string;
  label: string;
  type: string;
}

interface AdvancedFormulaBuilderProps {
  fields: Field[];
  initialFormula?: string;
  onSave?: (formula: string) => void;
}

const AdvancedFormulaBuilder: React.FC<AdvancedFormulaBuilderProps> = ({
  fields,
  initialFormula = "",
  onSave,
}) => {
  const [currentFormula, setCurrentFormula] = useState<string>(initialFormula);
  const [isFormulaValid, setIsFormulaValid] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("editor");

  // Validar la fórmula inicial
  useEffect(() => {
    if (initialFormula) {
      const fieldNames = fields.map((field) => field.name);
      const { isValid } = validateFormula(initialFormula, fieldNames);
      setIsFormulaValid(isValid);
    }
  }, [initialFormula, fields]);

  // Manejar cambios en la fórmula
  const handleFormulaChange = (formula: string, isValid: boolean) => {
    setCurrentFormula(formula);
    setIsFormulaValid(isValid);
  };

  // Convertir campos al formato esperado por FormulaBuilder
  const formulaBuilderFields = fields.map((field) => ({
    id: field.id,
    name: field.name,
    label: field.label,
  }));

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="editor"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="editor">Editor de Fórmulas</TabsTrigger>
          <TabsTrigger value="preview">Vista Previa</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="pt-4">
          <FormulaBuilder
            fields={formulaBuilderFields}
            initialFormula={currentFormula}
            onChange={handleFormulaChange}
          />
        </TabsContent>

        <TabsContent value="preview" className="pt-4">
          <FormulaPreview formula={currentFormula} fields={fields} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFormulaBuilder;
