<template>
  <div>
    <section>
      <base-dialog
        :show="!!error"
        title="An Error Occurred"
        @close="handleError"
      >
        <p>{{ error }}</p></base-dialog
      >
      <coach-filter @change-filters="changeFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button
            link
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register As A Coach</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
            >Login to Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :id="coach.id"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
  import CoachItem from "../../components/coaches/CoachItem.vue";
  import CoachFilter from "../../components/coaches/CoachFilter.vue";
  export default {
    components: {
      CoachItem,
      CoachFilter,
    },
    data() {
      return {
        isLoading: false,
        filters: {
          frontend: true,
          backend: true,
          career: true,
        },
        error: null,
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isAuthenticated;
      },
      isCoach() {
        return this.$store.getters["coaches/isCoach"];
      },
      filteredCoaches() {
        const coaches = this.$store.getters["coaches/coaches"];
        return coaches.filter((coach) => {
          if (this.filters.frontend && coach.areas.includes("frontend")) {
            return true;
          }
          if (this.filters.backend && coach.areas.includes("backend")) {
            return true;
          }
          if (this.filters.career && coach.areas.includes("career")) {
            return true;
          }
          return false;
        });
      },
      hasCoaches() {
        return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
      },
    },
    created() {
      this.loadCoaches();
    },
    methods: {
      changeFilters(updatedFilters) {
        this.filters = updatedFilters;
      },

      async loadCoaches(refresh = false) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("coaches/loadCoaches", {
            forceRefresh: refresh,
          });
        } catch (e) {
          this.error = e.message || "Something went wrong";
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    },
  };
</script>
<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>
