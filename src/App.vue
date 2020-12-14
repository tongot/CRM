<template>
  <v-app>
    <SnackBar />
    <sideBar v-if="get_user != null" />
    <v-app-bar app color="primary" dark clipped-left>
      <v-toolbar-title>Xpert-Appo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text="" @click="LogOut()">
        <v-icon>mdi-logout</v-icon>
        Signout
      </v-btn>
    </v-app-bar>

    <v-main>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInDown animate__fast"
        leave-active-class="animate__animated animate__fadeOutUp animate__fast"
      >
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
//import Cart from './components/Cart/CartMenu'
import SnackBar from './components/Notify/SnackBar';
import sideBar from './components/Menu/SideMenueBar';
export default {
  name: 'App',
  components: {
    //Cart,
    SnackBar,
    sideBar,
  },

  data: () => ({}),
  methods: { ...mapActions(['GetUserDetails', 'LogOut']) },
  computed: mapGetters(['get_ItemsCount', 'get_user']),
  mounted() {
    this.GetUserDetails();
  },
};
</script>
