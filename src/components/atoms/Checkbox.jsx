import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className = "", 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <motion.div
        animate={{
          backgroundColor: checked ? "#27AE60" : "#FFFFFF",
          borderColor: checked ? "#27AE60" : "#D1D5DB",
          scale: checked ? 1.1 : 1
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
      >
        <motion.div
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <ApperIcon name="Check" className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;