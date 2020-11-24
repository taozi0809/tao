<template>
    <div class="Item6" :class="isPC?'pc-item6':'mobile-item6'" id="item6">
        <div class="title" v-if="isPC"><img src="../../assets/img/main/item6/title.png" alt=""></div>
        <div class="title" v-if="!isPC"><img src="../../assets/img/main/item6/m-title.png" alt=""></div>
        <div class="con">
            <div class="l">
                <div class="d1">如果您加入我们成为赛事合作伙伴，您可以获得：</div>
                <div class="d2">1. 平台业务介绍、推广资料，业务模式现场培训</div>
                <div class="d2">2. 招募选手运营服务支持</div>
                <div class="d2">3. 办比赛运营服务支持</div>
                <div class="d2">4. 人力资源工具、运营营销工具、财务工具、大数据等技术支持</div>
            </div>
            <div class="r"><img src="../../assets/img/main/item6/r.png" alt=""></div>
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
    .pc-item6{
        width: 100%;
        height: 600px;
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
            width:75vw;
            margin: 0 auto;
            margin-top: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l{
                width: 45vw;
                min-width: 360px;
                flex-shrink: 0;
                overflow: hidden;
                color: #9D6639;
                .d1{
                    font-size: 26px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .d2{
                    font-size: 22px;
                    margin-bottom: 10px;
                }
            }
            .r{
                width: 26vw;
                min-width: 78px;
                flex-shrink: 0;
                img{
                    width: 100%;
                }
            }
        }
        @media screen and (min-width:960px) and (max-width:1280px) {
            .con{

                .l{

                    .d1{
                        font-size: 20px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    .d2{
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                }

            }
        }
        @media screen and (min-width:1280px) and (max-width:1680px){
            .con{
                .l{
                    .d1{
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    .d2{
                        font-size: 20px;
                        margin-bottom: 10px;
                    }
                }

            }

        }

    }
    .mobile-item6{
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
            width: 90%;
            margin: 0 auto;
            margin-top: 8vw;
            .l{
                color: #9D6639;
                .d1{
                    font-size: 5vw;
                    font-weight: bold;
                    margin-bottom: 4vw;
                }
                .d2{
                    font-size: 4vw;
                    margin-bottom: 2vw;

                }
            }
            .r{
                width: 90%;
                margin: 0 auto;
                margin-top: 6vw;
                img{
                    width: 100%;
                }
            }

        }


    }
</style>
