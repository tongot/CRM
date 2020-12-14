<template>
  <div v-if="get_Employees != null">
    <v-dialog v-model="modalAdd" persistent width="1500">
      <v-form ref="formEdit">
        <v-card :loading="get_loadService">
          <v-card-title
            >Add Service
            <v-spacer></v-spacer>
            <v-btn icon :to="{ name: 'serviceList' }">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="get_Service != null">
            <v-alert type="error" dismissible v-if="get_errorService != null"></v-alert>
            <v-row>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field :rules="[rules.required]" label="Name" v-model="get_Service.name" outlined> </v-text-field>
                <v-overflow-btn
                  label="Select service category"
                  target="#category"
                  width="auto"
                  outlined
                  :items="get_Categories"
                  v-model="get_Service.categoryId"
                  item-value="id"
                  :loading="get_loadCategory"
                  :rules="[rules.required]"
                  item-text="name"
                >
                </v-overflow-btn>
                <v-select
                  outlined
                  item-text="[1]"
                  :items="getDuration()"
                  item-value="[0]"
                  label="Estimate Time"
                  v-model="get_Service.estimateHours"
                  :rules="[rules.required]"
                ></v-select>
                <v-textarea :rules="[rules.required]" label="Description" v-model="get_Service.description" outlined>
                </v-textarea>
                <v-switch v-model="get_Service.allowOnlineBooking" label="Allow online booking"></v-switch>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-card outlined>
                  <v-card-title>
                    pricing
                  </v-card-title>
                  <v-card-text>
                    <v-select
                      outlined
                      :items="['Fixed', 'Minimum', 'Free']"
                      label="Pricing"
                      v-model="get_Service.pricing"
                      :rules="[rules.required]"
                    ></v-select>
                    <div v-if="get_Service.pricing != 'Free'">
                      <v-text-field
                        :rules="[rules.required]"
                        type="number"
                        step="2"
                        label="Price"
                        v-model="get_Service.price"
                        outlined
                      >
                      </v-text-field>
                      <v-text-field
                        :rules="[rules.required, rules.maxPercent]"
                        type="number"
                        label="Promotion (%)"
                        v-model="get_Service.promotionPercent"
                        outlined
                      >
                      </v-text-field>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-card :loading="get_loadEmployee" flat>
                  <v-alert v-if="employeeError" type="warning">select at least one skilled person</v-alert>
                  <v-card-title
                    >Skilled personail
                    <v-spacer> </v-spacer>
                    <v-checkbox v-model="selectAll" @change="selectAllEmployees()" label="Select All">All</v-checkbox>
                  </v-card-title>
                  <v-text-field v-model="search" placeholder="Search last name"> </v-text-field>
                  <v-checkbox
                    v-model="emplo.isSelected"
                    v-for="emplo in filteredEmployees"
                    :key="emplo.id"
                    :label="`${emplo.firstName} ${emplo.lastName}`"
                  ></v-checkbox>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="get_loadService" depressed @click.prevent="Add()">
              <v-icon left> mdi-content-save </v-icon>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { Duration } from '../../../SharedFunc';
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    selectAll: false,
    modalAdd: false,
    employeeError: false,
    search: '',
    rules: {
      required: (v) => !!v || 'This fieled is required',
      maxPercent: (v) => (v > -1 && v < 101) || 'invalid percentage must be 0-100',
      minPrice: (v) => v > 0 || 'invalid price',
    },
  }),
  methods: {
    ...mapActions(['EditService', 'GetServiceCategories', 'GetEmployees', 'GetServiceById', 'GetEmployeesForService']),
    Add() {
      if (this.$refs.formEdit.validate()) {
        let employees = this.checkSelected();
        if (employees.length < 1) {
          return;
        }
        this.get_Service.employees = employees;

        this.EditService(this.get_Service);
      }
    },
    getDuration() {
      return Duration;
    },
    selectAllEmployees() {
      let v = false;
      v = this.selectAll ? (v = true) : (v = false);
      this.get_Employees.forEach((item) => {
        item.isSelected = v;
      });
    },
    checkSelected() {
      let v = this.get_Employees.filter((item) => {
        return item.isSelected;
      });
      this.employeeError = v.length < 1 ? true : false;
      return v;
    },
  },
  computed: {
    ...mapGetters([
      'get_errorService',
      'get_loadService',
      'get_Categories',
      'get_loadCategory',
      'get_loadEmployee',
      'get_Employees',
      'get_Service',
      'get_EmployeesForService',
    ]),
    filteredEmployees() {
      return this.get_Employees.filter((item) => {
        return item.lastName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  mounted() {
    const search = {
      text: '',
      page: 1,
    };
    const id = this.$route.params.id;
    this.modalAdd = true;
    this.GetServiceCategories(search);
    this.GetEmployees(search).then(() => {
      this.GetEmployeesForService(id).then(() => {
        this.get_Employees.forEach((item) => {
          this.get_EmployeesForService.forEach((item2) => {
            if (item.id == item2.id) {
              item.isSelected = true;
            }
          });
        });
      });
    });
    this.GetServiceById(id);
  },
};
</script>

<style></style>
