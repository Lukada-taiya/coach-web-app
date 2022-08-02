<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="inputValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="inputValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="inputValidity('description')"
      />
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model.number="rate.val"
        @blur="inputValidity('rate')"
      />
      <p v-if="!rate.isValid">Hourly Rate must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="areas"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="inputValidity('areas')"
        />
        <label for="areas">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="areas"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="inputValidity('areas')"
        />
        <label for="areas">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="areas"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="inputValidity('areas')"
        />
        <label for="areas">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">You must check at least one field.</p>
    </div>
    <p v-if="!isFormValid">
      Please recheck your entries. None of the fields must be empty
    </p>
    <base-button>Submit</base-button>
  </form>
</template>

<script>
  export default {
    emits: ["form-data"],
    data() {
      return {
        firstName: {
          val: "",
          isValid: true,
        },
        lastName: {
          val: "",
          isValid: true,
        },
        rate: {
          val: null,
          isValid: true,
        },
        description: {
          val: "",
          isValid: true,
        },
        areas: {
          val: [],
          isValid: true,
        },
        isFormValid: true,
      };
    },
    methods: {
      inputValidity(input) {
        this[input].isValid = true;
      },
      validateForm() {
        if (this.firstName.val === "") {
          this.firstName.isValid = false;
          this.isFormValid = false;
        }
        if (this.lastName.val === "") {
          this.lastName.isValid = false;
          this.isFormValid = false;
        }
        if (this.description.val === "") {
          this.description.isValid = false;
          this.isFormValid = false;
        }
        if (!this.rate.val || this.rate.val < 0) {
          this.rate.isValid = false;
          this.isFormValid = false;
        }
        if (this.areas.val.length === 0) {
          this.areas.isValid = false;
          this.isFormValid = false;
        }
      },
      submitForm() {
        this.validateForm();
        if (!this.isFormValid) {
          this.isFormValid = true;
          return;
        }
        const formData = {
          first: this.firstName.val,
          last: this.lastName.val,
          desc: this.description.val,
          rate: this.rate.val,
          areas: this.areas.val,
        };

        this.$emit("form-data", formData);
      },
    },
  };
</script>
<style scoped>
  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="checkbox"] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
  }

  input:focus,
  textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }

  input[type="checkbox"] {
    display: inline;
    width: auto;
    border: none;
  }

  input[type="checkbox"]:focus {
    outline: #3d008d solid 1px;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .invalid label {
    color: red;
  }

  .invalid input,
  .invalid textarea {
    border: 1px solid red;
  }
</style>
