<template>
    <div class="recommend">
        <div class="nav">
            <span :class="activeIndex=='0'?'active':''" @click="handleToPage('0')">全部</span>
            <span :class="activeIndex=='1'?'active':''" @click="handleToPage('1')">命中</span>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="wrapper" ref="wrapper1">
                        <div class="content">
                            <ul>
                                <li v-for="item in data1" @click="handleToContent(item.predictionId)">
                                    <div class="t">
                                        <p>{{item.authorName}}</p>
                                        <p>{{item.createTime | timestampToTime}}</p>
                                    </div>
                                    <div class="c">
                                        <p>{{item.title}}</p>
                                    </div>
                                    <div class="b">
                                        <p>金额：{{item.sum}}{{item.coinName}}</p>
                                        <p :class="'c'+item.status">{{item.status | toStatus1}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="wrapper" ref="wrapper2">
                        <div class="content">
                            <ul>
                                <li v-for="item in data2" @click="handleToContent(item.predictionId)">
                                    <div class="t">
                                        <p>{{item.authorName}}</p>
                                        <p>{{item.createTime | timestampToTime}}</p>
                                    </div>
                                    <div class="c">
                                        <p>{{item.title}}</p>
                                    </div>
                                    <div class="b">
                                        <p>金额：{{item.sum}}{{item.coinName}}</p>
                                        <p :class="'c'+item.status">{{item.status | toStatus1}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import BScroll from 'better-scroll'
    import {quizPurchasedPrediction,hitPurchasedPrediction} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                swiper:null,
                activeIndex:0,
                userName:'',
                token:'',
                page1:0,
                pageSize1:10,
                isMore1:true,
                data1:[],
                page2:0,
                pageSize2:10,
                isMore2:true,
                data2:[],
                scroll1:null,
                scroll2:null,
                // userName:'uw90998767950723',
                // token:'C47DCB059B6F4604077E2BF9A9190FC8',
            }
        },
        mounted:function(){
            let _this = this
            this.swiper = new Swiper ('.swiper-container', {
                threshold : 30,
                direction: 'horizontal',
                hashNavigation: {
                    watchState: true,
                },
                on:{
                    slideChangeTransitionStart:function(){
                        _this.activeIndex = this.activeIndex
                    },
                }
            })
            //安卓传参
            window['get_android_userName'] = function(e){
                _this.userName = e
                _this.USERNAME(e)
            }
            window['get_android_token'] = function(e){
                _this.token = e
                _this.TOKEN(e)
            }
            var asyncFun = ()=>{
                if(this.userName==''||this.userName===null||this.userName==null){
                    setTimeout(()=>{
                        asyncFun()
                    },300)
                }else{

                    this.getQuizPurchasedPrediction(this.userName,this.token)
                    this.gethitPurchasedPrediction(this.userName,this.token)
                }
            }
            asyncFun()

            // var abc = ()=>{
            //     this.USERNAME(this.userName)
            //     this.TOKEN(this.token)
            //
            //     this.getQuizPurchasedPrediction(this.userName,this.token)
            //     this.gethitPurchasedPrediction(this.userName,this.token)
            // }
            // abc()
            this.$nextTick(() => {
                this.scroll1 = new BScroll(this.$refs.wrapper1, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    pullUpLoad: {
                        threshold: -30
                    }
                })
                this.scroll1.on('pullingUp', () => {
                    this.isMore1?this.getQuizPurchasedPrediction(this.userName,this.token):''
                    this.scroll1.finishPullUp();
                    this.scroll1.refresh()

                })
                this.scroll2 = new BScroll(this.$refs.wrapper2, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    pullUpLoad: {
                        threshold: -30
                    }
                })
                this.scroll2.on('pullingUp', () => {
                    this.isMore2?this.gethitPurchasedPrediction(this.userName,this.token):''
                    this.scroll2.finishPullUp();
                    this.scroll2.refresh()

                })
            })
        },
        methods:{
            ...mapMutations(['USERNAME','TOKEN']),
            handleToPage(e){
                this.swiper.slideTo(e);
            },
            getQuizPurchasedPrediction(userName,token){
                this.page1 = this.page1+1
                quizPurchasedPrediction(userName,token,this.page1,this.pageSize1).then(res=>{
                    console.log('全部',res)
                    if(res.code==='0'){
                        if(res.data.purchasedPredictions.length<this.pageSize1){
                            this.isMore1 = false
                        }
                        this.data1 = [...this.data1,...res.data.purchasedPredictions]
                    }
                })
            },
            gethitPurchasedPrediction(userName,token){
                this.page2 = this.page2+1
                hitPurchasedPrediction(userName,token,this.page2,this.pageSize2).then(res=>{
                    console.log('命中',res)
                    if(res.code==='0'){
                        if(res.data.purchasedPredictions.length<this.pageSize2){
                            this.isMore2 = false
                        }
                        this.data2 = [...this.data2,...res.data.purchasedPredictions]
                    }
                })
            },
            handleToContent(predictionId){
                this.$router.push({name:'content',params:{predictionId:predictionId}});
            },

        },
    }
</script>
<style scoped lang="scss">
    .recommend{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .nav{
            width: 100%;
            height: 80px;
            padding:0 60px;
            box-sizing: border-box;
            display: flex;
            align-content: center;
            span{
                display: block;
                width: 50%;
                height: 80px;
                line-height: 80px;
                box-sizing: border-box;
                text-align: center;
                color: #808080;
                font-size: 28px;
                position: relative;
            }
            .active{
                color:#34C47C ;
            }
            .active:after{
                display: block;
                content: '';
                width: 100px;
                height: 4px;
                border-radius: 5px;
                background: #34C47C;
                position: absolute;
                bottom: 0;
                left:50%;
                transform: translateX(-50%);
            }
        }
        .swiper-container{
            box-sizing: border-box;
            position:fixed;
            top:80px;
            bottom: 0;
            width: 100%;
            .swiper-wrapper{
                .swiper-slide{
                    position: relative;
                    .wrapper{
                        position: absolute;
                        top:0;
                        bottom: 0;
                        width: 100%;
                        overflow: hidden;
                        box-sizing: border-box;
                        .content{
                            width: 100%;
                            ul{
                                li{
                                    width: 100%;
                                    height: 190px;
                                    padding: 30px;
                                    box-sizing: border-box;
                                    border-bottom: 1px solid #C9C9C9;
                                    /*border: 1px solid red;*/
                                    .t,.c,.b{
                                        width: 100%;
                                        height: 43.3px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                    }
                                    .t{
                                        p:nth-child(1){
                                            color: #333;
                                            font-size: 30px;
                                        }
                                        p:nth-child(2){
                                            color: #999;
                                            font-size: 28px;
                                        }
                                    }
                                    .c,.b{
                                        p{
                                            color: #999;
                                            font-size: 28px;
                                        }
                                        .c1{color:#34C47C; }
                                        .c2{color: #EF4E54;}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>