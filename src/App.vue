<template>
  <v-app>
    <SnackBar />
    <sideBar />
    <v-app-bar app color="primary" dark clipped-left>
      <v-toolbar-title>Saloon</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-menu :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-badge overlap :content="get_ItemsCount" bordered>
        </v-badge>
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-cart
          </v-icon>
        </v-btn>
      </template>
      <Cart/>
      </v-menu> -->
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
  methods: { ...mapActions(['GetUserDetails']) },
  computed: mapGetters(['get_ItemsCount']),
  mounted() {
    this.GetUserDetails();
  },
};
</script>
