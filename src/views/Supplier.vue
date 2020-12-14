<template>
  <div>
    <v-toolbar elevation="1">
      <v-toolbar-title>
        <v-btn :loading="get_loadSupplier" :to="{ name: 'listSuppliers' }" text large>
          Suppliers
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'addSupplier' }" text>
        <v-icon>mdi-plus</v-icon>
        New
      </v-btn>
    </v-toolbar>
    <div class="mt-1">
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInLeft animate__fast"
        leave-active-class="animate__animated animate__fadeOutRight animate__fast"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['get_loadSupplier']),
};
</script>

<style></style>
