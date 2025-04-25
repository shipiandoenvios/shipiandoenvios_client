"use client";

import * as React from "react";
import { Dialog as DialogTheme } from "@radix-ui/themes";
import { cn } from "@/packages/design-system/lib/utils";
import { XIcon } from "lucide-react";

// Usar Dialog de Radix Themes como base para Sheet
const Sheet = DialogTheme.Root;
const SheetTrigger = DialogTheme.Trigger;
const SheetContent = DialogTheme.Content;
const SheetTitle = DialogTheme.Title;
const SheetDescription = DialogTheme.Description;
const SheetClose = DialogTheme.Close;

// Componentes adicionales personalizados para mantener la API de Sheet
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

// Versión personalizada del Content con soporte para diferentes posiciones
interface CustomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogTheme.Content> {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}

const CustomSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogTheme.Content>,
  CustomSheetContentProps
>(
  (
    { className, children, side = "right", showCloseButton = true, ...props },
    ref
  ) => {
    const sideClasses = {
      top: "inset-x-0 top-0 mt-0 h-auto w-full rounded-none border-b",
      right: "inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-none border-l",
      bottom: "inset-x-0 bottom-0 mb-0 h-auto w-full rounded-none border-t",
      left: "inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-none border-r",
    };

    return (
      <DialogTheme.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {showCloseButton && (
          <DialogTheme.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogTheme.Close>
        )}
        {children}
      </DialogTheme.Content>
    );
  }
);
CustomSheetContent.displayName = "CustomSheetContent";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetHeader,
  SheetFooter,
  // Componente personalizado
  CustomSheetContent,
};
