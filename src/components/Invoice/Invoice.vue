<template>
  <div>
    <div class="invoice">
      <div v-if="get_loadInvoice" class="white--text spinner">
        <span>
          LOADING..
          <v-icon color="white">
            mdi-loading mdi-spin
          </v-icon>
        </span>
      </div>
      <v-btn class="ml-5 mb-5" color="success" @click="printR()">
        print
      </v-btn>
      <v-btn class="ml-5 mb-5" color="error" @click="back()">
        close
      </v-btn>

      <div v-if="get_Invoice != null" class="content" id="invoice">
        <div class="logo">
          <img :src="require('../../assets/logo.png')" alt="" />
        </div>
        <div class="address">
          <address>{{ get_Invoice.address }}</address>
          <br />
          <address>
            <strong>Phone:{{ get_Invoice.customerPhone }}</strong>
          </address>
        </div>
        <div class="invoice-number">H{{ get_Invoice.invoiceNumber }}</div>
        <div class="customer">
          Date:{{ get_Invoice.date | moment(' ddd DD MMM YYYY') }} <br />
          Customer: {{ get_Invoice.customerName }} <br />
          Invoice State:
          <strong
            ><u>{{ get_Invoice.invoiceState }}</u>
          </strong>
        </div>

        <div class="services mt-10">
          <table v-if="get_Invoice.services != null">
            <tr>
              <th>Servive</th>
              <th>Discount(%)</th>
              <th class="amount">Amount (P)</th>
            </tr>
            <tr v-for="service in get_Invoice.services" :key="service.id">
              <td>
                {{ service.serviceName }} [{{ service.employeeName }}] <br />
                <strong>Refreshments:</strong><br />
                <span v-for="item in service.usedItems.filter((i) => i.isRefreshment)" :key="item.id">
                  {{ item.description }} <br
                /></span>
                <strong>Items used:</strong><br />
                <span v-for="item in service.usedItems.filter((i) => !i.isRefreshment)" :key="item.id">
                  {{ item.description }} {{ item.volume }}<br
                /></span>
              </td>
              <td>{{ service.discount }}</td>
              <td class="amount">
                {{ service.amount }}
              </td>
            </tr>
          </table>

          <table class="mt-5" v-if="get_Invoice.products != null">
            <tr>
              <th>Products</th>
              <th>Discount</th>
              <th>Qnt.</th>
              <th>Amount</th>
            </tr>
            <tr v-for="product in get_Invoice.products" :key="product.id">
              <td>
                {{ product.productName }}
              </td>
              <td>{{ product.discount }}</td>
              <td>{{ product.quantity }}</td>

              <td class="amount">
                {{ product.amount }}
              </td>
            </tr>
          </table>

          <table class="mt-5">
            <tr>
              <td>
                <strong>Total:</strong>
              </td>
              <td></td>
              <td class="amount">
                <strong>
                  <u>P{{ get_Invoice.totalPrice.toFixed(2) }}</u>
                </strong>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import print from 'print-js';
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({}),
  methods: {
    ...mapActions(['GetInvoiceById']),
    back() {
      this.$router.go(-1);
    },
    printR() {
      print({ printable: 'invoice', type: 'html', targetStyles: ['*'], header: 'Weillers Invoice' });
    },
  },
  computed: mapGetters(['get_loadInvoice', 'get_Invoice']),
  mounted() {
    this.GetInvoiceById(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped media="print">
.invoice {
  margin: 0;
  padding: 0;
  padding-top: 20px;
  background-color: gray;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  height: 100vh;
}
.spinner {
  margin: auto;
  background-color: black;
  width: 120px;
  padding-right: 1px;
  padding-left: 10px;
}
.content {
  width: 210mm;
  background-color: white;
  position: relative;
  .invoice-number {
    color: red;
    font-size: 17px;
    position: absolute;
    right: 0px;
    font-weight: 600;
    top: 20px;
  }
  .address {
    width: 150px;
  }
  .logo {
    position: absolute;
    right: 0px;
    top: 40px;
    img {
      height: 100px;
    }
  }
  .customer {
    margin-top: 20px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    .amount {
      text-align: right;
    }
  }
  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 5px;
  }
  tr {
    &:nth-child(even) {
      background-color: #dddd;
    }
  }
  @page {
    size: auto; /* auto is the initial value */
    margin: 0; /* this affects the margin in the printer settings */
  }
}
</style>
