import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ onSubmit, onCancel, loading = false, initialData = null }) => {
const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || "Medium",
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Task Title *
        </label>
        <Input
          id="title"
          placeholder="Enter task title..."
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          disabled={loading}
          className="text-base"
        />
        {errors.title && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-error"
          >
            {errors.title}
          </motion.p>
        )}
</div>

        {/* Priority Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['High', 'Medium', 'Low'].map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => handleChange('priority', priority)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                  formData.priority === priority
                    ? priority === 'High' 
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : priority === 'Medium'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <ApperIcon 
                  name={priority === 'High' ? 'AlertTriangle' : priority === 'Medium' ? 'Clock' : 'Info'} 
                  className="w-4 h-4" 
                />
                <span className="text-sm font-medium">{priority}</span>
              </button>
            ))}
          </div>
        </div>
      {/* Due Date Field */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
          Due Date (Optional)
        </label>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className={`w-full ${errors.dueDate ? "border-error focus:ring-error" : ""}`}
            placeholder="Select due date"
          />
        </motion.div>
        {errors.dueDate && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-error text-xs mt-1 flex items-center space-x-1"
          >
            <ApperIcon name="AlertCircle" className="w-3 h-3" />
            <span>{errors.dueDate}</span>
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <Textarea
          id="description"
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={errors.description}
          disabled={loading}
          rows={4}
          className="text-base"
        />
        {errors.description && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-error"
          >
            {errors.description}
          </motion.p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {formData.description.length}/500 characters
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
disabled={loading || !formData.title.trim()}
          className="flex items-center space-x-2"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ApperIcon name="Loader" className="w-4 h-4" />
              </motion.div>
              <span>Creating...</span>
</>
          ) : (
            <>
              <ApperIcon name={initialData ? "Save" : "Plus"} className="w-4 h-4" />
              <span>{initialData ? 'Save Changes' : 'Create Task'}</span>
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default TaskForm;