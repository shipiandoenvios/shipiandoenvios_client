/**
 * Utilidades para validar y evaluar fórmulas matemáticas
 */

/**
 * Valida una expresión matemática
 * @param expression La expresión a validar
 * @param fieldNames Nombres de campos disponibles
 * @returns Objeto con el resultado de la validación
 */
export function validateFormula(
  expression: string,
  fieldNames: string[] = []
): { isValid: boolean; error?: string } {
  if (!expression || expression.trim() === "") {
    return { isValid: false, error: "La fórmula no puede estar vacía" };
  }

  try {
    // Verificar si hay operadores consecutivos
    if (/[+\-*/%]{2,}/.test(expression)) {
      return {
        isValid: false,
        error: "No puede haber operadores consecutivos",
      };
    }

    // Verificar si la fórmula termina con un operador
    if (/[+\-*/%]$/.test(expression.trim())) {
      return {
        isValid: false,
        error: "La fórmula no puede terminar con un operador",
      };
    }

    // Verificar si la fórmula comienza con un operador (excepto - que podría ser un número negativo)
    if (/^[+*/%]/.test(expression.trim())) {
      return {
        isValid: false,
        error: "La fórmula no puede comenzar con un operador (excepto -)",
      };
    }

    // Verificar si hay paréntesis desbalanceados
    let parenthesesCount = 0;
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === "(") parenthesesCount++;
      if (expression[i] === ")") parenthesesCount--;
      if (parenthesesCount < 0) {
        return { isValid: false, error: "Paréntesis desbalanceados" };
      }
    }
    if (parenthesesCount !== 0) {
      return { isValid: false, error: "Paréntesis desbalanceados" };
    }

    // Verificar paréntesis vacíos
    if (/\(\s*\)/.test(expression)) {
      return {
        isValid: false,
        error: "No puede haber paréntesis vacíos",
      };
    }

    // Verificar que los campos usados existen en la lista
    const tokenRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    const usedFields = expression.match(tokenRegex) || [];

    for (const field of usedFields) {
      if (fieldNames.length > 0 && !fieldNames.includes(field)) {
        return {
          isValid: false,
          error: `El campo "${field}" no existe en el formulario`,
        };
      }
    }

    // Intentar evaluar la expresión con valores de prueba
    const testFormula = createEvaluableExpression(expression, fieldNames, 1);
    new Function(testFormula)();

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: `Error de sintaxis: ${(error as Error).message}`,
    };
  }
}

/**
 * Evalúa una fórmula con valores reales
 * @param expression La expresión a evaluar
 * @param fields Lista de campos disponibles (opcional)
 * @param values Objeto con los valores de los campos
 * @returns El resultado de la evaluación
 */
export function evaluateFormula(
  expression: string,
  fields?: Array<{ id: string; name: string; type: string }>,
  values?: Record<string, any>
): number {
  try {
    console.log("⚙️ Evaluando fórmula:", expression);
    console.log("⚙️ Campos disponibles:", fields);
    console.log("⚙️ Valores proporcionados:", values);

    // Añadir verificación de espacios en la expresión
    if (expression.includes(" ")) {
      console.warn(
        "⚠️ La fórmula contiene espacios que pueden afectar la evaluación:",
        expression
      );
      // Eliminar espacios en la fórmula
      expression = expression.replace(/\s+/g, "");
      console.log("⚙️ Fórmula sin espacios:", expression);
    }

    if (!expression || expression.trim() === "") {
      console.warn("⚠️ La fórmula está vacía");
      return 0;
    }

    // Crear mapeos para los campos
    const nameToId: Record<string, string> = {};
    const idToName: Record<string, string> = {};
    const nameToShortName: Record<string, string> = {};
    const shortNameToName: Record<string, string> = {};

    // Mapeos conocidos para campos comunes
    const knownMappings: Record<string, string> = {
      Ingresos: "ING",
      Egresos: "EGR",
      Calculo: "CALC",
    };

    if (fields) {
      fields.forEach((field) => {
        nameToId[field.name] = field.id;
        idToName[field.id] = field.name;

        // Agregar mapeos conocidos si existen
        if (knownMappings[field.name]) {
          const shortName = knownMappings[field.name];
          nameToShortName[field.name] = shortName;
          shortNameToName[shortName] = field.name;
        }
      });
    }

    // Obtener nombres e IDs disponibles para depuración
    const availableNames = fields ? fields.map((f) => f.name) : [];
    const availableIds = fields ? fields.map((f) => f.id) : [];
    const availableShortNames = Object.values(nameToShortName);

    console.log("⚙️ Nombres de campos disponibles:", availableNames);
    console.log("⚙️ IDs de campos disponibles:", availableIds);
    console.log("⚙️ Nombres cortos disponibles:", availableShortNames);

    // Mostrar todos los valores disponibles incluyendo sus keys
    console.log(
      "⚙️ Valores disponibles (keys):",
      values ? Object.keys(values) : []
    );
    console.log("⚙️ Desglose completo de valores:");
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        console.log(`   → ${key}: ${value} (tipo: ${typeof value})`);
      });
    }

    // Procesar la fórmula reemplazando % por * 0.01 para porcentajes
    let processedFormula = expression.replace(/%/g, "*0.01");
    console.log("⚙️ Expresión procesada con % reemplazado:", processedFormula);

    // Buscar todos los identificadores que podrían ser campos
    const identifierRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    const identifiers = processedFormula.match(identifierRegex) || [];
    const uniqueIdentifiers = [...new Set(identifiers)];

    // Funciones matemáticas que no deben ser tratadas como campos
    const mathFunctions = [
      "sin",
      "cos",
      "tan",
      "abs",
      "sqrt",
      "log",
      "exp",
      "round",
      "floor",
      "ceil",
    ];
    const fieldsToResolve = uniqueIdentifiers.filter(
      (id) => !mathFunctions.includes(id)
    );

    // Crear un conjunto de identificadores no resueltos
    const unresolvedIdentifiers: string[] = [];

    // Crear una copia de los valores para no modificar el original
    const safeValues = values ? { ...values } : {};

    // Reemplazar los identificadores de campo por sus valores
    fieldsToResolve.forEach((identifier) => {
      // Intentar varias estrategias para encontrar el valor
      let value: any = undefined;

      // 1. Intentar como está (podría ser un ID o nombre directo)
      if (safeValues[identifier] !== undefined) {
        value = safeValues[identifier];
        console.log(
          `✅ Valor encontrado directamente para ${identifier}: ${value}`
        );
      }
      // 2. Intentar como nombre corto (ING, EGR)
      else if (
        shortNameToName[identifier] &&
        safeValues[shortNameToName[identifier]] !== undefined
      ) {
        value = safeValues[shortNameToName[identifier]];
        console.log(
          `✅ Valor encontrado usando nombre corto para ${identifier} (${shortNameToName[identifier]}): ${value}`
        );
      }
      // 3. Intentar usando el nombre completo (Ingresos, Egresos)
      else if (
        nameToShortName[identifier] &&
        safeValues[nameToShortName[identifier]] !== undefined
      ) {
        value = safeValues[nameToShortName[identifier]];
        console.log(
          `✅ Valor encontrado usando nombre completo para ${identifier} (${nameToShortName[identifier]}): ${value}`
        );
      }
      // 4. Intentar buscar por ID si es un nombre
      else if (
        nameToId[identifier] &&
        safeValues[nameToId[identifier]] !== undefined
      ) {
        value = safeValues[nameToId[identifier]];
        console.log(
          `✅ Valor encontrado usando ID para ${identifier} (${nameToId[identifier]}): ${value}`
        );
      }
      // 5. Intentar buscar por nombre si es un ID
      else if (
        idToName[identifier] &&
        safeValues[idToName[identifier]] !== undefined
      ) {
        value = safeValues[idToName[identifier]];
        console.log(
          `✅ Valor encontrado usando nombre para ${identifier} (${idToName[identifier]}): ${value}`
        );
      }
      // No se encontró valor, marcar como no resuelto
      else {
        unresolvedIdentifiers.push(identifier);
      }

      // Reemplazar en la fórmula si se encontró valor
      if (value !== undefined) {
        // Asegurarse de que el valor sea numérico
        const numValue = Number(value);
        // Reemplazar el identificador con el valor, cuidando que sea un identificador completo
        const regexPattern = new RegExp(`\\b${identifier}\\b`, "g");
        processedFormula = processedFormula.replace(
          regexPattern,
          numValue.toString()
        );
      }
    });

    // Registrar identificadores no resueltos
    if (unresolvedIdentifiers.length > 0) {
      console.warn(
        `⚠️ Hay identificadores no resueltos en la fórmula: ${unresolvedIdentifiers.join(
          ", "
        )}`
      );

      // Búsqueda adicional para identificadores no resueltos
      for (const id of unresolvedIdentifiers) {
        console.warn(`⚠️ Buscando valor para identificador no resuelto: ${id}`);

        // Buscar por nombres similares (ignorando mayúsculas/minúsculas)
        let found = false;
        for (const key in safeValues) {
          if (key.toLowerCase() === id.toLowerCase()) {
            const numValue = Number(safeValues[key]);
            const regexPattern = new RegExp(`\\b${id}\\b`, "g");
            processedFormula = processedFormula.replace(
              regexPattern,
              numValue.toString()
            );
            console.log(
              `✅ Valor encontrado con coincidencia insensible a mayúsculas: ${key} = ${safeValues[key]}`
            );
            found = true;
            break;
          }
        }

        // Mapeos conocidos para nombres comunes
        const knownMappings: Record<string, string[]> = {
          Ingresos: ["ING", "ingreso", "income", "revenue"],
          Egresos: ["EGR", "egreso", "expense", "cost", "gasto"],
          Calculo: ["CALC", "calculo", "calculation", "result"],
        };

        // Intentar con mapeos conocidos
        if (!found) {
          for (const [originalName, aliases] of Object.entries(knownMappings)) {
            if (
              aliases.includes(id.toLowerCase()) ||
              id.toLowerCase() === originalName.toLowerCase()
            ) {
              // Buscar por el nombre original y sus alias
              for (const alias of [originalName, ...aliases]) {
                if (safeValues[alias] !== undefined) {
                  const numValue = Number(safeValues[alias]);
                  const regexPattern = new RegExp(`\\b${id}\\b`, "g");
                  processedFormula = processedFormula.replace(
                    regexPattern,
                    numValue.toString()
                  );
                  console.log(
                    `✅ Valor encontrado con alias conocido: ${alias} = ${safeValues[alias]}`
                  );
                  found = true;
                  break;
                }
              }
              if (found) break;
            }
          }
        }

        // Si aún no se encuentra, reemplazar con 0
        if (!found) {
          console.warn(
            `⚠️ No se encontró valor para ${id}, reemplazando con 0`
          );
          const regexPattern = new RegExp(`\\b${id}\\b`, "g");
          processedFormula = processedFormula.replace(regexPattern, "0");
        }
      }
    }

    console.log("⚙️ Expresión evaluable final:", processedFormula);

    // Evaluar la expresión procesada
    const result = eval(processedFormula);

    // Verificar si el resultado es un número válido
    if (isNaN(result) || !isFinite(result)) {
      console.error("⚠️ La evaluación produjo un resultado no válido:", result);
      return 0;
    }

    console.log("✅ Resultado de la evaluación:", result);
    return result;
  } catch (error) {
    console.error("🔴 Error al evaluar la fórmula:", error);
    return 0;
  }
}

/**
 * Crea una expresión evaluable para pruebas
 * @param expression La expresión original
 * @param fieldNames Nombres de campos
 * @param defaultValue Valor por defecto para cada campo
 * @returns Una expresión JavaScript evaluable
 */
function createEvaluableExpression(
  expression: string,
  fieldNames: string[],
  defaultValue: number = 1
): string {
  let evaluableExpression = expression;

  // Reemplazar el operador % por su equivalente en JavaScript (*0.01)
  evaluableExpression = evaluableExpression.replace(/%/g, "*0.01");

  // Reemplazar campos por valores de prueba
  for (const field of fieldNames) {
    const regex = new RegExp(`\\b${field}\\b`, "g");
    evaluableExpression = evaluableExpression.replace(
      regex,
      defaultValue.toString()
    );
  }

  return `return ${evaluableExpression}`;
}

/**
 * Devuelve sugerencias de fórmula basadas en el texto actual
 * @param currentText Texto actual de la fórmula
 * @param fieldNames Nombres de campos disponibles
 * @returns Lista de sugerencias para autocompletar
 */
export function getSuggestions(
  currentText: string,
  fieldNames: string[] = []
): string[] {
  const suggestions: string[] = [];

  // Si el texto está vacío o termina con un espacio, sugerir campos y operadores
  if (!currentText || currentText.endsWith(" ")) {
    // Sugerir campos
    suggestions.push(...fieldNames);

    // Sugerir operadores básicos
    suggestions.push("+", "-", "*", "/", "%", "(", ")");
  } else {
    // Buscar la última palabra en la entrada para autocompletar
    const lastWord = currentText.split(/[\s+\-*/%()]+/).pop() || "";

    if (lastWord) {
      // Filtrar campos que coincidan con el texto escrito
      const matchingFields = fieldNames.filter((field) =>
        field.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      suggestions.push(...matchingFields);
    }
  }

  return suggestions;
}

// Crear un mapa bidireccional de nombres de campos
export const createFieldMappings = (
  fields: any[]
): {
  nameToId: Record<string, string>;
  idToName: Record<string, string>;
  nameToShortName: Record<string, string>;
  shortNameToName: Record<string, string>;
} => {
  const nameToId: Record<string, string> = {};
  const idToName: Record<string, string> = {};
  const nameToShortName: Record<string, string> = {};
  const shortNameToName: Record<string, string> = {};

  // Mapeos conocidos para campos comunes
  const knownMappings: Record<string, string> = {
    Ingresos: "ING",
    Egresos: "EGR",
    Calculo: "CALC",
  };

  fields.forEach((field) => {
    nameToId[field.name] = field.id;
    idToName[field.id] = field.name;

    // Agregar mapeos conocidos si existen
    if (knownMappings[field.name]) {
      const shortName = knownMappings[field.name];
      nameToShortName[field.name] = shortName;
      shortNameToName[shortName] = field.name;
    }
  });

  return { nameToId, idToName, nameToShortName, shortNameToName };
};
