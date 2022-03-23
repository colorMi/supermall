<template>
  <div id="App" class="wrapper">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
    <Swiper/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/MainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
