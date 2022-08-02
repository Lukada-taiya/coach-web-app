<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An Error Occurred"
      @close="handleError"
    >{{ error }}</base-dialog>
    <section>
      <base-card>
        <header>
          <h3>Requests Received</h3>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="req in requests"
            :key="req.id"
            :email="req.email"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>No requests received yet</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
  import RequestItem from "../../components/requests/RequestItem.vue";
  export default {
    components: {
      RequestItem,
    },
    data() {
      return {
        error: null,
        isLoading: false,
      };
    },
    computed: {
      requests() {
        return this.$store.getters["requests/getRequests"];
      },
      hasRequests() {
        return !this.isLoading && this.$store.getters["requests/hasRequests"];
      },
    },
    methods: {
      handleError() {
        this.error = null;
      },
    },
    async created() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadRequests");
      } catch (e) {
        this.error = e.message || "Something went wrong";
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  };
</script>
<style scoped>
  header {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
  }
</style>
