import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Start by adding your first task and take control of your productivity!",
  actionLabel = "Add Task",
  onAction,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 10 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
          <ApperIcon name="CheckCircle2" className="w-12 h-12 text-primary/60" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Plus" className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={onAction} size="lg" className="flex items-center space-x-2">
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>{actionLabel}</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;