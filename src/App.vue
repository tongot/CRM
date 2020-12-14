<template>
  <v-app>
    <SnackBar />
    <v-navigation-drawer v-model="drawer" v-if="get_user != null" app clipped>
      <sideBar />
    </v-navigation-drawer>
    <v-app-bar app color="red" class="darken-4" flat dark clipped-left>
      <v-btn v-if="get_user != null" @click="drawer = !drawer" icon>
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>

      <v-toolbar-title> Xpert-Appo</v-toolbar-title>
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

  data: () => ({
    drawer: false,
  }),
  methods: { ...mapActions(['GetUserDetails', 'LogOut']) },
  computed: mapGetters(['get_ItemsCount', 'get_user']),
  mounted() {
    this.GetUserDetails();
  },
};
</script>
