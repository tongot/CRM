<template>
  <div class="heading">
    <h4>{{ data }}</h4>
    <div class="underline"></div>
  </div>
</template>

<script>
export default {
  props: ['data']
};
</script>

<style lang="scss" scoped>
$main_color: #ffb04f;

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
</style>
