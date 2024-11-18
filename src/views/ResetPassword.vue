<template>
  <div>
    <h1>Reset Password</h1>
    <form @submit.prevent="resetPassword">
      <div>
        <label>New Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input v-model="confirmPassword" type="password" required />
      </div>
      <button type="submit">Reset Password</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from '../services/axios';

export default {
  props: ['token'],
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: '',
    };
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords do not match.";
        return;
      }

      try {
        const response = await axios.post(`/auth/reset-password/${this.token}`, { password: this.password });
        this.message = response.data.message || "Password reset successfully!";
        this.$router.push('/login');
      } catch (error) {
        this.message = "An error occurred. Please try again.";
        console.error(error);
      }
    },
  },
};
</script>
