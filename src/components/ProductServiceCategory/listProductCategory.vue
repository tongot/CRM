<template>
  <div>
        <v-card flat>
        <v-card-text>
        <v-text-field
        append-icon="mdi-magnify"
        placeholder="Service Name"
         v-model="search.text"
        @keyup="searchField()"
        >
        </v-text-field>
        </v-card-text>
    </v-card>
      <categoryItem v-for="item in get_Categories" :key="item.id" :data="item"/>  
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import categoryItem from './CategoryItem'
export default {
    components:{
        categoryItem
    },
    data:()=>({
         search:{
        page:1,
        text:'',
    }
    }),
    methods:{
        ...mapActions(['GetProductCategories']),
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
                this.GetProductCategories(this.search)
                return
            },1000)
    }
    },
    computed:mapGetters(['get_Categories']),
    mounted(){
        this.GetProductCategories(this.search)
    }
}
</script>

<style>

</style>