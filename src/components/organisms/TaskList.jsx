import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import TaskCard from "@/components/molecules/TaskCard";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import ApperIcon from "@/components/ui/ApperIcon";

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = "", 
  categories = [],
  activeFilter = 'all',
  onFilterChange,
  onToggleComplete, 
  onDeleteTask, 
  onEditTask,
  onRetry,
  onAddTask 
}) => {
  if (loading) {
    return <Loading className="mt-6" />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={onRetry}
        className="mt-6"
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <Empty 
        title="No tasks yet"
        description="Start by adding your first task and take control of your productivity!"
        actionLabel="Add Task"
        onAction={onAddTask}
        className="mt-6"
      />
    );
  }

// Filter tasks based on active filter
  const filteredTasks = tasks.filter((task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    switch (activeFilter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'due-today':
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      case 'overdue':
        if (!task.dueDate || task.completed) return false;
        const dueDateObj = new Date(task.dueDate);
        dueDateObj.setHours(0, 0, 0, 0);
        return dueDateObj.getTime() < today.getTime();
      case 'high-priority':
        return task.priority === 'High';
      case 'medium-priority':
        return task.priority === 'Medium';
      case 'low-priority':
        return task.priority === 'Low';
      default:
        return true; // 'all' filter
    }
  });

  // Sort filtered tasks: incomplete first, then completed
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First, sort by completion status
    if (a.completed !== b.completed) {
      return a.completed - b.completed;
    }
    
    // For incomplete tasks, sort by priority
    if (!a.completed && !b.completed) {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      const aPriority = priorityOrder[a.priority] ?? 1;
      const bPriority = priorityOrder[b.priority] ?? 1;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
    }
    
    // Finally, sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const filterButtons = [
    { key: 'all', label: 'All Tasks', icon: 'List' },
    { key: 'active', label: 'Active', icon: 'Clock' },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { key: 'due-today', label: 'Due Today', icon: 'Calendar' },
    { key: 'overdue', label: 'Overdue', icon: 'AlertTriangle' },
    { key: 'high-priority', label: 'High Priority', icon: 'ArrowUp' },
    { key: 'medium-priority', label: 'Medium Priority', icon: 'Minus' },
    { key: 'low-priority', label: 'Low Priority', icon: 'ArrowDown' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
{/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {filterButtons.map((filter) => (
              <Button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                variant={activeFilter === filter.key ? 'primary' : 'secondary'}
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm transition-all duration-200
                  ${activeFilter === filter.key 
                    ? 'bg-primary text-white shadow-md scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                <ApperIcon name={filter.icon} size={16} />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {sortedTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            categories={categories}
            onToggleComplete={onToggleComplete}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;