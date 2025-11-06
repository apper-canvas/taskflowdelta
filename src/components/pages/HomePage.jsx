import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import TaskStats from "@/components/molecules/TaskStats";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/molecules/TaskModal";
import FloatingActionButton from "@/components/organisms/FloatingActionButton";
import ApperIcon from "@/components/ApperIcon";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      setCreating(true);
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setIsModalOpen(false);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task. Please try again.");
      console.error("Error creating task:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.update(taskId, { completed });
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      
      if (completed) {
        toast.success("Task completed! Great job! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
          >
            <ApperIcon name="CheckCircle2" className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          >
            TaskFlow
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 text-lg max-w-md mx-auto"
        >
          Capture, track, and complete your daily tasks with ease
        </motion.p>
      </motion.div>

      {/* Stats */}
      {!loading && tasks.length > 0 && (
        <TaskStats totalTasks={totalCount} completedTasks={completedCount} />
      )}

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        onRetry={loadTasks}
        onAddTask={() => setIsModalOpen(true)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
      />

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        loading={creating}
      />
    </div>
  );
};

export default HomePage;