<template>
    <div class="home">
        <div v-if="!startLoad">
            <Head/>
            <section class="banner">
                <div class="swiper-box">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in carouselCtoModelList" :key="item.id">
                                <span class="img-box" @click="handleLinkTo(item,'banner')">
                                    <img :src="item.posterUrl" :alt="item.name"></span>
                            </div>
                        </div>
                        <!-- 如果需要分页器 -->
                        <!--<div class="swiper-pagination"></div>-->
                    </div>

                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev" id="swiper-button-prev-home"></div>
                    <div class="swiper-button-next" id="swiper-button-next-home"></div>
                </div>
            </section>

            <section class="column" v-for="item in videoItemCtoModelList" :key="item.id" v-if="item.status==0">
                <div class="top">
                    <p>{{item.name}}</p>
                    <p class="see-all" @click="handleLinkToAll(JSON.stringify(item.id))">{{lang.hasOwnProperty('lang')?langCon[lang.lang].home.sellAll:''}} ></p>
                </div>
                <div class="list">
                    <ul>
                        <li v-for="item1 in item.videoBaseListCtoModel.videoBaseCtoModelList.slice(0,6)" @click="handleLinkTo(item1)">
                            <span><img :src="item1.posterUrl" :alt="item1.genreName"></span>
                            <i class="vip-tag" v-if="item1.isVip==0">vip</i>
                            <div class="hover">
                                <div class="txt">
                                    <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].home.watch:''}}</p>
                                    <span><img src="../assets/img/icon-triangle.png" alt="vip"></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <Foot/>
        </div>
        <load ref="load"/>
    </div>
</template>

<script>
    import Head from '../components/Head'
    import Foot from '../components/Foot'
    import Swiper from 'swiper';
    import {mapState, mapMutations} from 'vuex'
    import {videoItemList} from "../service/api";
    import {langCon} from "../assets/data/langCon";

    export default {
        metaInfo: {
            title: 'Watch Free Chinese Dramas and Movies Online - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, chinese movies, watch chinese drama online, chinese movies online, watch chinese movies online, popular chinese drama 2019, chinese movie streaming'
            },
                {
                    name: 'description',
                    content: 'Watch all the most popular Chinese TV Dramas, Variety Shows and Movies for FREE! Stream your favourite Chinese programmes in HD anytime, anywhere. The latest on-demand Chinese TV dramas and variety programs have multi-language subtitles, with an endless variety of choices ready for your viewing enjoyment.'
                }],
        },
        components:{Head,Foot},
        data(){
            return{
                langCon:{},
                swiper:null,
                carouselCtoModelList:[],
                videoItemCtoModelList:[],
            }
        },
        computed:{
            ...mapState(['lang','isLogin','country','startLoad']),
        },
        created:function(){
            this.langCon = langCon

        },
        mounted:function(){
            if(this.startLoad){this.$refs.load.Load(true)}
            var a=()=>{if(this.startLoad){setTimeout(()=>{a()},100)}else{this.videoItemList()}};a()
        },
        methods:{
            ...mapMutations(['LOGINTYPE']),
            initSwiper(){
                this.swiper = new Swiper('.swiper-container', {
                    direction : 'horizontal',
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    slidesPerView : 2,
                    slidesOffsetBefore : 269,
                    initialSlide:1,
                    loop : true,
                })
            },
            handleLinkTo(item,type){
                if(!this.isLogin){
                    this.LOGINTYPE('loginPage')
                }else{
                    this.$router.push({
                        path: '/details',
                        query: {
                            id:type=='banner'?item.videoBaseId:item.id,
                            fileId:item.fileId,
                            typeName:item.typeName
                        }
                    })
                }
            },
            handleLinkToAll(type){
                this.$router.push({
                    path: '/all',
                    query: {
                        type:type
                    }
                })
            },
            videoItemList(){
                videoItemList(null,null,this.country,10,1,this.lang.lang).then(res=>{
                    console.log('语言栏目：',res)
                    this.$refs.load.Load(false)
                    if(res.code==0){
                        this.carouselCtoModelList=res.data.carouselListCtoModel.carouselCtoModelList
                        setTimeout(()=>{this.initSwiper()},0)
                        this.videoItemCtoModelList=res.data.videoItemCtoModelList
                    }
                })
            },
        },
    }
</script>


<style lang="scss" scoped>
    .home{
        .banner{
            width: 100%;
            height: 750px;
            background: url("../assets/img/bg.png") no-repeat;
            background-size: cover;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            .swiper-box{
                width: 1200px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                .swiper-container{
                    text-align: center;
                    width: 1076px;
                    overflow: hidden;
                    .swiper-wrapper{
                        width: 100%;
                        .swiper-slide {
                            width:538px;
                            .img-box{
                                width:538px;
                                display: block;
                                img{
                                    width: 96%;
                                    margin: 0 auto;
                                }
                            }
                        }
                    }
                }
            }
            #swiper-button-next-home,#swiper-button-prev-home{
                outline:none;
            }
            #swiper-button-next-home{
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23fff'%2F%3E%3C%2Fsvg%3E");
            }
            #swiper-button-prev-home{
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23fff'%2F%3E%3C%2Fsvg%3E");

            }
        }

        .column{
            width: 100%;
            min-width: 1200px;
            margin: 0 auto;
            .top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                padding-bottom: 25px;
                p:nth-child(1){
                    color: #fff;
                    font-size: 24px;
                    font-weight: bold;
                }
                .see-all{
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .see-all:hover{
                    color: #358dfe;
                }
            }

            .list{
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 60px;
                padding: 0 20px;
                ul{
                    width: 100%;
                    overflow: hidden;
                    display: grid;
                    grid-template-columns: repeat(6, 16.67%);
                    grid-template-rows: none;
                    li{
                        overflow: hidden;
                        position: relative;
                        z-index: 10;
                        margin-right: 20px;
                        span{
                            display: block;
                            width: 100%;
                            img{
                                width: 100%;
                            }
                        }
                        .hover{
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top:0;
                            left:0;
                            background: rgba(0,0,0,.6);
                            z-index: 10;
                            /*display: flex;*/
                            align-items: center;
                            justify-content: center;
                            display: none;
                            .txt{
                                display: flex;
                                align-items: center;
                                padding: 8px 30px;
                                background:#358dfe ;
                                border-radius: 30px;
                                cursor: pointer;
                                p{
                                    font-size: 16px;
                                    font-weight: bold;
                                    color: #fff;
                                    position: relative;
                                    left: 7px;
                                }
                                span{
                                    display: block;
                                    width: 20px;
                                    transform: rotate(-90deg);
                                    position: relative;
                                    left: 7px;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }

                        }
                        .vip-tag{
                            position: absolute;
                            width: 30px;
                            height: 30px;
                            background: #358dfe;
                            overflow: hidden;
                            border-radius: 50%;
                            color: #fff;
                            font-size: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 10;
                            right: 5px;
                            top: 5px;
                        }
                    }
                    li:hover{
                        .hover{
                            display: flex;
                        }
                    }

                }
            }
        }


    }
</style>