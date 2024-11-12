<template>
  <div class="complaint">
    <!-- <h1>Gestion des Plaintes</h1> -->
    <!-- Pass complaints directly from the store -->
    <ListComplaint :complaints="complaints" @complaint-added="handleComplaintAdded" @complaint-updated="handleComplaintUpdated" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import ListComplaint from './ListComplaint.vue';
import { useComplaintStore } from '../../store/complaintStore';

export default {
  name: 'Complaint',
  components: {
    ListComplaint,
  },
  setup() {
    const complaintStore = useComplaintStore();

    // Fetch complaints when the component mounts
    complaintStore.fetchComplaints();

    // Access store properties and actions
    const { complaints, error, addComplaint, updateComplaint } = complaintStore;

    const handleComplaintAdded = (newComplaint) => {
      addComplaint(newComplaint);
    };

    const handleComplaintUpdated = (updatedComplaint) => {
      updateComplaint(updatedComplaint.id, updatedComplaint);
    };

    return {
      complaints,
      error,
      handleComplaintAdded,
      handleComplaintUpdated,
    };
  },
};
</script>

<style scoped>
.complaint {
  margin: 20px;
}
</style>
