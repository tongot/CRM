<template>
  <div>
      <v-card flat>
          <v-card-title>New Employee</v-card-title>
          <v-card-text>
              <v-container>
                  <v-form>
                        <v-form ref="formAdd">
                      <v-alert v-if="get_errorEmployee!=null" type="error">{{get_errorEmployee}}</v-alert>
                      <v-card flat>
                          <v-card-text>
                              <v-card flat>
                            <v-row>
                                <v-col cols="12" sm="12" md="4" xs="12">
                                    
                                    <v-text-field v-model="employee.firstName" :rules="[rules.required]" outlined="" label="First Name"></v-text-field>

                                    <v-text-field v-model="employee.lastName" :rules="[rules.required]" outlined="" label="Last Name"></v-text-field>

                                      <v-select
                                    outlined
                                    :items="['Male','Female']"
                                    label="Gender"
                                    v-model="employee.gender"
                                    :rules="[rules.required]"
                                    ></v-select>

                                    <dataPicker @date="getDate"  :data="{date:employee.dateOfBirth,label:'Date of birth', required:true}"/>

                                </v-col>
                                <v-col cols="12" sm="12" md="4" xs="12">
                                    
                                
                                    <v-text-field  v-model="employee.phone" :rules="[rules.required]" outlined="" label="Phone"></v-text-field>
                                    <v-textarea  v-model="employee.address"  :rules="[rules.required]"  outlined="" label="Address"></v-textarea>

                                </v-col>

                                <v-col cols="12" sm="12" md="4" xs="12">
                                    <v-card outlined>
                                        <v-card-title>
                                            Contract
                                        </v-card-title>
                                        <v-card-text>
                                                <v-textarea v-model="employee.jobDescription"  outlined="" label="Job Description"></v-textarea>
                                              <dataPicker @date="getDateS"  :data="{date:employee.startDate,label:'Start date', required:true}"/>
                                              <dataPicker @date="getDateE"  :data="{date:employee.endDate,label:'End date', required:false}"/>
                                        </v-card-text>
                                    </v-card>
                                  
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                              </v-card>
                            <v-card flat>
                                <v-card-title>
                                    Account
                                </v-card-title>
                                <v-card-text>
                                <v-row>
                                  <v-col cols="12" md="6" xs="12" sm="12">
                                    <v-card flat>
                                        <v-card-text>
                                              <v-overflow-btn
                                                label="Select Branch"
                                                target="#newPolicy"
                                                width="auto"
                                                :items="get_Branches"
                                                v-model="employee.register.branchId"
                                                item-value="id"
                                                :loading="get_loadBranch"
                                                :rules="[rules.required]"
                                                item-text="name"
                                                ></v-overflow-btn>
                                            <v-text-field  v-model="employee.register.email" :rules="[rules.required,rules.email]"  outlined="" label="email"></v-text-field>
                                            <v-text-field v-model="employee.register.password" :rules="passWordMatch"  outlined="" label="password"></v-text-field>
                                            <v-text-field v-model="employee.register.passwordConfirm"  outlined="" label="passwordConfirm"></v-text-field>
                                        </v-card-text>
                                    </v-card>
                                  </v-col>
                                   <v-col cols="12" md="6" xs="12" sm="12">
                                      <v-card outlined class="mt-5">
                                    <v-alert type="warning" v-if="RoleError != null">{{
                                            RoleError
                                        }}</v-alert>
                                        <v-card-subtitle>Employee roles</v-card-subtitle>
                                        <v-card-text>
                                            <div class="d-flex flex-wrap">
                                            <v-checkbox
                                                class="ml-5"
                                                v-for="role in get_orgRoles"
                                                :key="role.name"
                                                v-model="employee.register.roles"
                                                :label="role.name + ' |'"
                                                :value="role.name"
                                            ></v-checkbox>
                                            </div>
                                        </v-card-text>
                                        </v-card>`
                                  </v-col>
                              </v-row>
                                </v-card-text>
                            </v-card>
                             
                                   
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-switch label="Sent Notification" class="mr-5" v-model="employee.sentNotification"></v-switch>
                                <v-switch label="Enable booking" v-model="employee.enableBooking"></v-switch>
                            </div>
                             
                          </v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn @click.prevent="addEmployee()" :loading="get_loadEmployee" depressed color="success">
                                  <v-icon>mdi-save</v-icon>
                                  save
                              </v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-form>  
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
import dataPicker from '../Shared/DatePicker'
export default {
    components:{
        dataPicker
    },
    data:()=>({
        RoleError:null,
     employee:{
         jobTitle:'',
         firstName:'',
         lastName:'',
         phone:'',
         sentNotification:false,
         enableBooking:true,
         jobDescription:'',
         gender:'',
         dateOfBirth:'',
         address:'',
         startDate:'',
         endDate:'',
         register:{
             email:'',
             password:'',
             passwordConfirm:'',
             branchId:'',
             roles:[],
         }
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
        ...mapActions([
            "GetOrgRoles",
             "GetBranches",
             "AddEmployee"
        ]),
        getDate(event){
        this.employee.dateOfBirth=event;
     },
       getDateS(event){
         this.employee.startDate=event;
     },
       getDateE(event){
         this.employee.endDate=event;
     },
     addEmployee(){
         if(this.employee.register.roles.length<1)
         {
             this.RoleError="select at least 1 role"
         }
         if(this.$refs.formAdd.validate()){
             this.AddEmployee(this.employee);
         }
     }
    },

     computed:{
          ...mapGetters([
         'get_loadEmployee',
        'get_errorEmployee',
        'get_Branches',
        'get_loadBranch',
        "get_loadingRoles",
        "get_orgRoles",
        ]),
    passWordMatch() {
      let errors = [];
      if (!this.employee.register.password) {
        errors.push("Password is requierd");
      }
      if (this.employee.register.password) {
        if (this.employee.register.password !== this.employee.register.passwordConfirm) {
          errors.push("password donot match");
        }
      }
      return errors;
    },
     },
     mounted(){
           this.GetOrgRoles();
            this.GetBranches();
     }
}
</script>

<style>

</style>