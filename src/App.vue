<template>
  <div>
    <v-overlay :value="get_login_loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-app v-if="get_user != null">
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
    <v-app v-if="get_user == null">
      <div class="landing" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
        <landing-nav v-if="get_login_loading == false" />
        <v-main>
          <div>
            <transition
              mode="out-in"
              enter-active-class="animate__animated animate__fadeInDown animate__fast"
              leave-active-class="animate__animated animate__fadeOutUp animate__fast"
            >
              <router-view></router-view>
            </transition>
          </div>
        </v-main>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
//import Cart from './components/Cart/CartMenu'
import SnackBar from './components/Notify/SnackBar';
import sideBar from './components/Menu/SideMenueBar';
import LandingNav from './components/Landing/LandingNav.vue';
export default {
  name: 'App',
  components: {
    //Cart,
    SnackBar,
    sideBar,
    LandingNav
  },

  data: () => ({
    dialog: true,
    drawer: false,
    landingRoutes: ['Landing', 'landing-home', 'landing-features', 'landing-pricing', 'landing-works', 'landing-demo'],
    image: require('@/assets/landingcurve.png')
  }),
  methods: {
    ...mapActions(['GetUserDetails', 'LogOut']),

    checkRoute() {
      if (this.get_user == null) {
        return false;
      }
      return true;
    }
  },
  computed: mapGetters(['get_ItemsCount', 'get_user', 'get_login_loading']),
  mounted() {
    if (!this.landingRoutes.includes(this.$route.name)) {
      this.GetUserDetails();
    }
    if (this.landingRoutes.includes(this.$route.name) || this.$route.name == 'login') {
      this.GetUserDetails().then(() => {
        console.log(this.get_user);
        if (this.get_user != null) {
          this.$router.push({ name: 'Home' });
        }
      });
    }
    if (this.$route.name == 'Landing') {
      this.$router.push({ name: 'landing-home' });
    }
  }
};
</script>

<style lang="scss" scoped>
.landing {
  height: 100vh;
  background-size: 100%;
  background-color: hsla(39, 93%, 28%, 0.1);
}
</style>
