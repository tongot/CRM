<template>
  <div>
    <v-list-item>
        <v-list-item-title>
            <v-chip color="primary" class="white--text">P {{item.price.toFixed(2)}} X {{item.quantity}} 
                <v-chip class="ml-2">{{item.totalPrice.toFixed(2)}}</v-chip></v-chip>
            {{item.name}}
            </v-list-item-title>
            <v-list-item-action>
                <v-btn color="success" @click="PlusQuantity(index)" icon>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon @click="MinusQuantity(index)" color="error">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
            </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:["item","index"],
    methods:{
        ...mapActions(['PlusQuantity','MinusQuantity']),
    }
}
</script>

<style>

</style>