<template>
  <div>
      <v-card width="400" class="pa-1">
        <v-card-title>Items to pay</v-card-title>
        <v-card-text>
         <CartItems/>
        </v-card-text>
        <v-divider></v-divider>
         <v-card flat>
             <v-card-title>Total: <v-spacer></v-spacer>P {{get_TotalPrice.toFixed(2)}}</v-card-title>
         </v-card>
        <v-divider></v-divider>
        <v-card-actions v-if="get_ItemsCount>0">
           <v-btn depressed color="error">
                <v-icon>mdi-cancel</v-icon>
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-badge  overlap :content="get_ItemsCount">
             <v-btn depressed color="success" :to="{name:'pay-point'}">
                <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                Checkout
            </v-btn>
            </v-badge>
           
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartItems from './CartItems'
export default {
 components:{
   CartItems
 },
    computed:mapGetters(['get_TotalPrice','get_ItemsCount'])
}
</script>

<style>

</style>