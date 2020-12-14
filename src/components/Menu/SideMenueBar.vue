<template>
  <div>
    <v-navigation-drawer app clipped>
      <v-list-item-group>
        <v-list-item :to="{ name: 'Home' }">
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-icon>mdi-home</v-icon>
              Home
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group>
          <span v-for="item in MenuItems" :key="item.title">
            <withSubMenu v-if="item.subList.length > 0" :menu="item" />
            <noSubMenu v-if="item.subList.length === 0" :menu="item" />
          </span>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import withSubMenu from './WithSubGroup';
import noSubMenu from './NoSubGroups';

export default {
  components: {
    withSubMenu,
    noSubMenu,
  },
  data: () => ({
    MenuItems: [
      { title: 'Customers', link: 'listCustomer', icon: 'mdi-clock', subList: [] },
      { title: 'Calendar', link: 'listCalendar', icon: 'mdi-clock', subList: [] },
      { title: 'Appointments', link: 'listAppointment', icon: 'mdi-clock', subList: [] },
      { title: 'Employees', link: 'listEmployee', icon: 'mdi-account', subList: [] },
      { title: 'Services', link: 'serviceList', icon: 'mdi-clock', subList: [] },
      { title: 'Categories', link: 'listProductCategory', icon: 'mdi-clock', subList: [] },
      { title: 'Checkout', link: 'checkout', icon: 'mdi-clock', subList: [] },

      {
        title: 'Invenory',
        link: 'inventory',
        icon: 'mdi-clock',
        subList: [
          { title: 'Products', link: 'listProduct', icon: 'mdi-clock' },
          { title: 'Brands', link: 'listBrand', icon: 'mdi-clock' },
          { title: 'Suppliers', link: 'listSuppliers', icon: 'mdi-clock' },
        ],
      },
      {
        title: 'Settings',
        link: 'inventory',
        icon: 'mdi-settings',
        subList: [
          { title: 'Taxes', link: 'listTax', icon: 'mdi-cash' },
          { title: 'COB', link: 'listCob', icon: 'mdi-scale-balance' },
        ],
      },
    ],
  }),
};
</script>

<style></style>
