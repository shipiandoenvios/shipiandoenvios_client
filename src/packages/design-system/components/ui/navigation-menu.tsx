"use client";

import * as React from "react";
import { TabNav } from "@radix-ui/themes";
import { cva } from "class-variance-authority";
import { cn } from "@/packages/design-system/lib/utils";
import { ChevronDownIcon } from "lucide-react";

const NavigationMenuContext = React.createContext<{
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  activeItem: null,
  setActiveItem: () => null,
});

// Estilo para el navigation menu
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

// Root component
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof TabNav.Root>,
  React.ComponentPropsWithoutRef<typeof TabNav.Root>
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <div className="relative">
        <TabNav.Root
          ref={ref}
          className={cn("relative z-10", className)}
          {...props}
        >
          {children}
        </TabNav.Root>
      </div>
    </NavigationMenuContext.Provider>
  );
});
NavigationMenu.displayName = "NavigationMenu";

// Link component
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof TabNav.Link>,
  React.ComponentPropsWithoutRef<typeof TabNav.Link>
>(({ className, ...props }, ref) => (
  <TabNav.Link ref={ref} className={cn(className)} {...props} />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

// Item component
interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

const NavigationMenuItem = React.forwardRef<
  HTMLDivElement,
  NavigationMenuItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative inline-block", className)}
      {...props}
    >
      {children}
    </div>
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

// Trigger component
interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
}

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, children, id, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext);
  const isOpen = id ? activeItem === id : false;

  const handleClick = React.useCallback(() => {
    if (id) {
      setActiveItem((prev) => (prev === id ? null : id));
    }
  }, [id, setActiveItem]);

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={cn(
        navigationMenuTriggerStyle(),
        "group",
        isOpen && "bg-accent/50",
        className
      )}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          "relative ml-1 h-3 w-3 transition duration-300",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// Content component
interface NavigationMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, children, id, ...props }, ref) => {
  const { activeItem } = React.useContext(NavigationMenuContext);
  const isVisible = id ? activeItem === id : false;

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 top-full z-50 mt-1 w-auto rounded-md border bg-popover p-2 shadow-lg",
        isVisible ? "animate-in fade-in-10" : "animate-out fade-out-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
};
