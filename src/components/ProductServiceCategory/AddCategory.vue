<template>
  <div>
      <v-form ref="formAdd">
      <v-card flat>
          <v-card-title>Add Category
              <v-spacer></v-spacer>
              <v-btn color="success" :to="{name:'listProductCategory'}" icon>
                  <v-icon color="error">mdi-close</v-icon>
              </v-btn>
          </v-card-title>
          <v-card-text>
              <v-alert v-if="get_errorCategory!=null" type="error">{{get_errorCategory}}</v-alert>
              <v-text-field :rules="[reqiured]" label="Name" outlined v-model="category.name"></v-text-field>
              <v-textarea v-model="category.description" outlined=""></v-textarea>
              <v-switch label="save as service category" as="" service="" category="" v-model="category.isService"></v-switch>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="get_loadCategory" @click.prevent="addCategory()" color="success" depressed>
                  <v-icon>mdi-save</v-icon>
                  save
              </v-btn>
          </v-card-actions>
      </v-card>
      </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
data:()=>({
    category:{
        name:'',
        description:'',
        isService:false
    },
    reqiured:v=>!!v||"Name is reqiured",
}),
methods:{
        ...mapActions(['AddCategory']),
        addCategory(){
            if(this.$refs.formAdd.validate()){
                this.AddCategory(this.category);
            }
        }
    },
computed:mapGetters(['get_loadCategory','get_errorCategory'])
}
</script>

<style>

</style>