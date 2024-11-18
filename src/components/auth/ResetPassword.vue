<template>
  <div class="reset-password">
    <h1>Reset Password</h1>
    <form @submit.prevent="submitReset">
      <div class="form-group">
        <label for="password">New Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your new password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirm your new password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Reset Password</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitReset() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      try {
        const token = this.$route.params.token; // Get token from the URL
        await axios.post("http://localhost:3000/auth/reset-password", {
          token,
          password: this.password,
        });
        this.$router.push({ name: "Login" }); // Redirect to Login after success
      } catch (error) {
        this.errorMessage = "Failed to reset password. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.reset-password {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
