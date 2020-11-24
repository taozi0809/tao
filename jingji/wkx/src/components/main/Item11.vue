<template>
    <div class="mark" :class="isPC?'pc-item11':'mobile-item11'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
               <div class="l">
                   <div class="d">国家体育总局棋牌运动管理中心</div>
                   <div class="d">中国警察协会</div>
                   <div class="d">中国互联网上网服务行业协会</div>
                   <div class="d">中国互联网上网服务行业协会智力竞技分会</div>
                   <div class="d">中国智力运动产业基地</div>
                   <div class="d">中国智力运动网</div>
                   <div class="d">众智体育发展有限公司</div>
                   <div class="d">杉木（北京）投资咨询有限公司</div>
                   <div class="d">和合文化集团（中国）有限公司</div>
                   <div class="d">北京和合时代资产管理有限公司</div>
                   <div class="d">北京网络行业协会</div>
               </div>
               <div class="r">
                   <div class="d">路火科技有限公司</div>
                   <div class="d">国家标准化管理委员会</div>
                   <div class="d">香港新华集团</div>
                   <div class="d">新华社</div>
                   <div class="d">新京报</div>
                   <div class="d">文化和旅游部</div>
                   <div class="d">中国互联网协会</div>
                   <div class="d">中国支付清算协会</div>
                   <div class="d">网络不良与垃圾信息举报受理中心</div>
                   <div class="d">中国计算机学会计算机安全专业委员会</div>
                   <div class="d">中国通信行业协会</div>
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
                    name:"鸣谢单位",
                    des:"ACKNOWLEDGEMENT UNIT",
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
    .pc-item11{
        width: 100%;
        height:800px;
        box-sizing: border-box;
        padding-top: 100px;
        background-image:url("../../assets/img/main/item11/bg.png") ;
        background-size: 100% 100%;
        .con{
            .des-box{
                width: 1200px;
                margin: 0 auto;
                margin-top: 100px;
                display: flex;
                justify-content: space-between;
                .l,.r{
                    width: 50%;
                    box-sizing: border-box;
                    .d{
                        color: #333;
                        font-size: 24px;
                        margin-bottom: 18px;
                    }
                }
                .l{
                    text-align: right;
                    padding-right: 30px;
                }
                .r{
                    padding-left: 30px;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .pc-item11{
            height:650px;
            .con{
                .des-box{
                    width:900px;
                    margin-top:75px;
                    .l,.r{
                        .d{
                            font-size:18px;
                            margin-bottom: 13px;
                        }
                    }
                    .l{
                        padding-right: 22px;
                    }
                    .r{
                        padding-left: 22px;
                    }
                }
            }
        }
    }
    .mobile-item11{
        width: 100%;
        background-image:url("../../assets/img/main/item11/bg.png") ;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top:10vw;
        .con{
            .des-box{
                width: 80vw;
                margin: 0 auto;
                margin-top: 10vw;
                .l,.r{
                    .d{
                        color: #333;
                        font-size: 4vw;
                        margin-bottom: 4vw;
                    }
                }
            }
        }
    }
</style>
