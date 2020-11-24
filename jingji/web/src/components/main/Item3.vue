<template>
    <div class="Item3" :class="isPC?'pc-item3':'mobile-item3'" id="item3">
        <div class="title" v-if="isPC"><img src="../../assets/img/main/item3/title.png" alt=""></div>
        <div class="title" v-if="!isPC"><img src="../../assets/img/main/item3/m-title.png" alt=""></div>
        <div class="con">
            <div class="l">
                <div class="img"><img src="../../assets/img/main/item3/l.png" alt=""></div>
                <div class="des">
                    <div class="t1">流量优势</div>
                    <div class="t2">
                        <p>多社交产品引流</p>
                        <p>多平台直播裂变</p>
                        <p>多渠道合作推广</p>
                        <p>多KOL分享营销</p>
                    </div>
                </div>
            </div>
            <div class="c">
                <div class="img"><img src="../../assets/img/main/item3/c.png" alt=""></div>
                <div class="des">
                    <div class="t1">产品优势</div>
                    <div class="t2">
                        <p>发牌记录公开上链，公平公正</p>
                        <p>真人参赛全程备案，绝无虚假</p>
                        <p>超经典玩法二打一，欢乐竞技</p>
                        <p>24小时赛事不间断，随时参赛</p>
                    </div>
                </div>
            </div>
            <div class="r">
                <div class="img"><img src="../../assets/img/main/item3/r.png" alt=""></div>
                <div class="des">
                    <div class="t1">运营优势</div>
                    <div class="t2">
                        <p>顶尖运营专家运营培训</p>
                        <p>客服全程在线全程答疑</p>
                        <p>专业赛事人员在线指导</p>
                        <p>完善的推广和运营体系</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";

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
    .pc-item3{
        width: 100%;
        height: 500px;
        position: relative;
        box-sizing: border-box;
        padding-top: 100px;
        .title{
            margin: 0 auto;
            width: 75vw;
            img{
                width: 100%;
            }
        }
        .con{
            width: 75vw;
            margin: 0 auto;
            margin-top: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l,.c,.r{
                display: flex;
                background-image: url("../../assets/img/main/item3/bg.png");
                background-size:100% 100%;
                width: 23.5vw;
                min-width: 188px;
                box-sizing: border-box;
                padding: 20px;
                .img{
                    width: 42px;
                    margin-right: 36px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .des{
                    padding-top: 10px;
                    .t1{
                        color:#9D6639 ;
                        font-size: 24px;
                        font-weight: 800;
                        white-space:nowrap;
                    }
                    .t2{
                        p{
                            color:#9D6639 ;
                            font-size: 20px;
                            white-space:nowrap;
                        }
                    }
                }
            }
        }
        @media screen and (min-width:960px) and (max-width:1280px){
            .con{
                .l,.c,.r{
                    .img{
                        width:30px;
                        margin-right:20px;
                        flex-shrink: 0;
                        img{
                            width: 100%;
                        }
                    }
                    .des{
                        .t1{
                            font-size: 16px;
                        }
                        .t2{
                            p{
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
        @media screen and (min-width:1280px) and (max-width:1680px){
            .con{
                .l,.c,.r{
                    .des{
                        .t1{
                            font-size: 20px;
                        }
                        .t2{
                            p{
                                font-size: 16px;
                            }
                        }
                    }
                }
            }

        }

    }
    .mobile-item3{
        padding-top: 40px;
       .title{
           width:100vw;
           margin: 0 auto;
           margin-top: 4vw;
           img{
               width: 100%;
           }
       }
       .con{
           .l,.c,.r{
               width: 80vw;
               display: flex;
               background-image: url("../../assets/img/main/item3/bg.png");
               background-size:100% 100%;
               margin: 0 auto;
               margin-top: 6vw;
               box-sizing: border-box;
               padding: 6vw;
               .img{
                   width: 8vw;
                   margin-right: 4vw;
                   flex-shrink: 0;
                   img{
                       width: 100%;
                   }
               }
               .des{
                   padding-top: 10px;
                   .t1{
                       color:#9D6639 ;
                       font-size: 5vw;
                       font-weight: 800;
                       white-space:nowrap;
                   }
                   .t2{
                       p{
                           color:#9D6639 ;
                           font-size: 4vw;
                           white-space:nowrap;
                       }
                   }
               }
           }
       }

    }
</style>
