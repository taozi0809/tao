<template>
    <div class="Item4" :class="isPC?'pc-item4':'mobile-item4'" id="item4">
        <div class="title" v-if="isPC"><img src="../../assets/img/main/item4/title.png" alt=""></div>
        <div class="title" v-if="!isPC"><img src="../../assets/img/main/item4/m-title.png" alt=""></div>
        <div class="con">
            <div class="l">
                <div class="t"><img src="../../assets/img/main/item4/1.png" alt=""></div>
                <div class="b">
                    <div class="d1">俱乐部</div>
                    <div class="d2">初级伙伴，可通过邀约选手参赛和招募推广伙伴获取奖励。</div>
                </div>
                <div class="lj" v-if="isPC"><img src="../../assets/img/main/item4/lj.png" alt=""></div>
                
            </div>
            <div class="c">
                <div class="t"><img src="../../assets/img/main/item4/2.png" alt=""></div>
                <div class="b">
                    <div class="d1">分赛区</div>
                    <div class="d2">中级伙伴，由俱乐部升级成为分赛区。在俱乐部的基础上，开始增加了团队奖励。</div>
                </div>
                <div class="lj" v-if="isPC"><img src="../../assets/img/main/item4/lj.png" alt=""></div>
            </div>
            <div class="r">
                <div class="t"><img src="../../assets/img/main/item4/3.png" alt=""></div>
                <div class="b">
                    <div class="d1">分赛区</div>
                    <div class="d2">高级伙伴，由分赛区升级成为赛区。在分赛区的基础上，拓展了团队奖励。</div>
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
    .pc-item4{
        width: 100%;
        height: 550px;
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
            margin-top: 150px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l,.c,.r{
                flex: 1;
                flex-shrink: 0;
                height: 200px;
                position: relative;
                .t{
                    width: 48px;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .b{
                    margin-top: 20px;
                    .d1{
                        color: #9D6639;
                        font-size: 20px;
                        font-weight: bold;
                        text-align: center;
                    }
                    .d2{
                        color: #9D6639;
                        font-size: 16px;
                        width: 20vw;
                        min-width: 160px;
                        margin: 0 auto;
                        margin-top: 20px;
                        line-height: 1.5;
                    }
                }
                .lj{
                    position: absolute;
                    top: -3vw;
                    left: 13.7vw;
                    width: 22.5vw;
                    min-width: 176px;
                    img{
                        width: 100%;
                    }
                }
            }

        }


    }
    .mobile-item4{
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
                margin-top: 8vw;
                .t{
                    width: 8vw;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .b{
                    margin-top: 3vw;
                    .d1{
                        text-align: center;
                        color: #9D6639;
                        font-size: 5vw;
                        font-weight: bold;
                    }
                    .d2{
                        color: #9D6639;
                        width: 60vw;
                        margin: 0 auto;
                        margin-top: 2vw;
                        font-size: 4vw;
                        line-height: 1.2;
                    }
                }
            }
        }
    }
</style>
