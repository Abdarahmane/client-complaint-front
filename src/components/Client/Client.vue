<template>
  <div class="client">
    
    <!-- Pass clients directly from the store -->
    <ListClient :clients="clients" @client-added="handleClientAdded" @client-updated="handleClientUpdated" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import ListClient from './ListClient.vue';
import { useClientStore } from '../../store/clientStore';

export default {
  name: 'Client',
  components: {
    ListClient,
  },
  setup() {
    const clientStore = useClientStore();

    // Fetch clients when the component mounts
    clientStore.fetchClients();

    // Access store properties and actions
    const { clients, error, addClient, updateClient } = clientStore;

    const handleClientAdded = (newClient) => {
      addClient(newClient);
    };

    const handleClientUpdated = (updatedClient) => {
      updateClient(updatedClient.id, updatedClient);
    };

    return {
      clients,
      error,
      handleClientAdded,
      handleClientUpdated,
    };
  },
};
</script>
