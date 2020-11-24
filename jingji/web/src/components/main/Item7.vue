<template>
    <div class="Item7" :class="isPC?'pc-item7':'mobile-item7'" id="item7">
        <div class="title" v-if="isPC"><img src="../../assets/img/main/item7/title.png" alt=""></div>
        <div class="title" v-if="!isPC"><img src="../../assets/img/main/item7/m-title.png" alt=""></div>
        <div class="con">
            <div class="list1">
                <div class="img"><img src="../../assets/img/main/item7/1.png" alt=""></div>
                <div class="b">
                    <div class="d1">合法合规</div>
                    <div class="d2">我们是一个国家体育总局棋牌运动管理中心官方授权的机构。双方携手打造棋牌竞技赛事，弘扬中国传统棋牌文化</div>
                </div>
            </div>
            <div class="list2">
                <div class="img"><img src="../../assets/img/main/item7/2.png" alt=""></div>
                <div class="b">
                    <div class="d1">公平公正</div>
                    <div class="d2">国家体育总局棋牌运动管理中心严格审核，赛事信息开放到区块链平台，在线可查，保证赛事的公平公正</div>
                </div>
            </div>
            <div class="list3">
                <div class="img"><img src="../../assets/img/main/item7/3.png" alt=""></div>
                <div class="b">
                    <div class="d1">综合平台</div>
                    <div class="d2">智力竞技、休闲娱乐、生活电商多维融合，为用户提供竞技、娱乐、生活三位一体的综合性平台</div>
                </div>
            </div>
            <div class="list4">
                <div class="img"><img src="../../assets/img/main/item7/4.png" alt=""></div>
                <div class="b">
                    <div class="d1">竞技棋牌</div>
                    <div class="d2">汇集全球竞技棋牌爱好者，同场竞技，以牌会友，以技取胜，带来欢乐的同时还可以获取丰厚的奖金</div>
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
    .pc-item7{
        width: 100%;
        height: 880px;
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
            margin-top: 60px;

            .list1,.list2,.list3,.list4{
                display: flex;
                align-items: center;
                margin-bottom: 40px;
                .img{
                    width: 114px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .b{
                    color: #9D6639;
                    .d1{
                        font-size: 26px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    .d2{
                        font-size: 22px;
                    }
                }
            }
        }


    }
    .mobile-item7{
        margin-bottom: 10vw;
        .title{
            width:100vw;
            margin: 0 auto;
            margin-top: 4vw;
            img{
                width: 100%;
            }
        }
        .con{
            width: 90vw;
            margin: 0 auto;
            margin-top: 6vw;
            .list1,.list2,.list3,.list4{
                display: flex;
                align-items: center;
                margin-bottom: 6vw;
                .img{
                    width: 12vw;
                    margin-right: 6vw;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .b{
                    color: #9D6639;
                    .d1{
                        font-size: 5vw;
                        font-weight: bold;
                        margin-bottom: 2vw;
                    }
                    .d2{
                       font-size: 4vw;
                    }
                }
            }
        }
    }
</style>
