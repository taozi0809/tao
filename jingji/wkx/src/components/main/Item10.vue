<template>
    <div class="mark" :class="isPC?'pc-item10':'mobile-item10'" id="item6">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="c">
                    <div class="d1">1、《竞技二打一扑克赛事管理办法》国家体育总局棋牌运动管理中心颁发</div>
                    <div class="d2">2、《竞技二打一扑克竞赛规则》国家体育总局棋牌运动管理中心颁发</div>
                    <div class="d1">3、《竞技二打一扑克技术等级条例实施细则》国家体育总局棋牌运动管理中心颁发</div>
                    <div class="d2">4、《竞技二打一扑克技术等级条例》国家体育总局棋牌运动管理中心颁发</div>
                    <div class="d1">5、《竞技二打一扑克公共政策》国家体育总局棋牌运动管理中心颁发</div>
                    <div class="d2">6、《趣味棋牌竞技场馆运营服务规范》中国互联网上网服务行业协会发布</div>
                    <div class="d1">7、《趣味棋牌竞技赛事组织与管理规范》中国互联网上网服务行业协会发布</div>
                    <div class="d2">8、《趣味棋牌竞技网络赛事组织与管理规范》中国互联网上网服务行业协会发布</div>
                    <div class="d1">9、《趣味棋牌竞技化项目公共政策撰写规范》中国智力运动网发布</div>
                    <div class="d2">10、《趣味棋牌竞技化项目宣传要求》中国智力运动网发布</div>
                    <div class="d1">11、《竞技趣味棋牌服务管理平台上线公告书》国家体育总局棋牌运动管理中心公告</div>
                    <div class="d2">12、《趣味棋牌管理服务平台API厂商接口》国家体育总局棋牌运动管理中心公布</div>
                    <div class="d1">13、《关于加快发展体育产业促进体育消费的若干意见》国务院印发</div>
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
                    name:"国家政策",
                    des:"NATIONAL POLICY",
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
        height:840px;
        background-image:url("../../assets/img/main/item10/bg.png");
        background-size: 100% 100%;
        background-position: 0 -1px;
        box-sizing: border-box;
        padding-top:100px;
        .con{
            .des-box{
                width: 1200px;
                margin: 0 auto;
                margin-top: 40px;
                .c{
                    width: 1148px;
                    height: 600px;
                    background: rgba(255,255,255,.8);
                    margin: 0 auto;
                    border-radius:4px;
                    box-sizing: border-box;
                    padding: 30px 120px;
                    .d1,.d2{
                        color: #000;
                        font-size: 24px;
                        line-height: 42px;
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item10{
            height:700px;
            padding-top:75px;
            .con{
                .des-box{
                    width: 900px;
                    .c{
                        width: 860px;
                        height:450px;
                        padding: 22px 88px;
                        .d1,.d2{
                            font-size: 18px;
                            line-height: 31px;
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
                width: 90vw;
                margin: 0 auto;
                margin-top: 10vw;
                .c{
                    width:90vw;
                    background: rgba(255,255,255,.8);
                    margin: 0 auto;
                    border-radius:4px;
                    box-sizing: border-box;
                    padding: 4vw;
                    .d1,.d2{
                        color: #000;
                        font-size:4vw;
                        margin-bottom: 4vw;
                        line-height: 1.5;
                        text-indent: -2em;
                        margin-left: 2em;
                    }
                }
            }
        }
    }
</style>
