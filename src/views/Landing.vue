<template>
  <div>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInRight animate__fast"
      leave-active-class="animate__animated animate__fadeOutLeft animate__fast"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
