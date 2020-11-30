<template>
  <div v-if="get_Category!=null">
      <v-form ref="formEdit">
      <v-card flat>
          <v-card-title>Add Category
              <v-spacer></v-spacer>
              <v-btn color="success" :to="{name:'listProductCategory'}" icon>
                  <v-icon color="error">mdi-close</v-icon>
              </v-btn>
          </v-card-title>
          <v-card-text>
              <v-alert v-if="get_errorCategory!=null" type="error">{{get_errorCategory}}</v-alert>
              <v-text-field :rules="[reqiured]" label="Name" outlined v-model="get_Category.name"></v-text-field>
              <v-textarea v-model="get_Category.description" outlined=""></v-textarea>
              <v-switch label="save as service category" as="" service="" get_Category="" v-model="get_Category.isService"></v-switch>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="get_loadCategory" @click.prevent="editCategory()" color="success" depressed>
                  <v-icon>mdi-save</v-icon>
                  save
              </v-btn>
          </v-card-actions>
      </v-card>
      </v-form>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data:()=>({
      reqiured:v=>!!v||"Name is reqiured",
}),
methods:{
        ...mapActions(['EditCategory','GetCategoryById']),
        editCategory(){
            if(this.$refs.formEdit.validate()){
                this.EditCategory(this.get_Category);
            }
        }
    },
computed:mapGetters(['get_loadCategory','get_errorCategory','get_Category']),
mounted(){
    this.GetCategoryById(this.$route.params.id)
}
}
</script>

<style>

</style>