<template>
  <section>
    <base-dialog
      title="An Error Occurred"
      :show="!!error"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <base-card>
      <base-dialog fixed :show="isLoading" title="Authenticating...">
        <base-spinner></base-spinner>
      </base-dialog>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <base-button>{{ toggleMainButton }}</base-button>
        <base-button type="button" mode="flat" @click="switchButtons">{{
          toggleFlatButton
        }}</base-button>
      </form>
      <p v-if="!formIsValid">
        Please fill out all fields. (Password must be less than 6)
      </p>
    </base-card>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        formIsValid: true,
        mode: "login",
        error: null,
        isLoading: false,
      };
    },
    computed: {
      toggleMainButton() {
        if (this.mode === "login") {
          return "Login";
        } else {
          return "Sign Up";
        }
      },
      toggleFlatButton() {
        if (this.mode === "signup") {
          return "Login instead";
        } else {
          return "Signup instead";
        }
      },
    },
    methods: {
      async submitForm() {
        this.isLoading = true;
        this.formIsValid = true;
        if (
          this.email === "" ||
          !this.email.includes("@") ||
          this.password.length < 6
        ) {
          this.formIsValid = false;
          return;
        }
        try {
          if (this.mode === "login") {
            await this.$store.dispatch("login", {
              email: this.email,
              password: this.password,
            });
          } else {
            await this.$store.dispatch("signUp", {
              email: this.email,
              password: this.password,
            });
          }
          const url = "/" + (this.$route.query.redirect || "coaches");
          this.$router.replace(url);
        } catch (e) {
          this.error = e.message || "Failed to authenticate. Try again later";
          this.isLoading = false;
        }

        this.isLoading = false;
      },
      switchButtons() {
        if (this.mode === "login") {
          this.mode = "signup";
        } else {
          this.mode = "login";
        }
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
</style>
