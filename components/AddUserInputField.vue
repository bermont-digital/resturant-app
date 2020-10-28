
<template>
  <form class="pa-3">
    <v-expansion-panels v-if="guests.length">
    <v-expansion-panel
      v-for="(guest, index) in guests" :key="index"
    >
      <v-expansion-panel-header>
        <div class="mr-2">{{guest.name}}</div>
        <span class="ml-auto">
          <v-btn @click="remove(index)"
          depressed
          elevation="2"
          icon
          outlined
          x-small
          >
          <v-icon dark>
            mdi-minus
          </v-icon>
          </v-btn>
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="main-menu-container">
          <p class="overline font-weight-black custom-border-bottom">Main Menu</p>
          <p class="body-2">{{guest.randomMenu}}</p>
          <p class="overline font-weight-black custom-border-bottom">Drinks Menu</p>
          <p class="body-2">Randomly Generated drinks. Find API</p>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <p v-else> No guests currently assigned to this table</p>
    <v-text-field
      v-model="name"
      @keypress.enter="add(name)"
      :error-messages="nameErrors"
      :counter="50"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-btn
      class="mr-4"
      @click="add"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "AddUserInputField",
  data() {
    return {
      guests: [],
      name: "",
    };
  },
  props: {
    randomMeatMenu: {
      type: Array,
    },
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(50) },
  },
  methods: {
    add(name) {
      if (this.name !== "") {
        // Generates a random number for menu selection
        const chosenNumber = Math.floor(
          Math.random() * this.randomMeatMenu.length
        );
        // Pushes object to the empty guest array
        this.guests.push({
          name: this.name,
          randomMenu: this.randomMeatMenu[chosenNumber],
        });
        this.$v.$reset();
        this.name = "";
      } else {
        alert("Please input the guests name");
      }
    },
    remove(index) {
      this.guests.splice(index, 1);
    },
    clear() {
      this.$v.$reset();
      this.name = "";
    },
  },
  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },
};
</script>

<style lang="scss">

.custom-border-bottom {
  border-bottom: 1px solid #494949;
}
.v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
  flex: unset;
}

.v-application--is-ltr .v-expansion-panel-header__icon {
  margin-left: 10px;
}

.v-item-group {
  max-height: 60vh;
  overflow-y: scroll;

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #1f1f1f;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgb(168, 12, 12);
  }
}
</style>