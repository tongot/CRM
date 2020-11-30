<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <v-btn :loading="get_loadBrand" :to="{ name: 'listBrand' }" text large>
          Brands
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'addBrand' }" text>
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
  computed: mapGetters(['get_loadBrand']),
};
</script>

<style></style>
