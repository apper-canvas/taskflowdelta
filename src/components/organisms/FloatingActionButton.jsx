import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const FloatingActionButton = ({ onClick, disabled = false }) => {
  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        boxShadow: disabled ? undefined : "0 6px 16px rgba(0,0,0,0.2)"
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full shadow-fab flex items-center justify-center transition-all duration-200 z-40 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <motion.div
        whileHover={{ rotate: disabled ? 0 : 90 }}
        transition={{ duration: 0.2 }}
      >
        <ApperIcon name="Plus" className="w-6 h-6" strokeWidth={2.5} />
      </motion.div>
    </motion.button>
  );
};

export default FloatingActionButton;