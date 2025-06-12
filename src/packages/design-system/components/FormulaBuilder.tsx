"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  validateFormula,
  evaluateFormula,
  getSuggestions,
} from "../../../utils/formulaValidator";
import {
  Plus,
  X,
  Calculator,
  AlertCircle,
  Check,
  Divide,
  Minus,
  Plus as PlusIcon,
  History,
  Trash,
  Clock,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { Tooltip } from "./ui/tooltip";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Componente Progress personalizado si no existe en el design system
const Progress = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className="bg-primary rounded-full h-full transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

interface Field {
  id: string;
  name: string;
  label: string;
}

interface FormulaBuilderProps {
  fields: Field[];
  initialFormula?: string;
  onChange: (formula: string, isValid: boolean) => void;
}

interface PreviewValue {
  fieldId: string;
  value: number;
}

interface FormulaHistoryItem {
  formula: string;
  timestamp: number;
}

const MAX_HISTORY_ITEMS = 5;

// Función para resaltar partes de la fórmula
const highlightFormula = (
  formula: string,
  fields: Field[]
): React.ReactNode => {
  if (!formula) return <></>;

  const fieldNames = fields.map((f) => f.name);
  const operators = ["+", "-", "*", "/", "(", ")"];
  const functions = [
    "sin",
    "cos",
    "tan",
    "sqrt",
    "abs",
    "round",
    "floor",
    "ceil",
    "max",
    "min",
  ];

  // Dividir la fórmula en tokens
  const result: React.ReactNode[] = [];
  let currentToken = "";
  let currentType: "field" | "operator" | "function" | "number" | "text" =
    "text";

  const addToken = () => {
    if (!currentToken) return;

    let className = "";
    switch (currentType) {
      case "field":
        className = "text-blue-600 font-medium";
        break;
      case "operator":
        className = "text-purple-600 font-bold";
        break;
      case "function":
        className = "text-green-600 font-medium";
        break;
      case "number":
        className = "text-amber-600";
        break;
      default:
        className = "";
    }

    result.push(
      <span key={result.length} className={className}>
        {currentToken}
      </span>
    );
    currentToken = "";
    currentType = "text";
  };

  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];

    // Detectar operadores
    if (operators.includes(char)) {
      addToken();
      result.push(
        <span key={result.length} className="text-purple-600 font-bold">
          {char}
        </span>
      );
      continue;
    }

    // Detectar números
    if (/[0-9.]/.test(char)) {
      if (currentType !== "number") {
        addToken();
        currentType = "number";
      }
      currentToken += char;
      continue;
    }

    // Detectar funciones y campos (empiezan con letras)
    if (/[a-zA-Z_]/.test(char)) {
      if (currentType !== "field" && currentType !== "function") {
        addToken();
        // Verificamos si es parte de una función conocida
        const possibleFunction =
          formula.substring(i).match(/^([a-zA-Z_][a-zA-Z0-9_]*)/)?.[1] || "";
        if (functions.some((f) => f === possibleFunction)) {
          currentType = "function";
        } else if (fieldNames.some((f) => f === possibleFunction)) {
          currentType = "field";
        } else {
          currentType = "text";
        }
      }
      currentToken += char;
      continue;
    }

    // Espacios y otros caracteres
    if (/\s/.test(char)) {
      addToken();
      result.push(<span key={result.length}>{char}</span>);
    } else {
      if (currentType === "text") {
        currentToken += char;
      } else {
        addToken();
        currentToken += char;
      }
    }
  }

  // Añadir el último token
  addToken();

  return <>{result}</>;
};

const FormulaBuilder: React.FC<FormulaBuilderProps> = ({
  fields,
  initialFormula = "",
  onChange,
}) => {
  const [formula, setFormula] = useState<string>(initialFormula);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [previewValues, setPreviewValues] = useState<PreviewValue[]>([]);
  const [previewResult, setPreviewResult] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [formulaHistory, setFormulaHistory] = useState<FormulaHistoryItem[]>(
    []
  );
  const [formulaComplexity, setFormulaComplexity] = useState<number>(0);
  const [showHighlightedView, setShowHighlightedView] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar historial de fórmulas del localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("formulaHistory");
    if (savedHistory) {
      try {
        setFormulaHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading formula history:", e);
      }
    }
  }, []);

  // Generar valores de ejemplo para la vista previa
  useEffect(() => {
    const newPreviewValues = fields.map((field) => ({
      fieldId: field.name,
      value: Math.floor(Math.random() * 10) + 1, // Valores aleatorios de 1 a 10
    }));
    setPreviewValues(newPreviewValues);
  }, [fields]);

  // Calcular la complejidad de la fórmula
  const calculateComplexity = useCallback(() => {
    if (!formula.trim()) return 0;

    let complexity = 0;

    // Contar operadores
    const operatorsCount = (formula.match(/[+\-*/]/g) || []).length;
    complexity += operatorsCount * 10;

    // Contar paréntesis (indicador de agrupación)
    const parenthesesPairs = Math.min(
      (formula.match(/\(/g) || []).length,
      (formula.match(/\)/g) || []).length
    );
    complexity += parenthesesPairs * 15;

    // Contar funciones
    const functionCalls = (
      formula.match(/\b(sin|cos|tan|sqrt|abs|round|max|min)\(/g) || []
    ).length;
    complexity += functionCalls * 20;

    // Contar campos utilizados
    const fieldNamesUsed = new Set();
    fields.forEach((field) => {
      const regex = new RegExp(`\\b${field.name}\\b`, "g");
      if (formula.match(regex)) {
        fieldNamesUsed.add(field.name);
      }
    });
    complexity += fieldNamesUsed.size * 5;

    // Normalizar a un valor entre 0 y 100
    const result = Math.min(100, complexity);
    setFormulaComplexity(result);
  }, [formula, fields]);

  // Validar la fórmula cuando cambie
  useEffect(() => {
    const fieldNames = fields.map((field) => field.name);
    const { isValid, error } = validateFormula(formula, fieldNames);
    setValidationError(error || null);

    // Calcular complejidad de la fórmula
    calculateComplexity();

    // Mostrar toast con error de validación
    if (error && formula.trim()) {
      toast.error("Error en la fórmula", {
        description: error,
        duration: 3000,
      });
    }

    // Calcular el resultado de la vista previa si la fórmula es válida
    if (isValid && formula.trim() !== "") {
      try {
        const valueMap = previewValues.reduce((acc, item) => {
          acc[item.fieldId] = item.value;
          return acc;
        }, {} as Record<string, number>);

        // Convertir los previewValues a un formato compatible con la nueva función
        const fieldsForEval = fields.map((field) => ({
          id: field.name,
          name: field.label,
          type: "number",
        }));

        // Utilizar la nueva firma de evaluateFormula con los tres parámetros
        const result = evaluateFormula(formula, fieldsForEval, valueMap);
        setPreviewResult(result);
      } catch (err) {
        console.error("Error al evaluar la fórmula:", err);
        setPreviewResult(null);
      }
    } else {
      setPreviewResult(null);
    }

    onChange(formula, isValid);
  }, [formula, fields, onChange, previewValues, calculateComplexity]);

  // Actualizar sugerencias basadas en la posición del cursor
  useEffect(() => {
    if (inputRef.current) {
      const currentTextBeforeCursor = formula.substring(0, cursorPosition);
      const fieldNames = fields.map((field) => field.name);
      const newSuggestions = getSuggestions(
        currentTextBeforeCursor,
        fieldNames
      );

      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    }
  }, [formula, cursorPosition, fields]);

  // Guardar la fórmula en el historial cuando sea válida
  const saveToHistory = (formulaText: string) => {
    if (!formulaText.trim() || validationError) return;

    setFormulaHistory((prev) => {
      // Comprobar si la fórmula ya está en el historial
      const exists = prev.some((item) => item.formula === formulaText);
      if (exists) return prev;

      // Añadir la nueva fórmula al inicio y limitar el tamaño
      const newHistory = [
        { formula: formulaText, timestamp: Date.now() },
        ...prev.filter((item) => item.formula !== formulaText),
      ].slice(0, MAX_HISTORY_ITEMS);

      // Guardar en localStorage
      localStorage.setItem("formulaHistory", JSON.stringify(newHistory));

      return newHistory;
    });
  };

  // Manejar la inserción de campo
  const handleInsertField = (fieldName: string) => {
    const newFormula =
      formula.substring(0, cursorPosition) +
      fieldName +
      formula.substring(cursorPosition);
    setFormula(newFormula);

    // Actualizar la posición del cursor después de la inserción
    const newPosition = cursorPosition + fieldName.length;
    setCursorPosition(newPosition);

    // Enfocar y establecer la posición del cursor en el input
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newPosition;
          inputRef.current.selectionEnd = newPosition;
        }
      }, 0);
    }
  };

  // Manejar la inserción de operador
  const handleInsertOperator = (operator: string) => {
    // Agregar espacio alrededor de los operadores para mejorar la legibilidad
    const operatorWithSpace =
      operator === "(" || operator === ")" ? operator : ` ${operator} `;
    const newFormula =
      formula.substring(0, cursorPosition) +
      operatorWithSpace +
      formula.substring(cursorPosition);
    setFormula(newFormula);

    // Actualizar posición del cursor
    const newPosition = cursorPosition + operatorWithSpace.length;
    setCursorPosition(newPosition);

    // Enfocar y establecer la posición del cursor
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newPosition;
          inputRef.current.selectionEnd = newPosition;
        }
      }, 0);
    }
  };

  // Manejar la inserción de función
  const handleInsertFunction = (func: string) => {
    const funcWithParen = `${func}(`;
    const newFormula =
      formula.substring(0, cursorPosition) +
      funcWithParen +
      formula.substring(cursorPosition);
    setFormula(newFormula);

    // Actualizar posición del cursor dentro de los paréntesis
    const newPosition = cursorPosition + funcWithParen.length;
    setCursorPosition(newPosition);

    // Enfocar y establecer la posición del cursor
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newPosition;
          inputRef.current.selectionEnd = newPosition;
        }
      }, 0);
    }
  };

  // Manejar el cambio en el input de la fórmula
  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  // Manejar el clic o selección de una de las sugerencias
  const handleSuggestionClick = (suggestion: string) => {
    // Encontrar el inicio de la palabra actual
    const textBeforeCursor = formula.substring(0, cursorPosition);
    const lastSpacePos = Math.max(
      textBeforeCursor.lastIndexOf(" "),
      textBeforeCursor.lastIndexOf("+"),
      textBeforeCursor.lastIndexOf("-"),
      textBeforeCursor.lastIndexOf("*"),
      textBeforeCursor.lastIndexOf("/"),
      textBeforeCursor.lastIndexOf("("),
      textBeforeCursor.lastIndexOf(")")
    );

    const wordStart = lastSpacePos + 1;

    // Reemplazar la palabra actual con la sugerencia
    const newFormula =
      formula.substring(0, wordStart) +
      suggestion +
      formula.substring(cursorPosition);

    setFormula(newFormula);

    // Actualizar posición del cursor
    const newPosition = wordStart + suggestion.length;
    setCursorPosition(newPosition);

    // Cerrar menú de sugerencias
    setShowSuggestions(false);

    // Enfocar y establecer la posición del cursor
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newPosition;
          inputRef.current.selectionEnd = newPosition;
        }
      }, 0);
    }
  };

  // Aplicar una fórmula desde el historial
  const applyHistoryFormula = (historyFormula: string) => {
    setFormula(historyFormula);
    // Poner el cursor al final de la fórmula
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = historyFormula.length;
        inputRef.current.selectionEnd = historyFormula.length;
        setCursorPosition(historyFormula.length);
      }
    }, 0);
  };

  // Limpiar el historial de fórmulas
  const clearHistory = () => {
    setFormulaHistory([]);
    localStorage.removeItem("formulaHistory");
    toast.success("Historial limpiado");
  };

  // Guardar la fórmula actual en el historial
  const saveCurrentFormula = () => {
    if (formula.trim() && !validationError) {
      saveToHistory(formula);
      toast.success("Fórmula guardada en el historial");
    } else {
      toast.error("No se puede guardar una fórmula vacía o inválida");
    }
  };

  // Manejar el cambio en un valor de la vista previa
  const handlePreviewValueChange = (fieldId: string, value: number) => {
    setPreviewValues((prev) =>
      prev.map((item) => (item.fieldId === fieldId ? { ...item, value } : item))
    );
  };

  // Mantener el seguimiento de la posición del cursor
  const handleCursorPositionChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  // Limpiar la fórmula actual
  const clearFormula = () => {
    setFormula("");
    setValidationError(null);
    setPreviewResult(null);
    setCursorPosition(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Formatear fecha para el historial
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  };

  useEffect(() => {
    calculateComplexity();
  }, [calculateComplexity]);

  return (
    <div className="space-y-4">
      {/* Editor de fórmulas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Constructor de Fórmulas</CardTitle>
              <CardDescription>
                Construye tu fórmula usando operadores matemáticos y los campos
                disponibles
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Tooltip content="Alternar resaltado de sintaxis">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHighlightedView(!showHighlightedView)}
                >
                  <Calculator className="h-4 w-4" />
                </Button>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <p className="px-2 py-1.5 text-sm font-medium">
                    Historial de fórmulas
                  </p>
                  {formulaHistory.length > 0 ? (
                    <>
                      {formulaHistory.map((item, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => applyHistoryFormula(item.formula)}
                          className="flex gap-2 items-center justify-between"
                        >
                          <div className="truncate max-w-[180px]">
                            {item.formula}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {formatDate(item.timestamp)}
                          </div>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={clearHistory}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 border-t mt-1"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Limpiar historial
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <p className="px-2 py-1.5 text-sm text-muted-foreground">
                      No hay fórmulas guardadas
                    </p>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm" onClick={clearFormula}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Explicación sobre cómo usar este constructor */}
            <div className="mb-4 text-sm bg-blue-50 p-3 rounded">
              <p className="mb-2">
                <strong>Cómo construir fórmulas:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Haz clic en los campos para insertarlos en la fórmula</li>
                <li>
                  Usa los operadores (+, -, *, /) para definir operaciones
                  matemáticas
                </li>
                <li>Agrupa operaciones usando paréntesis: (a + b) * c</li>
                <li>
                  Las funciones matemáticas requieren parámetros entre
                  paréntesis: max(a, b)
                </li>
              </ul>
            </div>

            {/* Indicador de complejidad */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Complejidad de la fórmula</span>
                <Badge
                  variant={
                    formula
                      ? formulaComplexity < 30
                        ? "outline"
                        : formulaComplexity < 70
                        ? "secondary"
                        : "default"
                      : "outline"
                  }
                >
                  {formula ? `${formulaComplexity}%` : "0%"}
                </Badge>
              </div>
              <Progress value={formulaComplexity} className="h-2" />
            </div>

            {/* Fórmula actual */}
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <Input
                  ref={inputRef}
                  value={formula}
                  onChange={handleFormulaChange}
                  onKeyUp={handleCursorPositionChange}
                  onMouseUp={handleCursorPositionChange}
                  onFocus={handleCursorPositionChange}
                  onClick={handleCursorPositionChange}
                  placeholder="Ejemplo: campo1 + campo2 * 0.19"
                  className={`font-mono ${
                    validationError ? "border-red-500" : ""
                  }`}
                />
                {!validationError && formula.trim() !== "" && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {validationError && (
                  <Tooltip content={validationError}>
                    <div>
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  </Tooltip>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveCurrentFormula}
                  disabled={!formula.trim() || !!validationError}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Guardar
                </Button>
              </div>

              {/* Visualización formateada */}
              {showHighlightedView && formula && (
                <div className="p-2 border rounded bg-gray-50 min-h-8 font-mono">
                  {highlightFormula(formula, fields)}
                </div>
              )}
            </div>

            {/* Sugerencias */}
            {showSuggestions && (
              <Card className="max-h-[150px] overflow-auto">
                <ul className="p-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Operadores */}
            <div>
              <p className="text-sm mb-2 font-medium">Operadores</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  {
                    op: "+",
                    label: "Suma",
                    icon: <PlusIcon className="h-4 w-4 mr-1" />,
                  },
                  {
                    op: "-",
                    label: "Resta",
                    icon: <Minus className="h-4 w-4 mr-1" />,
                  },
                  {
                    op: "*",
                    label: "Multiplicación",
                    icon: <X className="h-4 w-4 mr-1" />,
                  },
                  {
                    op: "/",
                    label: "División",
                    icon: <Divide className="h-4 w-4 mr-1" />,
                  },
                  { op: "(", label: "Paréntesis" },
                  { op: ")", label: "Paréntesis" },
                ].map((item) => (
                  <Button
                    key={item.op}
                    variant="outline"
                    size="sm"
                    onClick={() => handleInsertOperator(item.op)}
                  >
                    {item.icon} {item.op}
                  </Button>
                ))}
              </div>
            </div>

            {/* Campos disponibles */}
            <div>
              <p className="text-sm mb-2 font-medium">Campos disponibles</p>
              <div className="flex gap-2 flex-wrap">
                {fields.length > 0 ? (
                  fields.map((field) => (
                    <Badge
                      key={field.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => handleInsertField(field.name)}
                    >
                      {field.label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No hay campos disponibles. Agrega campos al formulario
                    primero.
                  </p>
                )}
              </div>
            </div>

            {/* Funciones */}
            <div>
              <p className="text-sm mb-2 font-medium">Funciones</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  "sin",
                  "cos",
                  "tan",
                  "sqrt",
                  "abs",
                  "round",
                  "max",
                  "min",
                ].map((func) => (
                  <Button
                    key={func}
                    variant="outline"
                    size="sm"
                    onClick={() => handleInsertFunction(func)}
                  >
                    {func}()
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-2">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <div>
              {formula ? (
                validationError ? (
                  <span className="text-red-500">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    {validationError}
                  </span>
                ) : (
                  <span className="text-green-500">
                    <Check className="h-3 w-3 inline mr-1" />
                    Fórmula válida
                  </span>
                )
              ) : (
                <span>
                  Escribe una fórmula o selecciona campos y operadores
                </span>
              )}
            </div>
            <div>
              {formulaHistory.length > 0 && (
                <span>
                  <History className="h-3 w-3 inline mr-1" />
                  {formulaHistory.length} fórmula(s) en historial
                </span>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Vista previa */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Vista previa</CardTitle>
          <CardDescription>
            Prueba tu fórmula con valores de ejemplo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Valores de prueba */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {previewValues.map((item) => (
                <div key={item.fieldId} className="flex items-center gap-2">
                  <Label htmlFor={`field-${item.fieldId}`}>
                    {item.fieldId}:
                  </Label>
                  <Input
                    id={`field-${item.fieldId}`}
                    type="number"
                    value={item.value.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePreviewValueChange(
                        item.fieldId,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24"
                  />
                </div>
              ))}
            </div>

            {/* Resultado */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">Resultado:</span>
                <span className="font-mono bg-secondary px-2 py-1 rounded">
                  {previewResult !== null
                    ? new Intl.NumberFormat().format(previewResult)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaBuilder;
