<template>
  <div>
    <v-card flat :loading="get_loadInvoice">
      <v-card-title>Invoices</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              :to="{ name: 'Invoice', params: { id: item.id } }"
              v-for="item in get_CustomerInvoice"
              :key="item.id"
            >
              <v-list-item-avatar class="white--text" :color="getCol()">
                {{ item.id }}
              </v-list-item-avatar>
              <v-list-item-title>{{ item.date | moment('YYYY/MM/DD hh:mm:ss') }}</v-list-item-title>
              <v-list-item-action>
                <v-chip> P {{ item.totalPrice }} </v-chip>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getColor } from '../../../SharedFunc';
export default {
  methods: {
    ...mapActions(['GetCustomerInvoice']),
    getCol() {
      return getColor();
    },
  },
  computed: mapGetters(['get_CustomerInvoice', 'get_loadInvoice']),
  mounted() {
    this.GetCustomerInvoice(this.$route.params.id);
  },
};
</script>
