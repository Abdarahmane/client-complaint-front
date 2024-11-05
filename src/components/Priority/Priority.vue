<template>
  <div class="priority">
    <h1>Gestion des Priorités</h1>
    <!-- Pass priorities directly from the store -->
    <ListPriority :priorities="priorities" @priority-added="handlePriorityAdded" @priority-updated="handlePriorityUpdated" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import ListPriority from './ListPriority.vue';
import { usePriorityStore } from '../../store/priority';

export default {
  name: 'Priority',
  components: {
    ListPriority,
  },
  setup() {
    const priorityStore = usePriorityStore();

    // Fetch priorities when the component mounts
    priorityStore.fetchPriorities();

    // Access store properties and actions
    const { priorities, error, addPriority, updatePriority } = priorityStore;

    const handlePriorityAdded = (newPriority) => {
      addPriority(newPriority);
    };

    const handlePriorityUpdated = (updatedPriority) => {
      updatePriority(updatedPriority.id, updatedPriority);
    };

    return {
      priorities,
      error,
      handlePriorityAdded,
      handlePriorityUpdated,
    };
  },
};
</script>

<style scoped>
.priority {
  margin: 20px;
}
</style>
