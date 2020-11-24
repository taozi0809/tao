<template>
    <div class="supplied">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div class="title">
                    <div class="row">
                        <span><img src="../../assets/img/supplied/logo.png" alt=""></span>
                        <div class="des">
                            <p>TITAN来料</p>
                            <p>资源变现，领取你的100%收益</p>
                        </div>
                    </div>
                </div>
                <div class="con">
                    <div class="con-title">{{data.title}}</div>
                    <div class="con-title-des">【{{data.authorName}}】</div>
                    <div class="con-des">{{data.content}}</div>
                    <div class="con-img">
                        <ul>
                            <li v-for="item in data.imgUrls"><span><img :src="item" alt=""></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {quizPredictionDetails} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                data:{},
                scroll:null,
                predictionId:'',
            }
        },
        computed:{
            ...mapState(['userName','token']),
        },
        created:function(){
            this.predictionId = this.$route.params.predictionId
        },
        mounted:function(){
            console.log(this.userName,this.token,this.predictionId)
            quizPredictionDetails(this.userName,this.token,this.predictionId).then(res=>{
                console.log('来料详情',res)
                if(res.code==='0'){
                    this.data = res.data
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        click:true,
                        scrollX: false,
                        scrollbar: {
                            fade: true,
                            interactive: false
                        },
                    })
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .supplied{
        width: 100%;
        height: 100%;
        .wrapper{
            width: 100%;
            position: absolute;
            top:0;
            left:0;
            bottom:0;
            overflow: hidden;
            .content{
                width: 100%;
                .title{
                    width: 750px;
                    height: 188px;
                    box-sizing: border-box;
                    background: url("../../assets/img/supplied/title-top-bg.png") no-repeat center center;
                    background-size: 100% 100%;
                    .row{
                        padding-left: 75px;
                        padding-top: 55px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        span{
                            width:68px ;
                            height: 68px;
                            display: block;
                            img{
                                width: 100%;
                            }
                        }
                        .des{
                            padding-left: 12px;
                            p{
                                color: #fff;
                                line-height: 1.5;
                            }
                            p:nth-child(1){
                                font-size: 30px;
                            }
                            p:nth-child(2){
                                font-size: 26px;
                            }
                        }
                    }
                }
                .con{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 30px;
                    padding-top: 55px;
                    .con-title{
                        color: #333;
                        font-size:38px ;
                    }
                    .con-title-des{
                        font-size: 28px;
                        color: #333;
                        padding-top: 15px;
                    }
                    .con-des{
                        padding-top: 55px;
                        color: #747474;
                        font-size: 28px;
                        line-height: 1.5;
                        text-align: justify;
                        white-space:pre-wrap;
                    }
                    .con-img{
                        padding-top: 40px;
                        span{
                            display: block;
                            width: 100%;
                            img{
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>