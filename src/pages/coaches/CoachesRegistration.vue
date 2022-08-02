<template>
  <div>
    <base-dialog :show="!!error" title="An Error Occurred" @close="handleError">
      {{ error }}
    </base-dialog>
    <section>
      <base-card>
        <h2>Register As A Coach</h2>
        <base-spinner v-if="isLoading"></base-spinner>
        <coach-form @form-data="saveData" v-else></coach-form>
      </base-card>
    </section>
  </div>
</template>
<script>
  import CoachForm from "../../components/coaches/CoachForm.vue";
  export default {
    components: {
      CoachForm,
    },
    data() {
      return {
        isLoading: false,
        error: null,
      };
    },
    methods: {
      async saveData(data) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("coaches/saveFormData", data);
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
