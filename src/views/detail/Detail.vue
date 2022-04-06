<template>
    <div id="detail">
        <detail-nav-bar  class="detail-nav" @title-click="titleClick" ref="nav"></detail-nav-bar>  
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <good-list :goods="recommend" ref="recommend"></good-list>
        </scroll>
        <detail-bottom-bar @clickToCart='clickToCart'></detail-bottom-bar>  
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar.vue'
    import DetailSwiper from './childComps/DetailSwiper.vue'
    import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
    import DetailShopInfo from './childComps/DetailShopInfo.vue'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
    import DetailParamInfo from './childComps/DetailParamInfo.vue'
    import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
    import DetailBottomBar from './childComps/DetailBottomBar.vue'
    import mybus from '../../plugins/mybus'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodList from 'components/content/goods/GoodList'
    import BackTop from 'components/content/backTop/BackTop'

   import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'nextwork/detail'
   import {debounce} from 'common/utils'
import { Store } from 'vuex'

export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodList,
        BackTop
    },
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:[],
            paramInfo:{},
            commentInfo:{},
            recommend:[],
            themeTopYs:[],
            itemImgListener:null,
            currentIndex:0,
            isShowBackTop:false,
        }
    },
    created(){
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            const data = res.result

            //1.获取顶部的轮播数据
            this.topImages = data.itemInfo.topImages

            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //3.创建店铺信息
            this.shop = new Shop(data.shopInfo)

            //4.保存商品的详情数据
            this.detailInfo=data.detailInfo;

            //5.获取参数
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //6.取出评论信息
            if(data.rate.cRate != 0){
                this.commentInfo = data.rate.list[0]
            }
        })

        //3.请求推荐数据
        getRecommend().then(res => {
            this.recommend = res.data.list
        })
    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,200)
        this.itemImgListener = () => {
            refresh()
        }
        mybus.on("imgLoad",this.itemImgListener)
        setTimeout(() => {
           this.themeTopYs.push(0) 
           this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
           this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
           this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
           this.themeTopYs.push(-Number.MAX_VALUE)
        }, 1000);
    },
    methods:{
        titleClick(index){
            this.$refs.scroll.scrollTo(0,this.themeTopYs[index],1000) 
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
            // 获取y值
            const positionY = -position.y

            let length = this.themeTopYs.length
            //2.positionY和主题中进行对比
            for(let i = 0; i < length - 1; i++){
                // if (this.currentIndex !== i && ((i < length -1 && positionY >= -this.themeTopYs[i] && positionY < -this.themeTopYs[i+1]) || (i === length -1 && positionY >= -this.themeTopYs[i]))) {
                //     this.currentIndex = i
                //     // console.log(this.currentIndex);
                //     this.$refs.nav.currentIndex = this.currentIndex
                // }
                if(this.currentIndex !== i && (positionY > -this.themeTopYs[i] && positionY < -this.themeTopYs[i+1])){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }

            //3.是否显示回到顶部
            this.isShowBackTop = (-position.y) > 1000
        },
        clickToCart(){
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.detailInfo.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid
            
            // this.$store.dispatch('addCart',product)
            // console.log(this);
        }
   }
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index:9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        background-color: #fff;
        z-index: 9;
    }
    .content{
        height: calc(100% - 44px - 49px);
    }
    
</style>