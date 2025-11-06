import tasksData from "@/services/mockData/tasks.json";

// Local storage key
const STORAGE_KEY = "taskflow_tasks";

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
  }
};

// Get tasks from localStorage
const getStoredTasks = () => {
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(stored);
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Simulate async operation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    const tasks = getStoredTasks();
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  },

async create(taskData) {
    await delay(400);
    const tasks = getStoredTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const now = new Date().toISOString();
    
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description,
      completed: false,
      priority: taskData.priority || "Medium",
      categoryId: taskData.categoryId || null,
      createdAt: now,
      updatedAt: now,
      dueDate: taskData.dueDate || null
    };

    const updatedTasks = [...tasks, newTask];
    saveTasksToStorage(updatedTasks);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    saveTasksToStorage(tasks);
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(task => task.Id !== parseInt(id));
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found");
    }

    saveTasksToStorage(filteredTasks);
    return { success: true };
  }
};