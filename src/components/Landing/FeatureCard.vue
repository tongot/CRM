<template>
  <div class="card">
    <div class="icon">
      <v-icon size="50" color="#df9ca8">{{ data.icon }}</v-icon>
    </div>
    <!-- <div class="heading">
      <h4>{{ data.title }}</h4>
      <div class="underline"></div>
    </div> -->
    <heading :data="data.title" />
    <p>{{ data.message }}</p>
  </div>
</template>
<script>
import Heading from './heading.vue';
export default {
  components: { Heading },
  props: ['data']
};
</script>

<style lang="scss" scoped>
$main_color: #df9ca8;
.card {
  height: 200px;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding-top: 20px;
  p {
    font-weight: 350;
    text-align: center;
    padding-top: 10px;
  }
  .heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h4 {
      padding-top: 80px;
      font-weight: 300;
      font-size: 20px;
      margin-top: -70px;
    }
    .underline {
      width: 100px;
      height: 5px;
      background-color: $main_color;
    }
  }
  .icon {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>
