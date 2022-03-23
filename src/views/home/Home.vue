<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>

    <scroll class="content"
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll" 
            :pull-up-load="true">
            <!-- @pullingUp="loadMore"> -->
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick"/>
      <goods-list :goods= "showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'  
  import GoodsList from 'components/content/goods/GoodList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'nextwork/home'

  import mybus from '../../plugins/mybus'

  export default {
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      const refresh = this.debounce(this.$refs.scroll.refresh,200)

      mybus.on("imageLoad",() => {
        // console.log("------");
        // this.$refs.scroll.refresh()
        refresh()
      })
    },
    methods:{
      //事件监听相关的方法
      debounce(func,delay){
        let timer = null

        return function () {
          if(timer)clearTimeout(timer)

          timer = setTimeout((...args) => {
            func.apply(this,args)
          },delay)
        }
      },
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // this.currentType = Object.keys(this.godds)[index]
        // console.log(index);
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
        // console.log('1111');
      },
      contentScroll(position){
        // console.log(position.y);
        this.isShowBackTop = (-position.y) > 1000 
      },
      // loadMore(){
      //   this.getHomeGoods(this.currentType)
      //   this.$refs.scroll.scroll.refresh()
      // },
      // 网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
  .home-nav{
    background-color:var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    z-index: 9;
    top: 44px;
  }
  .content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /* .content{
    height:calc(100% - 49px - 44px) ;
    overflow: hidden;
    margin-top:  44px;
  } */
</style>
