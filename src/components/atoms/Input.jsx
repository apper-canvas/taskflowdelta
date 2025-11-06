import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className = "", 
  type = "text",
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";
  const normalStyles = "border-gray-200 focus:border-primary focus:ring-primary/20";
  const errorStyles = "border-error focus:border-error focus:ring-error/20";

  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        baseStyles,
        error ? errorStyles : normalStyles,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;