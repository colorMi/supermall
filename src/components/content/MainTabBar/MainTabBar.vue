<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deeppink">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/03.png" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/04.png" alt="">
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deeppink">
    <template v-slot:item-icon>
      <img src="~assets/img/tabbar/07.png" alt="">
    </template>
    <template v-slot:item-icon-active>
      <img src="~assets/img/tabbar/08.png" alt="">
    </template>
    <template v-slot:item-text>
      <div>分类</div>
    </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deeppink">
    <template v-slot:item-icon>
      <img src="~assets/img/tabbar/01.png" alt="">
    </template>
    <template v-slot:item-icon-active>
      <img src="~assets/img/tabbar/02.png" alt="">
    </template>
    <template v-slot:item-text>
      <div>购物车</div>
    </template> 
    </tab-bar-item>
    <tab-bar-item path="profile" activeColor="deeppink">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/05.png" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/06.png" alt="">
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
 import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name:'MainTabBar',
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
