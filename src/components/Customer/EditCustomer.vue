<template>
  <div>
      <div>
        <v-card flat>
          <v-card-title>Edit Customer</v-card-title>
          <v-card-text>
              <v-container>
                  <v-form ref="formEdit">
                      <v-card flat>
                          <v-card-text v-if="get_Customer!=null">
                            <v-row>
                                <v-col cols="12" sm="12" md="6" xs="12">
                                    
                                    <v-text-field v-model="get_Customer.firstName" :rules="[rules.required]" outlined="" label="First Name"></v-text-field>

                                    <v-text-field v-model="get_Customer.lastName" :rules="[rules.required]" outlined="" label="Last Name"></v-text-field>

                                    <v-text-field  v-model="get_Customer.phone" :rules="[rules.required]" outlined="" label="Phone"></v-text-field>

                                    <v-text-field  v-model="get_Customer.email" :rules="[rules.required,rules.email]" outlined="" label="Email"></v-text-field>

                                    <datePicker @date="getDate" :data="{date:get_Customer.dateOfBirth,label:'Date of birth'}"/>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" xs="12">
                                    
                                    <v-select
                                    :items="['Male','Female']"
                                    label="Gender"
                                    outlined
                                    v-model="get_Customer.gender"
                                    :rules="[rules.required]"
                                    ></v-select>

                                    <v-textarea  v-model="get_Customer.address" outlined="" label="Address"></v-textarea>

                                    <v-textarea v-model="get_Customer.notes"  outlined="" label="Notes"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-switch label="Send Notifications" v-model="get_Customer.sentNotification"></v-switch>
                          </v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn :to="{name:'listCustomer'}" depressed class="error">
                                  <v-icon>mdi-cancel</v-icon>
                                  cancel
                              </v-btn>
                               <v-btn @click.prevent="editCustomer()" :loading="get_loadCustomer" depressed color="success">
                                  <v-icon>mdi-save</v-icon>
                                  save
                              </v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-form>
              </v-container>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
      </v-card>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import datePicker from '../Shared/DatePicker'
const moment = require('moment');
export default {
    components:{
        datePicker
    },
    data:()=>({
     rules:{
         required:v=>!!v||'this field is required',
          email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
     }
 }),
methods:{
    ...mapActions(['GetCustomerById','EditCustomer']),
       editCustomer(){
         if(this.$refs.formEdit.validate()){
             this.EditCustomer(this.get_Customer)
         }
     },
     getDate(event){
         this.get_Customer.dateOfBirth=event;
     }
},
computed:mapGetters(['get_Customer','get_loadCustomer','get_errorCustomer']),
mounted(){
    this.GetCustomerById(this.$route.params.id).then(()=>{
        this.get_Customer.dateOfBirth=moment(this.get_Customer.dateOfBirth).format("YYYY-MM-DD")
    })
}
}
</script>

<style>

</style>