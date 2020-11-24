<template>
    <div class="footer" :class="isPC?'pc-footer':'mobile-footer'">
        <div class="con" v-if="isPC">
            <div class="des-box">
                <div class="l">
                    <div class="d1">赛事指导单位： </div>
                    <div class="d2">中国智力运动产业基地</div>
                    <div class="d2">中国互联网上网服务行业协会</div>
                </div>
                <div class="r">
                    <div class="b">
                        <div class="b2"><img src="../assets/img/footer/download.png" alt=""></div>
                        <div class="b1">扫码下载</div>
                        <div class="b1">（ios敬请期待）</div>
                    </div>
                    <div class="b">
                        <div class="b2"><img src="../assets/img/footer/gzh.png" alt=""></div>
                        <div class="b1">扫码关注</div>
                        <div class="b1">官方公众号</div>
                    </div>
                </div>
            </div>
            <div class="bot">琼ICP备20002829号</div>
        </div>
        <div class="con" v-if="!isPC">
            <div class="des-box">
                <div class="l">
                    <div class="d1">赛事指导单位： </div>
                    <div class="d2">中国智力运动产业基地</div>
                    <div class="d2">中国互联网上网服务行业协会</div>
                </div>
                <div class="r">
                    <div class="b">
                        <div class="b2"><img src="../assets/img/footer/download.png" alt=""></div>
                        <div class="b3">
                            <div class="b1">扫码下载</div>
                            <div class="b1">(ios敬请期待)</div>
                        </div>
                    </div>
                    <div class="b">
                        <div class="b2"><img src="../assets/img/footer/gzh.png" alt=""></div>
                        <div class="b3">
                            <div class="b1">扫码关注</div>
                            <div class="b1">官方公众号</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bot">琼ICP备20002829号</div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../utils/isPc";

    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-footer{
        display: flex;
        width: 100%;
        height:330px;
        background: #05294D;
        .con{
            width: 100%;
            .des-box{
                box-sizing: border-box;
                width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                margin-top: 60px;
                .l{
                    .d1{
                        color: #fff;
                        font-size: 18px;
                        margin-bottom: 24px;
                    }
                    .d2{
                        color: #fff;
                        font-size: 18px;
                        margin-bottom: 10px;
                    }
                }
                .r{
                    display: flex;
                    .b{
                        margin-left: 25px;
                        .b2{
                            width: 136px;
                            img{
                                width: 100%;
                            }
                        }
                        .b1{
                            color: #fff;
                            font-size: 17px;
                            text-align: center;
                            margin-top: 15px;
                        }
                    }
                }
            }
            .bot{
                color: #fff;
                font-size: 16px;
                text-align: center;
                margin-top: 30px;
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .pc-footer{
            height:250px;
            .con{
                .des-box{
                    width: 900px;
                    margin-top: 45px;
                    .l{
                        .d1{
                            font-size: 14px;
                            margin-bottom:18px;
                        }
                        .d2{
                            font-size: 14px;
                            margin-bottom:7px;
                        }
                    }
                    .r{
                        .b{
                            margin-left:18px;
                            .b2{
                                width: 102px;
                            }
                            .b1{
                                font-size: 13px;
                                margin-top: 11px;
                            }
                        }
                    }
                }
                .bot{
                    font-size: 12px;
                    margin-top: 22px;
                }
            }
        }
    }
    .mobile-footer{
        width: 100%;
        box-sizing: border-box;
        background: #05294D;
        height:56vw;
        .con{
            width: 100%;
            .des-box{
                width: 80vw;
                margin: 0 auto;
                padding-top: 6vw;
                .l{
                    .d1{
                        color: #fff;
                        font-size: 3.5vw;
                        margin-bottom:3.5vw;
                    }
                    .d2{
                        color: #fff;
                        font-size: 3.5vw;
                        margin-bottom:1.5vw;
                    }
                }
                .r{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 6vw;
                    .b{
                        display: flex;
                        align-items: center;
                        width:40vw;
                        .b2{
                            flex-shrink: 0;
                            width: 15vw;
                            margin-right: 2vw;
                            img{
                                width: 100%;
                            }
                        }
                        .b3{
                            .b1{
                                color: #fff;
                                font-size:3vw;
                                margin-top: 2vw;
                            }
                        }

                    }
                }
            }
            .bot{
                color: #fff;
                font-size:3vw;
                width: 80vw;
                margin: 0 auto;
                margin-top:6vw;
            }
        }
    }
</style>
