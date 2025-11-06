import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import TaskCard from "@/components/molecules/TaskCard";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = "", 
  categories = [],
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

  // Sort tasks: incomplete first, then completed
const sortedTasks = [...tasks].sort((a, b) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
{sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
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