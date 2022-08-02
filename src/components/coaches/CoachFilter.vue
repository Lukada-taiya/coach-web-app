<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" checked id="frontend" @change="setFilters" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" checked id="backend" @change="setFilters" />
      <label for="frontend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" checked id="career" @change="setFilters" />
      <label for="frontend">Career</label>
    </span>
  </base-card>
</template>
<script>
  export default {
    emits: ["change-filters"],
    data() {
      return {
        filters: {
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },
    methods: {
      setFilters(event) {
        const inputId = event.target.id;
        const isActive = event.target.checked;
        const updatedFilters = {
          ...this.filters,
          [inputId]: isActive,
        };
        this.filters = updatedFilters;
        this.$emit("change-filters", updatedFilters);
      },
    },
  };
</script>
