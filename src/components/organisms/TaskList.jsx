import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
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
    if (a.completed === b.completed) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.completed - b.completed;
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
            key={task.Id}
            task={task}
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