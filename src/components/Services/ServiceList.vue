<template>
<div class="container"> 
    <v-card  flat class="mx-auto" max-width="1000">
          <v-card flat>
          <v-card-text>
               <v-text-field
                append-icon="mdi-magnify"
                placeholder="search key word"
                v-model="search.text"
                @keyup="searchField()"
        >
         </v-text-field>
          </v-card-text>
       
      </v-card>

    <div>
        <ServiceItem v-for="service in get_Services" :key="service.id" :service="service"/>
  </div>
  <div>
         <v-pagination v-model="search.page" :length="get_ServicePages" @input="SearchBtn()" circle ></v-pagination>
  </div>
    </v-card>
     
</div>
 
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import ServiceItem from './ServiceItem'
export default {
data:()=>({
    search:{
        page:1,
        text:'',
    }
}),
components:{
    ServiceItem
},
methods:{
    ...mapActions(['GetServices'])
    ,SearchBtn(){
       this.GetServices(this.search) 
    },
    searchField(){
        if(this.search.text.length>=3){
           this.searchFunc();
           
        }
        if(this.search.text.length==''){
            this.searchFunc();
        }
    },
    searchFunc(){
           setTimeout(()=>{
                this.search.page=1;
                this.GetServices(this.search)
                return
            },1000)
    }
},
computed:mapGetters(['get_Services','get_ServicePages']),
mounted(){
    this.GetServices({page:1,text:''})
}
}
</script>

<style scoped>
    .container{
        width: 100%;
    }
</style>