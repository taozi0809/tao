<template>
    <div class="mark" :class="isPC?'pc-item12':'mobile-item12'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l">
                    <div class="l-img"><img src="../../assets/img/main/item12/1.png" alt=""></div>
                    <div class="l-r">
                        <div class="d1">杜坤-总部招商负责人</div>
                        <div class="d1"><span class="s1"><img src="../../assets/img/main/item12/t.png" alt=""></span>18888848729</div>
                        <div class="d1"><span class="s2"><img src="../../assets/img/main/item12/c.png" alt=""></span>18888848729</div>
                        <div class="d1"><span class="s1"><img src="../../assets/img/main/item12/b.png" alt=""></span>深圳市南山区阳光科创中心A座19</div>
                    </div>
                </div>
                <div class="r">
                    <div class="l-img"><img src="../../assets/img/main/item12/2.png" alt=""></div>
                    <div class="l-r">
                        <div class="d1">臧乐-济南招商中心负责人</div>
                        <div class="d1"><span class="s1"><img src="../../assets/img/main/item12/t.png" alt=""></span>13455807777</div>
                        <div class="d1"><span class="s2"><img src="../../assets/img/main/item12/c.png" alt=""></span>13455807777</div>
                        <div class="d1"><span class="s3"><img src="../../assets/img/main/item12/b.png" alt=""></span>济南市历下区汉峪金谷A3-5</div>
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
                    name:"联系我们",
                    des:"CONTACT US",
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
    .pc-item12{
        width: 100%;
        height:600px;
        background: #fff;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                width: 1200px;
                margin: 0 auto;
                margin-top: 100px;
                display: flex;
                justify-content: space-between;
                .l,.r{
                    width: 600px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 35px;
                    .l-img{
                        width: 150px;
                        margin-right: 30px;
                        img{
                            width: 100%;
                        }
                    }
                    .l-r{
                        .d1{
                            color: #333;
                            font-size: 20px;
                            line-height: 36px;
                            display: flex;
                            align-items: center;
                            span{
                                width: 12px;
                                display: block;
                                margin-right: 10px;
                                img{
                                    width: 100%;
                                }
                            }
                            .s1{
                                width: 12px;
                            }
                            .s2{
                                width: 18px;
                            }
                            .s3{
                                width: 14px;
                            }
                        }

                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item12{
            height:500px;
            padding-top: 100px;
            .con{
                .des-box{
                    width:900px;
                    margin-top: 75px;
                    .l,.r{
                        width:450px;
                        padding:26px;
                        .l-img{
                            width: 112px;
                            margin-right:22px;
                        }
                        .l-r{
                           .d1{
                               font-size: 15px;
                               line-height: 27px;
                               span{
                                   width: 9px;
                                   margin-right: 7px;
                               }
                               .s1{
                                   width: 9px;
                               }
                               .s2{
                                   width: 14px;
                               }
                               .s3{
                                   width: 11px;
                               }
                           }
                        }
                    }
                }
            }

        }
    }
    .mobile-item12{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top: 16vw;
        .con{
            .des-box{
                width: 90vw;
                margin: 0 auto;
                margin-top: 10vw;
                .l,.r{
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    margin-bottom: 10vw;
                    .l-img{
                        width:22vw;
                        margin-right:4vw;
                        flex-shrink: 0;
                        img{
                            width: 100%;
                        }
                    }
                    .l-r{
                        .d1{
                            color: #333;
                            font-size:3.5vw;
                            line-height:7vw;
                            display: flex;
                            align-items: center;
                            span{
                                width:2.5vw;
                                display: block;
                                margin-right:2vw;
                                img{
                                    width: 100%;
                                }
                            }
                            .s1{
                                width: 2vw;
                            }
                            .s2{
                                width: 3vw;
                            }
                            .s3{
                                width: 2.4vw;
                            }
                        }

                    }
                }
            }
        }
    }
</style>
