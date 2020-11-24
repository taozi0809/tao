<template>
    <div class="mark" :class="isPC?'pc-item10':'mobile-item10'" id="item6">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="c"><span>张先生</span> 13345678888</div>
                <div class="bot">
                    <div class="i">
                        <div class="ib"><img src="../../assets/img/main/item10/1.png" alt=""></div>
                        <div class="i1">wankangxing@163.com</div>
                    </div>
                    <div class="i">
                        <div class="ib"><img src="src/assets/img/main/item12/2.png" alt=""></div>
                        <div class="i1">0755-5566778</div>
                    </div>
                    <div class="i">
                        <div class="ib"><img src="../../assets/img/main/item10/3.png" alt=""></div>
                        <div class="i1">深圳市南山区阳光科创A座1909万康兴</div>
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
                    name:"合作推广",
                    des:"COOPERATIVE PROMOTION",
                    color:2,
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item10{
        width: 100%;
        height:400px;
        background-image:url("../../assets/img/main/item10/bg.png") ;
        background-size: 100% 100%;
        background-position: 0 -1px;
        box-sizing: border-box;
        padding-top:100px;
        .con{
            .des-box{
                width: 1200px;
                margin: 0 auto;
                .c{
                    width: 410px;
                    height: 60px;
                    border:1px solid rgba(255,255,255,1);
                    text-align: center;
                    line-height: 60px;
                    color: #fff;
                    font-size: 36px;
                    font-weight:bold;
                    margin: 0 auto;
                    margin-top:50px;
                    span{
                        font-weight: normal;
                    }
                }
                .bot{
                    display: flex;
                    justify-content: space-around;
                    width: 900px;
                    margin: 0 auto;
                    margin-top: 70px;
                    .i{
                        display: flex;
                        align-items: center;
                        .ib{
                            width: 35px;
                            margin-right: 8px;
                            img{
                                width: 100%;
                            }
                        }
                        .i1{
                            color: #fff;
                            font-size: 16px;
                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item10{
            height:300px;
            padding-top:75px;
            .con{
                .des-box{
                    width: 900px;
                    .c{
                        width:300px;
                        height: 45px;
                        line-height: 45px;
                        font-size:27px;
                        margin-top:35px;
                    }
                    .bot{
                        width: 675px;
                        margin: 0 auto;
                        margin-top:35px;
                        .i{
                            margin-right: 45px;
                            .ib{
                                width: 26px;
                                margin-right: 6px;
                            }
                            .i1{
                                font-size:12px;
                            }
                        }
                    }
                }
            }

        }
    }
    .mobile-item10{
        width: 100%;
        background-image:url("../../assets/img/main/item10/bg.png") ;
        background-size:auto 100%;
        background-position: -900px -1px;
        box-sizing: border-box;
        padding-bottom:6vw;
        padding-top: 16vw;
        .con{
            .des-box{
                width: 80vw;
                margin: 0 auto;
                .c{
                    width:55vw;
                    height:15vw;
                    border:1px solid rgba(255,255,255,1);
                    text-align: center;
                    line-height: 15vw;
                    color: #fff;
                    font-size: 4vw;
                    font-weight:bold;
                    margin: 0 auto;
                    margin-top:10vw;
                    span{
                        font-weight: normal;
                        padding-right:2vw;
                    }
                }
                .bot{
                    margin-top:10vw;
                    margin-left:7vw;
                    .i{
                        display: flex;
                        align-items: center;
                        margin-right:4vw;
                        margin-bottom:3vw;
                        .ib{
                            width:5vw;
                            margin-right:2vw;
                            flex-shrink: 0;
                            img{
                                width: 100%;
                            }
                        }
                        .i1{
                            color: #fff;
                            font-size:3.5vw;
                            position: relative;
                            top: -0.5vw;
                        }
                    }
                }
            }
        }
    }
</style>
