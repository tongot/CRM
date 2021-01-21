<template>
  <div>
    <v-app-bar fixed dark color="transparent" class="nav-landing" flat>
      <v-toolbar-title>Xpert</v-toolbar-title>
      <v-spacer></v-spacer>
      <ul class="nav-list">
        <li
          v-for="(link, index) in links"
          :key="link.name"
          :class="link.isActive == true ? 'current' : ''"
          @click="changeClass(index, link.name)"
        >
          <a>{{ link.label }} </a>
        </li>
      </ul>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data: () => ({
    currentActive: 0,
    links: [
      { name: 'landing-home', isActive: false, label: 'Home' },
      { name: 'landing-features', isActive: false, label: 'Features' },
      { name: 'landing-pricing', isActive: false, label: 'Pricing' },
      { name: 'landing-works', isActive: false, label: 'How it works' },
      { name: 'landing-demo', isActive: false, label: 'Request Demo' },
      { name: 'login', isActive: false, label: 'login' }
    ]
  }),
  methods: {
    changeClass(index, name) {
      this.links[this.currentActive].isActive = false;
      this.links[index].isActive = true;
      this.currentActive = index;
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="scss" scoped>
$main_color: #df9ca8;
.nav-landing {
  background-color: transparent;
  color: $main_color;
  top: 0%;
}
.nav-list {
  list-style: none;
  display: flex;

  li {
    &:hover {
      transform: translateY(-3px);
      transition: transform ease-in-out 172ms;
    }
    a {
      color: black;
      padding-right: 20px;
      padding-left: 20px;
      margin-right: 5px;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .current {
    border-bottom: solid $main_color 3px;
  }
}
</style>
