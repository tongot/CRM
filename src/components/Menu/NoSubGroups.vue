<template>
      <v-list-item :to="{name:menu.link}">
          <v-list-item-icon>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{menu.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
</template>

<script>
export default {
props:['menu']
}
</script>

<style>

</style>