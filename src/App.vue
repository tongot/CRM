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
      <v-menu v-if="get_user != null" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item-group>
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-title>
                <v-avatar color="red" class="darken-3">
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
                {{ get_user.email }}</v-list-item-title
              >
            </v-list-item>
          </v-list-item-group>
        </template>
        <v-card>
          <v-card-text class="d-flex">
            <v-btn @click="LogOut()" text class="mr-1">
              <v-icon>
                mdi-logout
              </v-icon>
              logout</v-btn
            >
            <v-btn depressed>
              <v-icon>mdi-lock</v-icon>
              change password</v-btn
            >
          </v-card-text>
        </v-card>
      </v-menu>
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
