<template>
  <div>
    <div class="heading">
      <h4>Cloud based | User Friendly | Effective</h4>
      <div class="underline"></div>
    </div>

    <v-row>
      <v-col cols="12" md="6" sm="12" xs="12">
        <div class="moto">
          <div>
            <v-card-text>
              CRM designed for small to medium businesses
            </v-card-text>
            <v-card-actions>
              <button large depressed>Request for demo</button>
            </v-card-actions>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="12">
        <div class="co-image">
          <img src="@/assets/coworker.svg" alt="" />
        </div>
      </v-col>
    </v-row>
    <div class="content">
      <v-container>
        <h4>
          Are you looking forward to increase the efficiency of you business, build good customer relations,improve
          cost-effectiveness?
        </h4>
        <br />
        <h3>You are at the right place</h3>
        <div class="features">
          <v-row>
            <v-col v-for="feature in features" :key="feature.title" cols="12" md="4" sm="12" xs="12">
              <feature-card :data="feature" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>
<script>
import FeatureCard from './FeatureCard.vue';
export default {
  components: { FeatureCard },
  data: () => ({
    features: [
      { icon: 'mdi-account', title: 'Contact manager', message: 'Managing customers' },
      { icon: 'mdi-stocking', title: 'Stock manager', message: 'Managing stocks' },
      { icon: 'mdi-file-outline', title: 'Invoicing', message: 'Quick invoicing' },
      { icon: 'mdi-cash-usd', title: 'Check out', message: 'Provides POS online' },
      { icon: 'mdi-account-multiple', title: 'Employee portal', message: 'Employees can manage day to day events' },
      { icon: 'mdi-calendar-clock', title: 'Calendar manager', message: 'Make appointments' },
      { icon: 'mdi-glass-mug', title: 'Material usage manager', message: 'Track you raw material usage' },
      { icon: 'mdi-more', title: 'More is coming', message: 'We do customisations per user or and unique modules ;)' }
    ]
  })
};
</script>

<style lang="scss" scoped>
$main_color: #df9ca8;
$content: #8a5b051a;
.content {
  background-color: $content;
  margin-top: -24px;
  h4 {
    margin-top: -50px;
    text-align: center;
    font-weight: 300;
    font-size: 25px;
    line-height: 1em;
  }
  h3 {
    text-align: center;
    font-weight: 300;
    font-size: 25px;
    line-height: 1em;
  }
  .features {
    margin-top: 50px;
    margin-right: 50px;
    margin-left: 50px;
  }
}
.heading {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h4 {
    padding-top: 80px;
    font-weight: 400;
    font-size: 40px;
    position: relative;
  }
  .underline {
    width: 300px;
    height: 5px;
    background-color: #fff;
    position: relative;
  }
}

.moto {
  height: 100vh;
  display: flex;
  align-items: center;
  div {
    width: 100%;
    font-weight: 250;
    font-size: 40px;
    line-height: 1.6em;
  }
  button {
    color: white;
    font-size: 18px;
    line-height: 2;
    width: 300px;
    height: 65px;
    background-color: $main_color;
    border: none;
    border-radius: 5px;
  }
}
.co-image {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 500px;
  }
}
</style>
