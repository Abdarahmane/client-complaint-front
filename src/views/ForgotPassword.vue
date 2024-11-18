<template>
  <div>
    <h1>Forgot Password</h1>
    <form @submit.prevent="requestReset">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <button type="submit">Send Reset Link</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from '../services/axios';

export default {
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    async requestReset() {
      try {
        const response = await axios.post('/auth/forgot-password', { email: this.email });
        this.message = response.data.message || "If the email exists, a reset link will be sent.";
      } catch (error) {
        this.message = "An error occurred. Please try again.";
        console.error(error);
      }
    },
  },
};
</script>
