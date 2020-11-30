<template>
  <div>
    <v-form ref="addForm"> </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    units: ['mm', 'grams'],
    stock: {
      supplierId: '',
      volume: '',
      quantity: '',
      productId: '',
      measureWithUnits: false,
      unityMeasure: 'mm',
    },
  }),
  methods: {},
};
</script>

<style></style>
