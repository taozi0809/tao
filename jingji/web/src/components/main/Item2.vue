<template>
    <div class="Item2" :class="isPC?'pc-item2':'mobile-item2'" id="item2">
        <div class="title" v-if="isPC"><img src="../../assets/img/main/item2/title.png" alt=""></div>
        <div class="title" v-if="!isPC"><img src="../../assets/img/main/item2/m-title.png" alt=""></div>
        <div class="con">
            <div class="l"><img src="../../assets/img/main/item2/l.png" alt=""></div>
            <div class="r">竞技二打一起源湖北、安徽一带，俗称斗地主，是一种简单易学、趣味性强、并且能够锻炼思维的纸牌游戏，深受各年龄段用户的喜爱。基于这样的产品特性，我们在国家体育总局棋牌运动管理中心的指导下，搭建一个全国性的竞技二打一多终端平台，构建选手报名、竞赛、奖金发放的闭环体系。同时，我们积极邀请全国的合作方与我们一起共建用户的推广和运营体系，丰富比赛的种类和玩法，开放办赛能力，下沉赋能赛事推广合作方，打造区域性个性化竞技赛事，通过娱乐生活的两端并行，以赛事运营+用户运营的手段拓展全新市场。</div>
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
    .pc-item2{
        width: 100%;
        height: 550px;
        position: relative;
        box-sizing: border-box;
        padding-top: 100px;
        .title{
            margin: 0 auto;

            width:75vw;
            img{
                width: 100%;
            }
        }
        .con{
            width:75vw;
            margin: 0 auto;
            margin-top: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l{
                width: 31vw;
                min-width: 248px;
                flex-shrink: 0;
                img{
                    width: 100%;

                }
            }
            .r{
                width: 40vw;
                min-width: 320px;
                flex-shrink: 0;
                overflow: hidden;
                color: #9D6639;
                font-size: 20px;
                font-family: PingFang-SC-Heavy;
                line-height: 1.4;
            }
        }
    }
    .mobile-item2{
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
            margin-top: 6vw;
            .l{
                width: 90vw;
                margin: 0 auto;
                img{
                    width: 100%;

                }
            }
            .r{
                width: 90vw;
                margin: 0 auto;
                margin-top: 4vw;
                color: #9D6639;
                font-family: PingFang-SC-Heavy;
                /*font-size: 14px;*/
                font-size: 4vw;
                line-height: 1.2;
            }
        }
    }
</style>
