<template>
  <div>
    <v-dialog v-model="modalAdd" persistent width="1500">
      <v-form ref="formAdd">
        <v-card>
          <v-card-title
            >Add Service
            <v-spacer></v-spacer>
            <v-btn icon :to="{ name: 'serviceList' }">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert type="error" dismissible v-if="get_errorService != null"></v-alert>
            <v-row>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field :rules="[rules.required]" label="Name" v-model="service.name" outlined> </v-text-field>
                <v-overflow-btn
                  label="Select service category"
                  target="#category"
                  width="auto"
                  outlined
                  :items="get_Categories"
                  v-model="service.categoryId"
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
                  v-model="service.estimateHours"
                  :rules="[rules.required]"
                ></v-select>
                <v-textarea :rules="[rules.required]" label="Description" v-model="service.description" outlined>
                </v-textarea>
                <v-switch v-model="service.onlineBooking" label="Allow online booking"></v-switch>
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
                      v-model="service.pricing"
                      :rules="[rules.required]"
                    ></v-select>
                    <div v-if="service.pricing != 'Free'">
                      <v-text-field
                        :rules="[rules.required]"
                        type="number"
                        step="2"
                        label="Price"
                        v-model="service.price"
                        outlined
                      >
                      </v-text-field>
                      <v-text-field
                        :rules="[rules.required, rules.maxPercent]"
                        type="number"
                        label="Promotion (%)"
                        v-model="service.promotion"
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
    service: {
      name: '',
      price: '',
      promotion: '',
      estimateHours: '',
      description: '',
      allowOnlineBooking: false,
      pricing: '',
      categoryId: '',
      employees: [],
    },
    rules: {
      required: (v) => !!v || 'This fieled is required',
      maxPercent: (v) => (v > -1 && v < 101) || 'invalid percentage must be 0-100',
      minPrice: (v) => v > 0 || 'invalid price',
    },
  }),
  methods: {
    ...mapActions(['AddService', 'GetServiceCategories', 'GetEmployees']),
    Add() {
      if (this.$refs.formAdd.validate()) {
        let employees = this.checkSelected();
        if (employees.length < 1) {
          return;
        }
        this.service.employees = employees;

        this.AddService(this.service);
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
    this.modalAdd = true;
    this.GetServiceCategories(search);
    this.GetEmployees(search);
  },
};
</script>

<style></style>
