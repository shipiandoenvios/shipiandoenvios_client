"use client";

import * as React from "react";
import { Popover as PopoverTheme } from "@radix-ui/themes";

import { cn } from "@/packages/design-system/lib/utils";

const Popover = PopoverTheme.Root;

const PopoverTrigger = PopoverTheme.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverTheme.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverTheme.Content>
>(({ className, ...props }, ref) => (
  <PopoverTheme.Content
    ref={ref}
    className={cn("z-50 w-72 rounded-md p-4 shadow-md outline-none", className)}
    {...props}
  />
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
