<template>
  <div>
         <v-toolbar height="50" flat dark color="grey lighten-3">
        <v-toolbar-title class="black--text">{{`${title} Categories`}}</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn depresses="" :to="{name:'listProductCategory'}" @click="title='Product'" color="black" small text="">Product</v-btn>
          <v-btn depresses="" :to="{name:'listServiceCategory'}" @click="title='Servcie'" color="black" small text="">Service</v-btn>
      </v-toolbar>
      <div>
            <transition mode="out-in" 
                enter-active-class="animate__animated animate__fadeInRight animate__fast"
                leave-active-class="animate__animated animate__fadeOutLeft animate__fast"
                >
                <router-view></router-view>
              </transition>
      </div>
     
  </div>
</template>

<script>
export default {
  data:()=>({
    title:"",
  }),
  created(){
    this.title="Product";
  }
}
</script>

<style>

</style>