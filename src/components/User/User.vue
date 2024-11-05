<template>
  <div class="user">
    <h1>Gestion des Utilisateurs</h1>
    <!-- Pass users directly from the store -->
    <ListUser :users="users" @user-added="handleUserAdded" @user-updated="handleUserUpdated" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import ListUser from './ListUser.vue';
import { useUserStore } from '../../store/user';

export default {
  name: 'User',
  components: {
    ListUser,
  },
  setup() {
    const userStore = useUserStore();

    // Fetch users when the component mounts
    userStore.fetchUsers();

    // Access store properties and actions
    const { users, error, addUser, updateUser } = userStore;

    const handleUserAdded = (newUser) => {
      addUser(newUser);
    };

    const handleUserUpdated = (updatedUser) => {
      updateUser(updatedUser.id, updatedUser);
    };

    return {
      users,
      error,
      handleUserAdded,
      handleUserUpdated,
    };
  },
};
</script>

<style scoped>
.user {
  margin: 20px;
}
</style>
