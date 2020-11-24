<template>
    <div class="mark" :class="isPC?'pc-item9':'mobile-item9'" id="item5">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="i">
                    <div class="it">
                        <div class="l"><img src="../../assets/img/main/item9/1.png" alt=""></div>
                        <div class="r">
                            <div class="rt">孙总</div>
                            <div class="rb">山东济南招商中心负责人</div>
                        </div>
                    </div>
                    <div class="ib">感谢疫情期间有万康兴的出现，让我不到半个月的时间，就能够有27万的收入。这在疫情期间、中美“新冷战”期间，是不可想象的机遇。我们的项目，只要是商业嗅觉敏锐的人，都会认为这是个大机会。项目本身成本低，风险低，回报极高；大部分人最缺乏的是自己去说服自己的勇气。</div>
                </div>
                <div class="i">
                    <div class="it">
                        <div class="l"><img src="../../assets/img/main/item9/2.png" alt=""></div>
                        <div class="r">
                            <div class="rt">李总</div>
                            <div class="rb">辽宁某公司白领</div>
                        </div>
                    </div>
                    <div class="ib">接触到万康兴以后，我才知道原来在赚钱这件事情上，我的以往认知都是错误的。一台手机，足不出户，我就可以获取万千用户。这要得益于万康兴强有力的运营支持、技术支持——用户可以自己裂变，推广系统高效简洁，商学院支持给力，极大的给我们每个推广商赋能。</div>
                </div>
                <div class="i">
                    <div class="it">
                        <div class="l"><img src="../../assets/img/main/item9/3.png" alt=""></div>
                        <div class="r">
                            <div class="rt">王总</div>
                            <div class="rb">深圳小肥羊火锅第一人</div>
                        </div>
                    </div>
                    <div class="ib">现在我什么都不缺，我就是想留名。万康兴合法合规，有法必依，帮助整个行业突破灰色地带的同时，能够把有趣味性的竞技项目带给普罗大众，不仅能够促进全民智力健身，还能够减少由于非法博彩导致的家庭问题、社会问题、居民财产安全问题。</div>
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
                    name:"客户见证",
                    des:"CUSTOMER TESTIMONIALS",
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
    .pc-item9{
        width: 100%;
        height:800px;
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
                .i{
                    width: 370px;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    padding: 30px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 0px 57px 0px #BEBDBD;
                    border-radius:10px;
                    overflow: hidden;
                    .it{
                        display: flex;
                        align-items: center;
                        .l{
                            width: 68px;
                            margin-right: 20px;
                            img{
                                width: 100%;
                            }
                        }
                        .r{
                            .rt{
                                color: #373737;
                                font-size: 24px;
                            }
                            .rb{
                                color: #CC1B17;
                                font-size: 18px;
                                margin-top: 10px;
                            }
                        }
                    }
                    .ib{
                        color: #333333;
                        font-size: 20px;
                        margin-top: 40px;
                        line-height: 30px;
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item9{
            height:635px;
            padding-top: 100px;
            .con{
                .des-box{
                    width:900px;
                    margin-top: 75px;
                    .i{
                        width: 277px;
                        padding: 22px;
                        .it{
                            .l{
                                width: 51px;
                                margin-right: 15px;
                            }
                            .r{
                                .rt{
                                    font-size: 18px;
                                }
                                .rb{
                                    font-size: 13px;
                                    margin-top: 7px;
                                }
                            }
                        }
                        .ib{
                            font-size: 15px;
                            margin-top: 30px;
                            line-height: 22px;
                        }
                    }
                }
            }

        }
    }
    .mobile-item9{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top: 16vw;
        .con{
            .des-box{
                width: 80vw;
                margin: 0 auto;
                margin-top: 10vw;
                .i{
                   margin-bottom: 15vw;
                    .it{
                        display: flex;
                        align-items: center;
                        .l{
                            width: 12vw;
                            margin-right: 2vw;
                            img{
                                width: 100%;
                            }
                        }
                        .r{
                            position: relative;
                            top: -0.5vw;
                            .rt{
                                color: #373737;
                                font-size: 4vw;
                            }
                            .rb{
                                color: #CC1B17;
                                font-size: 3.5vw;
                                margin-top:1.5vw;
                            }
                        }
                    }
                    .ib{
                        color: #333333;
                        font-size:4vw;
                        margin-top: 6vw;
                        line-height:1.5;
                    }
                }
            }
        }
    }
</style>
