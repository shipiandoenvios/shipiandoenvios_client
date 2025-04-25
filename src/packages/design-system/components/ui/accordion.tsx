"use client";

import * as React from "react";
import { Box } from "@radix-ui/themes";
import { cn } from "@/packages/design-system/lib/utils";
import { ChevronDownIcon } from "lucide-react";

// Creando un contexto para el Accordion
interface AccordionContextType {
  open: Record<string, boolean>;
  toggle: (id: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType>({
  open: {},
  toggle: () => {},
});

// Componente principal
const Accordion = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});

  const toggle = React.useCallback((id: string) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <Box className={cn("divide-y ", className)} {...props}>
        {children}
      </Box>
    </AccordionContext.Provider>
  );
};
Accordion.displayName = "Accordion";

// Item component (contenedor)
const AccordionItem = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Box className={cn(className)} {...props}>
      {children}
    </Box>
  );
};
AccordionItem.displayName = "AccordionItem";

// Trigger component
const AccordionTrigger = ({
  children,
  className,
  id,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { id: string }) => {
  const { open, toggle } = React.useContext(AccordionContext);
  const isOpen = open[id] || false;

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDownIcon
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
};
AccordionTrigger.displayName = "AccordionTrigger";

// Content component
const AccordionContent = ({
  children,
  className,
  id,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { id: string }) => {
  const { open } = React.useContext(AccordionContext);
  const isOpen = open[id] || false;

  if (!isOpen) return null;

  return (
    <Box className={cn("pb-4 pt-0 text-sm", className)} {...props}>
      {children}
    </Box>
  );
};
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
