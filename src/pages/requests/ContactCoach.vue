<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An Error Occurred"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <base-spinner v-if="isLoading"></base-spinner>
    <form @submit.prevent="submitForm" v-else>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <div class="form-control">
          <label for="message">Message:</label>
          <textarea rows="5" id="message" v-model="message" />
        </div>
      </div>
      <p v-if="!isFormValid" class="errors">Please all fields are required</p>
      <div class="actions"><base-button>Send Message</base-button></div>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        email: "",
        message: "",
        isFormValid: true,
        error: null,
        isLoading: false,
      };
    },
    methods: {
      validateForm() {
        if (
          this.email === "" ||
          !this.email.includes("@") ||
          this.message === ""
        ) {
          this.isFormValid = false;
        }
      },
      async submitForm() {
        this.isLoading = true;
        this.isFormValid = true;
        this.validateForm();
        if (this.isFormValid == false) {
          return;
        }
        try {
          await this.$store.dispatch("requests/addRequest", {
            id: this.$route.params.id,
            email: this.email,
            message: this.message,
          });
        } catch (e) {
          this.error = e.message || "Something went wrong";
          this.isLoading = false;
          return;
        }
        this.$router.replace("/coaches");
      },
      handleError() {
        this.error = null;
      },
    },
  };
</script>

<style scoped>
  form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
  }

  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
  }

  input:focus,
  textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }

  .errors {
    font-weight: bold;
    color: red;
  }

  .actions {
    text-align: center;
  }
</style>
