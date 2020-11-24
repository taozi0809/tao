<template>
    <div class="mark" :class="isPC?'pc-item8':'mobile-item8'" id="item4">
        <swiper class="swiper" :options="swiperOptions">
            <swiper-slide>
                <div class="con">
                    <Title :title="title"/>
                    <div class="des-box">
                        <div class="l"><img src="../../assets/img/main/item8/l.png" alt=""></div>
                        <div class="r">
                            <div class="t">万康兴以智力竞技产业促进地区文化发展</div>
                            <!--                    <div class="d">2020/07/31  14:00:00</div>-->
                            <div class="d">原鞍山公安局局长王魁良认为：万康兴的落地可以帮助鞍山营造健康体育竞技文化和生态，激发和聚集新的经济活力，使得鞍山跻身于健康竞...</div>
                            <div class="xt"></div>

                            <div class="t">趣味棋牌产业的困境还是机遇？</div>
                            <!--                    <div class="d">2020/07/31  14:00:00</div>-->
                            <div class="d">自从国家体育总局棋牌运动管理中心将大众喜爱的棋牌游戏发展成专业水平的竞技化赛事，即“竞技二打一”纳入智力竞技体育项目...</div>
                            <div class="xt"></div>

                            <div class="t">率先开创竞技趣味棋牌风口的探路者</div>
                            <!--                    <div class="d">2020/07/31  14:00:00</div>-->
                            <div class="d">早年间，被官方和社会主流舆论认可的智力竞技运动只包括“五棋一牌”，即围棋、象棋、国际象棋、国际跳棋、五子棋和桥牌...</div>
                            <div class="xt"></div>

                        </div>
                    </div>
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="con1">
                    <Title :title="title1"/>
                    <div class="des-box" v-if="isPC">
                        <div class="l">
                            <div class="d1">1、《竞技二打一扑克赛事管理办法》国家体育总局棋牌运动管理中心颁发</div>
                            <div class="d1">3、《竞技二打一扑克技术等级条例实施细则》国家体育总局棋牌运动管理中心颁发</div>
                            <div class="d1">5、《竞技二打一扑克公共政策》国家体育总局棋牌运动管理中心颁发</div>
                            <div class="d1">7、《趣味棋牌竞技赛事组织与管理规范》中国互联网上网服务行业协会发布</div>
                            <div class="d1">9、《趣味棋牌竞技化项目公共政策撰写规范》中国智力运动网发布</div>
                            <div class="d1">11、《竞技趣味棋牌服务管理平台上线公告书》国家体育总局棋牌运动管理中心公告</div>
                            <div class="d1">13、《关于加快发展体育产业促进体育消费的若干意见》国务院印发</div>
                        </div>
                        <div class="r">
                            <div class="d2">2、《竞技二打一扑克竞赛规则》国家体育总局棋牌运动管理中心颁发</div>
                            <div class="d2">4、《竞技二打一扑克技术等级条例》国家体育总局棋牌运动管理中心颁发</div>
                            <div class="d2">6、《趣味棋牌竞技场馆运营服务规范》中国互联网上网服务行业协会发布</div>
                            <div class="d2">8、《趣味棋牌竞技网络赛事组织与管理规范》中国互联网上网服务行业协会发布</div>
                            <div class="d2">10、《趣味棋牌竞技化项目宣传要求》中国智力运动网发布</div>
                            <div class="d2">12、《趣味棋牌管理服务平台API厂商接口》国家体育总局棋牌运动管理中心公布</div>
                        </div>
                    </div>
                    <div class="des-box" v-if="!isPC">
                        <div class="d1">1、《竞技二打一扑克赛事管理办法》国家体育总局棋牌运动管理中心颁发</div>
                        <div class="d2">2、《竞技二打一扑克竞赛规则》国家体育总局棋牌运动管理中心颁发</div>
                        <div class="d1">3、《竞技二打一扑克技术等级条例实施细则》国家体育总局棋牌运动管理中心颁发</div>
                        <div class="d2">4、《竞技二打一扑克技术等级条例》国家体育总局棋牌运动管理中心颁发</div>
                        <div class="d1">5、《竞技二打一扑克公共政策》国家体育总局棋牌运动管理中心颁发</div>
                        <div class="d2">6、《趣味棋牌竞技场馆运营服务规范》中国互联网上网服务行业协会发布</div>
                        <div class="d1">7、《趣味棋牌竞技赛事组织与管理规范》中国互联网上网服务行业协会发布</div>
                        <div class="d2">8、《趣味棋牌竞技网络赛事组织与管理规范》中国互联网上网服务行业协会发布</div>
                        <div class="d1">9、《趣味棋牌竞技化项目公共政策撰写规范》中国智力运动网发布</div>
                        <div class="d2">10、《趣味棋牌竞技化项目宣传要求》中国智力运动网发布</div>
                        <div class="d1">11、《竞技趣味棋牌服务管理平台上线公告书》国家体育总局棋牌运动管理中心公告</div>
                        <div class="d2">12、《趣味棋牌管理服务平台API厂商接口》国家体育总局棋牌运动管理中心公布</div>
                        <div class="d1">13、《关于加快发展体育产业促进体育消费的若干意见》国务院印发</div>
                    </div>
                </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    import Title from '../../components/Title'

    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    export default {
        components:{Title, Swiper, SwiperSlide},
        data(){
            return{
                isPC:true,
                title:{
                    name:"新闻资讯",
                    des:"NEWS INFORMATION",
                    color:2,
                },
                title1:{
                    name:"国家政策",
                    des:"NATIONAL POLICY",
                    color:2,
                },
                swiperOptions:{
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop : true,
                },
            }
        },
        directives: {
            swiper: directive
        },
        created() {
            this.isPC=ispc()
        },
        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
    .pc-item8{
        width: 100%;
        height:800px;
        background-image: url("../../assets/img/main/item8/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 1200px;
                margin: 0 auto;
                margin-top: 100px;
                .l{
                    width: 620px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 540px;
                    position: relative;
                    top: 10px;
                    .t{
                        color: #fff;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .d{
                        color: #fff;
                        font-size: 14px;
                        width: 518px;
                        line-height: 21px;
                        margin-top:6px;
                    }
                    .xt{
                        background: #7C7C7C;
                        width: 537px;
                        height: 1px;
                        margin-top: 15px;
                        margin-bottom: 15px;
                    }

                }
            }
        }
        .con1{
            .des-box{
                display: flex;
                justify-content: space-between;
                width: 1200px;
                margin: 0 auto;
                margin-top: 60px;
                overflow: hidden;
                .l{
                    width: 600px;
                    flex-shrink: 0;
                    padding-right: 30px;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    .d1{
                        font-size: 20px;
                        color: #fff;
                        line-height: 30px;
                        margin-top: 15px;
                        text-indent: -2em;
                        margin-left: 2em;
                    }
                }
                .r{
                    width: 600px;
                    flex-shrink: 0;
                    padding-left: 30px;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    .d2{
                        font-size: 20px;
                        color: #fff;
                        line-height: 30px;
                        margin-top: 15px;
                        text-indent: -2em;
                        margin-left: 2em;
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item8{
            height:650px;
            padding-top: 100px;
            .con{
                .des-box{
                    width:900px;
                    margin-top:75px;
                    .l{
                        width:465px;
                        height: 270px;
                    }
                    .r{
                        width:405px;
                        .t{
                            font-size: 18px;
                        }
                        .d{
                            color: #fff;
                            font-size:12px;
                            width:388px;
                            line-height:15px;
                            margin-top:4px;
                        }
                        .xt{
                            width:402px;
                            height: 1px;
                            margin-top: 11px;
                            margin-bottom:11px;
                        }

                    }
                }
            }
            .con1{
                .des-box{
                    width: 900px;
                    margin-top:40px;
                    .l{
                        width:450px;
                        padding-right:20px;
                        .d1{
                            font-size:15px;
                            line-height:20px;
                            margin-top:15px;
                        }
                    }
                    .r{
                        width:450px;
                        padding-left: 20px;
                        .d2{
                            font-size: 15px;
                            line-height: 20px;
                            margin-top: 15px;
                        }
                    }
                }
            }

        }
    }
    .mobile-item8{
        width: 100%;
        background-image: url("../../assets/img/main/item8/bg.png");
        background-size:100% 20%;
        box-sizing: border-box;
        padding-bottom: 10vw;
        padding-top: 16vw;
        .con{
            .des-box{

                .l{
                    width: 80vw;
                    height: 45vw;
                    margin: 0 auto;
                    background: #BEBEBE;
                    margin-top: 10vw;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 80vw;
                    margin: 0 auto;
                    margin-top: 10vw;
                    .t{
                        color: #fff;
                        font-size:4vw;
                        font-weight: bold;
                        margin-bottom: 2vw;
                    }
                    .d{
                        color: #fff;
                        font-size:3vw;
                        line-height:1.5;
                        margin-bottom: 1vw;
                    }
                    .xt{
                        background: #7C7C7C;
                        width: 80vw;
                        height: 1px;
                        margin-top: 3vw;
                        margin-bottom:4vw;
                    }

                }
            }
        }
        .con1{
            .des-box{
                width: 90vw;
                margin: 0 auto;
                margin-top: 10vw;
                .d1,.d2{
                    font-size:4vw;
                    color: #fff;
                    line-height:1.5;
                    margin-top:2vw;
                    text-indent: -2em;
                    margin-left: 2em;
                }
            }
        }
    }
</style>

<style lang="scss">
    .pc-item8{
        .swiper-container{
             overflow: inherit;
         }
        .swiper-pagination-bullet{
            width: 16px;
            height: 16px;
            background: none;
            border: 2px solid rgba(200,200,200,1);
            opacity: 1;
            box-sizing: border-box;

        }
        .swiper-pagination-bullet-active{
            width: 16px;
            height: 16px;
            background: #fff;
            opacity: 1;
            border: none;
        }
        .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
            margin: 0 10px;
        }
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: -30px;
        }
    }
    .mobile-item8{
        .swiper-container{
            overflow: inherit;
        }
        .swiper-pagination-bullet{
            width:3vw;
            height: 3vw;
            background: none;
            border: 1px solid rgba(200,200,200,1);
            opacity: 1;
            box-sizing: border-box;

        }
        .swiper-pagination-bullet-active{
            width:3vw;
            height: 3vw;
            background: #fff;
            opacity: 1;
            border: none;
        }
        .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
            margin: 0 2vw;
        }
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: -8vw;
        }
    }
</style>

