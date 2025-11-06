import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className = "", 
  error,
  rows = 3,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none";
  const normalStyles = "border-gray-200 focus:border-primary focus:ring-primary/20";
  const errorStyles = "border-error focus:border-error focus:ring-error/20";

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseStyles,
        error ? errorStyles : normalStyles,
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;