// Category Service - Mock implementation using localStorage
const CATEGORIES_KEY = 'taskflow_categories';

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredCategories = () => {
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    return stored ? JSON.parse(stored) : getDefaultCategories();
  } catch (error) {
    console.warn('Failed to parse stored categories, using defaults');
    return getDefaultCategories();
  }
};

const saveCategoriesToStorage = (categories) => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories to localStorage:', error);
  }
};

const getDefaultCategories = () => [
  { Id: 1, name: 'Work', color: '#2D9CDB' },
  { Id: 2, name: 'Personal', color: '#27AE60' },
  { Id: 3, name: 'Urgent', color: '#EB5757' },
  { Id: 4, name: 'Project', color: '#F2994A' }
];

// Service object
const categoryService = {
  // Get all categories
  async getAll() {
    await delay(200);
    const categories = getStoredCategories();
    return categories.map(category => ({ ...category }));
  },

  // Get category by ID
  async getById(id) {
    await delay(150);
    const categories = getStoredCategories();
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  // Create new category
  async create(categoryData) {
    await delay(300);
    const categories = getStoredCategories();
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color || '#2D9CDB'
    };

    const updatedCategories = [...categories, newCategory];
    saveCategoriesToStorage(updatedCategories);
    return { ...newCategory };
  },

  // Update existing category
  async update(id, updates) {
    await delay(250);
    const categories = getStoredCategories();
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id));
    
    if (categoryIndex === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }

    const updatedCategory = {
      ...categories[categoryIndex],
      ...updates
    };

    categories[categoryIndex] = updatedCategory;
    saveCategoriesToStorage(categories);
    return { ...updatedCategory };
  },

  // Delete category
  async delete(id) {
    await delay(200);
    const categories = getStoredCategories();
    const filteredCategories = categories.filter(c => c.Id !== parseInt(id));
    
    if (filteredCategories.length === categories.length) {
      throw new Error(`Category with ID ${id} not found`);
    }

    saveCategoriesToStorage(filteredCategories);
    return true;
  }
};

export default categoryService;