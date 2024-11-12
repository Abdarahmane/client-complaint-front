<template>
  <div class="category">
   
    <!-- Pass categories directly from the store -->
    <ListCategory :categories="categories" @category-added="handleCategoryAdded" @category-updated="handleCategoryUpdated" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import ListCategory from './ListCategory.vue';
import { useCategoryStore } from '../../store/categoryStore';

export default {
  name: 'Category',
  components: {
    ListCategory,
  },
  setup() {
    const categoryStore = useCategoryStore();

    // Fetch categories when the component mounts
    categoryStore.fetchCategories();

    // Access store properties and actions
    const { categories, error, addCategory, updateCategory } = categoryStore;

    const handleCategoryAdded = (newCategory) => {
      addCategory(newCategory);
    };

    const handleCategoryUpdated = (updatedCategory) => {
      updateCategory(updatedCategory.id, updatedCategory);
    };

    return {
      categories,
      error,
      handleCategoryAdded,
      handleCategoryUpdated,
    };
  },
};
</script>
