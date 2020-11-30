<template>
  <div>
        <v-card :to="{name:'editService',params:{id:service.id}}"
            class="mt-4 card-service"
            outlined
            >
            <v-card-title>
                    <v-chip v-if="service.price>0" class="pink--text mr-3 darken-3">P {{service.price}}</v-chip>
                    <v-chip v-if="service.price==0" small color="success" class="white--text mr-3">free</v-chip>
                    <div class="promo-badge">
                        <v-badge content="on pro" v-if="service.promotionPercent>0" overlap color="blue lighten-1">
                        <v-avatar class="ml-2" color="blue lighten-3" size="50">
                        <span class="white--text headline">{{service.promotionPercent}}%</span>
                        </v-avatar>
                    </v-badge>
                    </div>
                {{service.name}}
            </v-card-title>
            <v-card-actions>
            <v-subheader>{{getDuration(service.estimateHours)}}</v-subheader>
             <v-spacer></v-spacer>
               <v-chip>
                     <v-btn icon>
                        <v-icon color="pink darken-3">
                                mdi-delete
                        </v-icon>
                    </v-btn>
            
                    <v-btn icon>
                        <v-icon color="primary darken-3">
                                mdi-pencil
                        </v-icon>
                    </v-btn>
                </v-chip>
            </v-card-actions>
               
  </v-card>
  </div>
</template>

<script>
import{getDuration} from '../../../SharedFunc'
import { mapActions } from 'vuex'
export default {
 props:['service'],
 methods:{
     ...mapActions(['AddToCart','Notify']),
     addToCart(item){
           const newItem = {
                productId:item.id,
                name:item.name,
                isService:true,
                quantity:1,
                price:item.price,
                promotionRate:item.promotionPercent,
                promotionPercent:item.promotionPercent
            };
            this.AddToCart(newItem);
          this.Notify({show:true,type:'success',text:`${item.name} added to cart successfully`})
     },
     getDuration(time){
         return getDuration(time);
     }
 }
}
</script>

<style lang="scss">
.card-service{
    position: relative;
    &:hover{
         background-color: rgba(233, 233, 233, 0.253);
    }
}
.promo-badge{
    position: absolute;
    right: -5px;
    top:-5px;
}
</style>