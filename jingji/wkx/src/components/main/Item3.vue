<template>
    <div class="mark" :class="isPC?'pc-item3':'mobile-item3'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l"><img src="../../assets/img/main/item3/l.png" alt=""></div>
                <div class="r">
                    <div class="d1"><span>竞技二打一</span>是国家体育总局棋牌运动管理中心（以下简称中心）认可的智力竞技体育项目。</div>
                    <div class="bot">
                        <div class="b">
                            <img src="../../assets/img/main/item3/1.png" alt="">
                            <div class="b-t1">全国竞技二打一</div>
                            <div class="b-t2">扑克锦标赛邀您来战</div>
                        </div>
                        <div class="b">
                            <img src="../../assets/img/main/item3/2.png" alt="">
                            <div class="b-t1"> 竞技二打一锦标赛落幕</div>
                            <div class="b-t2">百万奖金得主出炉</div>
                        </div>
                        <div class="b">
                            <img src="../../assets/img/main/item3/3.png" alt="">
                            <div class="b-t1">JJ斗地主冠军杯S2夏季赛B组</div>
                            <div class="b-t2">四队争霸硝烟再起</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    import Title from '../../components/Title'
    export default {
        components:{Title},
        data(){
            return{
                isPC:true,
                title:{
                    name:"项目背景",
                    des:"PROJECT BACKGROUND",
                    color:1,
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item3{
        width: 100%;
        height: 820px;
        background: #F3F3F3;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width:1200px;
                margin: 0 auto;
                margin-top: 112px;
                .l{
                    width: 320px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:760px;
                    flex-shrink: 0;
                    box-sizing: border-box;
                    .d1{
                        color: #333;
                        font-size: 30px;
                        line-height: 48px;
                        span{
                            font-weight: bold;
                        }
                    }
                    .bot{
                        margin-top: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .b{
                            width:229px;
                            img{
                                width: 100%;
                            }
                            .b-t1{
                                color: #333;
                                font-size: 18px;
                                text-align: center;
                                width: 100%;
                                margin-top: 10px;
                                white-space:nowrap;
                            }
                            .b-t2{
                                 color: #333;
                                 font-size: 18px;
                                 text-align: center;
                                 width: 100%;
                                 margin-top: 10px;
                             }

                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item3{
            height: 700px;
            padding-top: 100px;
            .con{
                .des-box{
                    width:900px;
                    margin-top:90px;
                    .l{
                        width:240px;
                    }
                    .r{
                        width:570px;
                        .d1{
                            font-size: 22px;
                            line-height: 36px;
                        }
                        .bot{
                            .b{
                                width: 172px;
                                .b-t1{
                                    font-size:13px;
                                    bottom: 7px;
                                }
                                .b-t2{
                                    font-size:13px;
                                    bottom: 7px;
                                }
                            }

                        }
                    }
                }
            }
        }

    }
    .mobile-item3{
        width: 100%;
        background: #F3F3F3;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top:10vw;
        .con{
            .des-box{
                margin-top: 10vw;
                .l{
                    width: 50vw;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:80vw;
                    flex-shrink: 0;
                    box-sizing: border-box;
                    margin: 0 auto;
                    margin-top: 10vw;
                    .d1{
                        color: #333;
                        font-size:4vw;
                        line-height:1.5;
                        span{
                            font-weight: bold;
                        }
                    }
                    .bot{
                        margin-top: 10vw;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .b{
                            overflow: hidden;
                            width:22vw;
                            position: relative;
                            img{
                                width: 100%;
                            }
                            .b-t{
                                color: #333;
                                font-size:3vw;
                                position: absolute;
                                bottom: 2.3vw;
                                text-align: center;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }




</style>
