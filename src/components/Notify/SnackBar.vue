<template>
  <div>
      <v-snackbar
        v-model="get_SnackBar.show"
        :color="get_SnackBar.color"
        :right="true"
        :bottom="true"
      >
        {{get_SnackBar.text}} 
        <v-icon left>
            {{get_SnackBar.icon}}
        </v-icon>
      </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
computed:{
    ...mapGetters(['get_SnackBar'])
}

}
</script>

<style>

</style>