<template>
<div class="app-container">
    <div class="table-container">
        <div v-for="(tables, index) in tableCounter" :key="index">
            <v-card
            elevation="5"
            >
            <v-card-title>Table {{index}}</v-card-title>
            <v-card-text>Please enter guest names.</v-card-text>
            <AddUserInputField :randomMeatMenu="meatOptions"/>
            </v-card>
        </div>
    </div>
      <v-btn
      class="mx-2 add-table-button"
      fab
      dark
      color="indigo"
      fixed 
      bottom
      right
      @click="tableCounter += 1"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import AddUserInputField from '~/components/AddUserInputField';

export default {
    data() {
        return {
            tableCounter: [1]
        }
    },

    components: {
    AddUserInputField
    },

    asyncData({ params, error }) {
        return axios
        .get(`https://baconipsum.com/api/?type=all-meat&paras=5&sentence=1`)
        .then(res => {
            return { meatOptions: res.data }
            // this.meatOptions = res.data;
        })
        .catch(e => {
            error({ statusCode: 404, message: 'Post not found' })
        })
    }

}
</script>

<style lang="scss">

.app-container {
    .add-table-button {
        z-index: 99;
        bottom: 50px;
    }
    .table-container {
        display: grid;
        grid-gap: 0.6rem;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
}
</style>