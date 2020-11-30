<template>
   <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
           v-if="data.required"
            v-model="data.date"
            :label="data.label"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            :rules="[required]"
            outlined
            v-on="on"
          ></v-text-field>
          <v-text-field
          v-if="!data.required"
            v-model="data.date"
            :label="data.label"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            outlined
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="getDate()"></v-date-picker>
      </v-menu>
</template>

<script>
export default {
    props:['data'],
 data: () => ({
      date: '',
      menu: false,
      modal: false,
       required:v=>!!v||'this field is required',
    }),
    methods:{
        getDate(){
            this.menu= false
            this.$emit('date',this.date)
        }
    }
}
</script>

<style>

</style>