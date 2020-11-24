<template>
    <div class="mark" :class="isPC?'pc-item7':'mobile-item7'" id="item7">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l">
                    <div class="des1">如果您加入我们成为赛事合作伙伴，您可以获得：</div>
                    <div class="des2">1. 平台业务介绍、推广资料，业务模式现场培训</div>
                    <div class="des2">2. 招募选手运营服务支持</div>
                    <div class="des2">3. 招募选手运营服务支持</div>
                    <div class="des2">4. 办比赛运营服务支持</div>
                    <div class="des2">5. 人力资源工具、运营营销工具、财务工具、大数据等技术支持</div>
                </div>
                <div class="r"><img src="../../assets/img/main/item7/pic.png" alt=""></div>
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
                    name:"扶持计划",
                    des:"SUPPORT PLAN",
                },
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
        height:730px;
        background-image: url("../../assets/img/main/item7/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            width: 1200px;
            margin: 0 auto;
            .des-box{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1200px;
                margin: 0 auto;
                margin-top: 50px;
                .l{
                    width:770px;
                    flex-shrink: 0;
                    .des1{
                        color:#6381B7;
                        font-size: 26px;
                        font-weight: bold;
                        padding-bottom: 20px;
                    }
                    .des2{
                        color:#6381B7;
                        font-size: 20px;
                        font-weight: bold;
                        margin-top: 10px;
                    }
                }
                .r{
                    width:430px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
            }
        }

        @media screen and (max-width: 1024px) {
            .con{
                width: 900px;
                .des-box{
                    width: 900px;
                    .l{
                        width:580px;
                        flex-shrink: 0;
                        .des1{
                            font-size: 20px;
                        }
                        .des2{
                            font-size: 16px;
                        }
                    }
                    .r{
                        width:320px;
                    }
                }
            }

        }

    }
    .mobile-item7{
        width: 100%;
        background-image: url("../../assets/img/main/item7/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con{

            .des-box{
                width: 90vw;
                margin: 0 auto;
                margin-top: 6vw;
                .l{
                    .des1{
                        color:#6381B7;
                        font-size: 4vw;
                        font-weight: bold;
                        line-height: 1.5;
                        box-sizing: border-box;
                        padding-bottom: 10px;
                    }
                    .des2{
                        color:#6381B7;
                        font-size: 4vw;
                        margin-top: 10px;
                        line-height: 1.5;
                        font-family: 微软雅黑;
                    }
                }
                .r{
                    width:80vw;
                    margin: 0 auto;
                    margin-top: 20px;
                    img{
                        width: 100%;
                    }
                }
            }
        }

    }
</style>
