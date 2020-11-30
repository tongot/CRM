<template>
<div>
       <v-toolbar>
          <v-toolbar-title>
              <v-btn :loading="get_loadCategory" text large>
                  Product and Service Categories
              </v-btn>
          </v-toolbar-title>
             <v-spacer></v-spacer>
          <v-btn text :to="{name:'newCategory'}">
              <v-icon>mdi-plus</v-icon>
              New
          </v-btn>
      </v-toolbar>
      <div class="container">
          <v-card flat class="mx-auto"  max-width="1000">
               <transition mode="out-in" 
                enter-active-class="animate__animated animate__fadeInLeft animate__fast"
                leave-active-class="animate__animated animate__fadeOutRight animate__fast"
                >
                <router-view></router-view>
              </transition>
          </v-card>
      </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
computed:mapGetters(['get_loadCategory'])
}
</script>

<style>
 .container{
   width: 100%;
 }
</style>