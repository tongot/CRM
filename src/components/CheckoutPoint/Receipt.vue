<template>
  <div>
    <v-card
      v-if="get_CheckoutAppointments.length > 0 || get_CheckoutProducts.length > 0"
      class="modal-receipt"
      height="500"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="7" xs="12">
            <v-card color="receipt-container grey lighten-3" width="500" height="440">
              <v-card-text>
                <div class="" id="receipt">
                  <div class="d-flex justify-center">
                    <h1 class="mt-2">Receipt</h1>
                  </div>
                  <div class="mt-5">
                    <address>
                      Cashier:{{ getCustomer() }}<br />
                      Customer:{{ getCustomer() }} <br />
                      Date:Thur 26 Mar 2020
                    </address>
                  </div>
                  <div class="mt-1">
                    <div>
                      <div v-if="get_CheckoutAppointments.length > 0">
                        <v-row>
                          <v-col cols="7">
                            <span
                              ><h4 class="">Services({{ getRef() }})</h4>
                            </span>
                          </v-col>
                          <v-col cols="5">
                            <div class="d-flex justify-end">
                              <h4 class="">P</h4>
                            </div>
                          </v-col>
                        </v-row>
                        <div v-for="i in get_CheckoutAppointments" :key="i.id">
                          <v-row>
                            <v-col cols="7">
                              <span
                                ><span class="item-head"></span>{{ getName(i.serviceName) }} <br />
                                <span class="item-head">
                                  <address>{{ `By: ${i.employeeName}` }}</address></span
                                >
                              </span>
                            </v-col>
                            <v-col cols="5">
                              <div class="d-flex justify-end">
                                <span class="item-head">{{ i.price.toFixed(2) }}</span>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                      <div v-if="get_CheckoutProducts.length > 0">
                        <v-row>
                          <v-col cols="7">
                            <span><h4 class="">Products</h4> </span>
                          </v-col>
                          <v-col cols="5">
                            <div class="d-flex justify-end"></div>
                          </v-col>
                        </v-row>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                        <div v-for="i in get_CheckoutProducts" :key="i.id">
                          <v-row>
                            <v-col cols="7">
                              <span
                                ><span class="item-head">{{ getName(i.name) }}</span> <br />
                                <span class="item-head">
                                  <address>{{ `x${i.quantity}` }}</address></span
                                >
                              </span>
                            </v-col>
                            <v-col cols="5">
                              <div class="d-flex justify-end">
                                <span class="item-head"> {{ i.price.toFixed(2) }}</span>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                      <v-row>
                        <v-col cols="7">
                          <span
                            ><span class="item-head"><strong>Total Price:</strong> </span> <br />
                          </span>
                        </v-col>
                        <v-col cols="5">
                          <div class="d-flex justify-end">
                            <span class="item-head"
                              ><strong
                                ><u>{{ get_totalPrice.toFixed(2) }}</u>
                              </strong>
                            </span>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="7">
                          <span
                            ><span class="item-head"><strong>change:</strong> </span> <br />
                          </span>
                        </v-col>
                        <v-col cols="5">
                          <div class="d-flex justify-end">
                            <span class="item-head"><strong v-text="getChange"></strong></span>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="5" xs="12">
            <v-card>
              <v-card-text>
                <v-text-field label="total" v-model="get_totalPrice" :disabled="true" outlined=""></v-text-field>
                <v-text-field label="enter received amount" v-model="amountReceived" outlined=""></v-text-field>
                <v-text-field label="change" v-model="getChange" :disabled="true" outlined=""></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="clear()" color="error">
                  <v-icon>mdi-cancel</v-icon>
                  clear
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="addInvoice()" :disabled="Math.sign(getChange) < 0" color="success">
                  <v-icon>mdi-content-save</v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="error">
      <v-card-title>No items</v-card-title>
    </v-card>
  </div>
</template>

<script>
import print from 'print-js';
import { mapActions, mapGetters } from 'vuex';
import { truncateString } from '../../../SharedFunc';
export default {
  data: () => ({
    amountReceived: '',
  }),
  methods: {
    ...mapActions(['AddInvoice']),
    printR() {
      print({ printable: 'receipt', type: 'html', targetStyles: ['*'], header: 'Weillers Monky' });
    },
    getRef() {
      if (this.get_CheckoutAppointments.length > 0) {
        return this.get_CheckoutAppointments[0].appointmentNumber;
      }
      return '';
    },
    getCustomer() {
      if (this.get_CheckoutAppointments.length < 1) {
        return 'Anonymous';
      }
      let name = this.get_CheckoutAppointments[0].customerName;
      if (typeof name === 'undefined') {
        return 'Anonymous';
      }
      return name;
    },
    getName(string) {
      return truncateString(string);
    },
    clear() {
      this.amountReceived = '';
    },
    addInvoice() {
      let customerId = null;
      if (this.get_CheckoutAppointments.length > 0) {
        customerId = this.get_CheckoutAppointments[0].customerId;
      }
      const invoice = {
        customerId: customerId,
        totalAmount: this.get_totalPrice,
        appointmentNumber: this.getRef(),
        actualAmountReceived: this.amountReceived,
        products: this.get_CheckoutProducts,
        services: this.get_CheckoutAppointments,
      };
      this.AddInvoice(invoice);
    },
  },
  computed: {
    ...mapGetters(['get_CheckoutProducts', 'get_CheckoutAppointments', 'get_totalPrice']),
    getChange() {
      return (this.amountReceived - this.get_totalPrice).toFixed(2);
    },
  },
};
</script>

<style scoped lang="scss">
.receipt-container {
  overflow: scroll;
  overflow-x: hidden;
  font-family: 'Courier New', Courier, monospace;
}
#receipt {
  background: white;
  color: black;
  padding-right: 20px;
  padding-left: 20px;
  width: 400px;
}
.item-head {
  font-size: 16px;
}
.modal-receipt {
  overflow: auto;
  overflow-x: hidden;
}
</style>
