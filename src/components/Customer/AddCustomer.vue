<template>
  <div>
      <v-card flat>
          <v-card-title>
             
              New Customer <v-spacer></v-spacer>
                <v-btn icon :to="{name:'listCustomer'}">
                                  <v-icon color="error">mdi-close</v-icon>
                              </v-btn>
              </v-card-title>
          <v-card-text>
              <v-container>
                  <v-form ref="formAdd">
                      <v-alert v-if="get_errorCustomer!=null" type="error">{{get_errorCustomer}}</v-alert>
                      <v-card flat>
                          <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" md="6" xs="12">
                                    
                                    <v-text-field v-model="customer.firstName" :rules="[rules.required]" outlined="" label="First Name"></v-text-field>

                                    <v-text-field v-model="customer.lastName" :rules="[rules.required]" outlined="" label="Last Name"></v-text-field>

                                    <v-text-field  v-model="customer.phone" :rules="[rules.required]" outlined="" label="Phone"></v-text-field>

                                    <v-text-field  v-model="customer.email" :rules="[rules.required,rules.email]" outlined="" label="Email"></v-text-field>

                                    <datePicker @date="getDate"  :data="{date:customer.dateOfBirth,label:'Date of birth', required:true}"/>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" xs="12">
                                    
                        
                                    <v-select
                                    outlined
                                    :items="['Male','Female']"
                                    label="Gender"
                                    v-model="customer.gender"
                                    :rules="[rules.required]"
                                    ></v-select>

                                    <v-textarea  v-model="customer.address"  outlined="" label="Address"></v-textarea>

                                    <v-textarea v-model="customer.notes"  outlined="" label="Notes"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                                <v-switch label="Sent Notification" v-model="customer.sentNotification"></v-switch>
                          </v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn @click.prevent="addCustomer()" :loading="get_loadCustomer" depressed color="success">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import datePicker from '../Shared/DatePicker'
export default {
    components:{
        datePicker
    },
 data:()=>({
     customer:{
         firstName:'',
         lastName:'',
         phone:'',
         email:'',
         sentNotification:false,
         notes:'',
         gender:'',
         dateOfBirth:'',
         address:'',
     },

     rules:{
         required:v=>!!v||'this field is required',
          email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
     }
 }),
 methods:{
     ...mapActions(['AddCustomer']),
     addCustomer(){
         if(this.$refs.formAdd.validate()){
             this.AddCustomer(this.customer)
         }
     },
     getDate(event){
         this.customer.dateOfBirth=event;
     }
 },
 computed:mapGetters(['get_loadCustomer','get_errorCustomer'])
}
</script>

<style>

</style>