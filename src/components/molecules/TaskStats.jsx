import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ totalTasks, completedTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-card p-6 mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckCircle2" className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Task Progress</h2>
            <p className="text-sm text-gray-600">
              {completedTasks} of {totalTasks} completed
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completionRate}%</div>
          <div className="text-xs text-gray-500 font-medium">Complete</div>
        </div>
      </div>
      
      {totalTasks > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskStats;