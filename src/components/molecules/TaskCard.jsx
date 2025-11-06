import { motion } from "framer-motion";
import { format } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.Id, !task.completed);
  };

  const handleDelete = () => {
    onDelete(task.Id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: task.completed ? 0.6 : 1, 
        y: 0, 
        scale: 1 
      }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.15 }
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover p-6 transition-all duration-200"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <motion.h3
            animate={{
              textDecoration: task.completed ? "line-through" : "none"
            }}
            transition={{ duration: 0.2 }}
            className="text-lg font-semibold text-gray-900 mb-2 leading-tight"
          >
            {task.title}
</motion.h3>

          {/* Due Date Display */}
          {task.dueDate && (
            <div className={`flex items-center space-x-1 text-xs mt-1 ${
              new Date(task.dueDate) < new Date() && !task.completed 
                ? 'text-error' 
                : 'text-gray-500'
            }`}>
              {new Date(task.dueDate) < new Date() && !task.completed ? (
                <ApperIcon name="AlertTriangle" className="w-3 h-3" />
              ) : (
                <ApperIcon name="Calendar" className="w-3 h-3" />
              )}
              <span>
                Due {format(new Date(task.dueDate), "MMM d, yyyy")}
                {new Date(task.dueDate) < new Date() && !task.completed && (
                  <span className="font-medium"> (Overdue)</span>
                )}
              </span>
            </div>
          )}
          {task.description && (
            <motion.p
              animate={{
                opacity: task.completed ? 0.7 : 1,
                textDecoration: task.completed ? "line-through" : "none"
              }}
              transition={{ duration: 0.2 }}
              className="text-gray-600 text-sm leading-relaxed mb-3"
            >
              {task.description}
            </motion.p>
          )}
          
          <div className="flex items-center text-xs text-gray-400 space-x-4">
            <span className="flex items-center space-x-1">
              <ApperIcon name="Clock" className="w-3 h-3" />
              <span>Created {format(new Date(task.createdAt), "MMM d, yyyy")}</span>
            </span>
            {task.completed && task.updatedAt !== task.createdAt && (
              <span className="flex items-center space-x-1">
                <ApperIcon name="CheckCircle2" className="w-3 h-3 text-success" />
                <span>Completed {format(new Date(task.updatedAt), "MMM d, yyyy")}</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
<Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-primary hover:bg-blue-50 p-2"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-gray-400 hover:text-error hover:bg-red-50 p-2"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;