import * as React from "react";

import { Input } from "./input";

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { icon?: React.ReactNode }
>(({ icon, ...props }, ref) => {
  return (
    <div className="relative">
      <Input ref={ref} {...props} className="pr-10" />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {icon}
      </div>
    </div>
  );
});
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
