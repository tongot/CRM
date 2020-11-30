<template>
  <v-list-item @click="actionClick()">
    <v-list-item-avatar class="white--text" :color="getCol()">
      {{ `${data.data.firstName[0].toUpperCase()} ${data.data.lastName[0].toUpperCase()}` }}
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ `${data.data.firstName} ${data.data.lastName}` }}</v-list-item-title>
      <v-list-item-subtitle>{{ data.data.email }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action v-if="!data.isSelect">
      <v-btn icon :to="{ name: data.link, params: { id: data.data.id } }">
        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';
import { getColor } from '../../../SharedFunc';
export default {
  props: ['data'],
  data: () => ({
    colors: ['red', 'black', 'teal', 'orange', 'blue'],
  }),
  methods: {
    ...mapActions(['OpenModalSelectCustomer', 'SetCustomer', 'OpenModalSelectEmployee', 'SetEmployee']),
    getCol() {
      return getColor();
    },
    actionClick() {
      if (this.data.isSelect && this.data.from == 'customer') {
        //used if we are picking customer
        this.SetCustomer({ customer: this.data.data });
        this.OpenModalSelectCustomer();
      } else if (this.data.isSelect && this.data.from == 'employee') {
        //used if we are picking employee
        this.SetEmployee({ employee: this.data.data });
        this.OpenModalSelectEmployee();
      } else {
        this.$router.push({ name: this.data.detailLink, params: { id: this.data.data.id } });
      }
    },
  },
};
</script>

<style></style>
