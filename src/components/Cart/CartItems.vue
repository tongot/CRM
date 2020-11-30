<template>
  <div>
       <v-list dense>
                  <CartItem v-for="(item,index) in get_CartItems" :key="item.id" :item="item" :index="index"/>
          </v-list>
  </div>
</template>

<script>
import CartItem from './CartItem'
import { mapGetters } from 'vuex'
export default {
    components:{
        CartItem
    },
    computed:mapGetters(['get_CartItems'])
}
</script>

<style>

</style>