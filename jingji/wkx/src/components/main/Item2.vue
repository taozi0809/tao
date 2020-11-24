<template>
    <div class="mark" :class="isPC?'pc-item2':'mobile-item2'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l"><img src="../../assets/img/main/item2/l.png" alt=""></div>
                <div class="r">
                    万康兴体育文化发展（海南）有限公司是取得授权的竞技二打一运营单位。
                    《国家体育总局棋牌运动管理中心》出台趣味棋牌公共政策作为底层支撑；
                    《中国互联网上网行业协会》出台行业趣味棋牌标准作为行业准则；
                    《中国智力运动产业基地》作为具体执行单位执行商业化；
                    《竞技趣味棋牌管理服务平台》作为底层软件系统支持具体商业化运营。
                    使竞技趣味棋牌产业突破“灰色地带”束缚，让竞技趣味棋牌像彩票一样阳光
                    化、规范化、全民化。
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
                    name:"公司介绍",
                    des:"COMPANY PROFILE",
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
    .pc-item2{
        width: 100%;
        height:700px;
        background: #C30B0B;
        box-sizing: border-box;
        padding-top: 100px;
        overflow: hidden;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                justify-content:space-between;
                width: 1200px;
                margin: 0 auto;
                margin-top:112px;
                .l{
                    width:512px;
                    box-sizing: border-box;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 645px;
                    flex-shrink: 0;
                    color: #fff;
                    font-size: 20px;
                    line-height: 36px;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .pc-item2{
            height:625px;
            padding-top: 100px;
            .con{
                .des-box{
                    width: 900px;
                    margin-top:100px;
                    .l{
                        width:384px;
                        box-sizing: border-box;
                        img{
                            width: 100%;
                        }
                    }
                    .r{
                        width:484px;
                        flex-shrink: 0;
                        color: #fff;
                        font-size:15px;
                        line-height:27px;
                    }
                }
            }
        }
    }
    .mobile-item2{
        width: 100%;
        box-sizing: border-box;
        padding-bottom: 10vw;
        padding-top: 10vw;
        background: #C30B0B;
        .con{
            .des-box{
                margin-top: 10vw;
                .l{
                    width:80vw;
                    margin: 0 auto;
                    box-sizing: border-box;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:80vw;
                    color: #fff;
                    font-size:4vw;
                    margin: 0 auto;
                    margin-top: 10vw;
                    line-height: 1.5;
                }
            }
        }
    }




</style>
