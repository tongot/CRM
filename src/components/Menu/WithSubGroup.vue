<template>
       <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{menu.title}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="item in menu.subList" :key="item.link"  :to="{name:item.link}">
            <v-list-item-title >{{item.title}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon >{{item.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
</template>

<script>
export default {
 props:["menu"]
}
</script>

<style>

</style>