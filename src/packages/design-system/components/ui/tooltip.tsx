"use client";

import * as React from "react";
import { Tooltip as RadixTooltip } from "@radix-ui/themes";

import { cn } from "../../lib/utils";

// Componente adaptado para usar la API simplificada de @radix-ui/themes
const Tooltip = React.forwardRef<
  React.ElementRef<typeof RadixTooltip>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip> & {
    content: React.ReactNode;
  }
>(({ className, children, content, ...props }, ref) => (
  <RadixTooltip
    ref={ref}
    content={<div className={cn("text-xs", className)}>{content}</div>}
    {...props}
  >
    {children}
  </RadixTooltip>
));
Tooltip.displayName = "Tooltip";

export { Tooltip };
