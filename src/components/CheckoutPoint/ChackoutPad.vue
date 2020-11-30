<template>
  <div>
      <v-card>
          <v-card-text>
              <v-text-field
              append-icon="mdi-cash"
              label="Amount to pay"
              disabled
              v-model="get_TotalPrice"
              ></v-text-field>
              <v-text-field
              append-icon="mdi-cash"
              label="Amount Cashed"
              v-model="amountPaid"
              ></v-text-field>
               <v-text-field
              append-icon="mdi-cash"
              label="Change"
              disabled
              v-model="change"
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="cancel()" depressed="">
                  <v-icon>mdi-cancel</v-icon>
                  Cancel
              </v-btn>
                <v-btn :loading="get_loadingTrans" @click="pay()" color="success" :disabled="canPay" depressed="">
                  <v-icon>mdi-cash</v-icon>
                  Pay
              </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data:()=>({
        amountPaid:'',
    }),
    methods:{
        ...mapActions(['ClearCart','Transact']),
        cancel(){
            this.ClearCart();
            this.$router.push({name:'serviceList'});
        },
        pay(){
         const trans = {
             transBy : this.get_user.id,
             amountPaid: this.amountPaid,
             totalAmount:this.get_TotalPrice,
             change:this.change,
         }
         this.Transact(trans)
        }

    },
computed:{
    ...mapGetters(['get_TotalPrice','get_user','get_loadingTrans']),
    change(){
        return this.amountPaid>=0||this.amountPaid!=''?parseFloat((this.amountPaid-this.get_TotalPrice).toFixed(2)):'';
    },
    canPay(){
       return this.change>0?false:true;
    }
}
}
</script>

<style>

</style>