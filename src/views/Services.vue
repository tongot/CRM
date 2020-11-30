<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>servicies </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'newService' }" text>
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
export default {};
</script>

<style></style>
