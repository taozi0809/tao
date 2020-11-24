<template>
    <div class="red-packet" @click.stop="POPOVER('0')">
        <div class="left"></div>
        <div class="main">
            <div class="con">
                <div class="close" @click.stop="POPOVER('0')"><img src="../assets/images/hb/close.png" alt=""></div>
                <div class="hb"><img src="../assets/images/hb/red-bg.png" alt=""></div>
                <div class="hbInfo oneself">
                    <span class="head-img"><img :src="packetInfo.info.avatar" alt=""></span>
                    <div class="nickname">{{packetInfo.info.nickName}}</div>
                    <div class="special">手慢了，红包派完了</div>
                    <div class="details" @click.stop="goToDetails">查看大家的手气</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getUserInfo} from "../service/api";

    export default {
        data(){
            return{
                toInfo:{},
            }
        },
        computed:{
            ...mapState(['chatInfo','packetInfo','userInfo']),
        },
        methods:{
            ...mapMutations(['POPOVER','PACKETINFO']),
            goToDetails(){
                this.PACKETINFO(this.packetInfo)
                this.POPOVER('10')
            }
        },
    }
</script>

<style lang="scss" scoped>
    .red-packet{
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.5);
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        .left{
            width:13vw;
            height: 39vw;
            min-width: 208px;
            min-height: 625px;
            overflow: hidden;
            box-sizing: border-box;
            /*border: 1px solid red;*/
        }
        .main{
            width:35.5vw;
            height: 39vw;
            min-width: 568px;
            min-height: 625px;
            overflow: hidden;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            display: flex;
            align-items: center;
            justify-content: center;
            .con{
                width: 316px;
                height: 426px;
                overflow: hidden;
                /*background: #fff;*/
                position: relative;
                /*border: 1px solid red;*/
                .close{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 36px;
                    height: 36px;
                    cursor: pointer;
                    z-index: 10;
                    img{
                        width: 100%;
                    }
                }
                .hb{
                    width: 280px;
                    height: 390px;
                    position: absolute;
                    top: 36px;
                    z-index: 10;
                    img{
                        width: 100%;
                    }
                }
                .open{
                    width: 90px;
                    height: 90px;
                    position: absolute;
                    z-index: 11;
                    left:95px;
                    top:236px;
                    img{
                        width: 100%;
                    }
                }

                .hbInfo{
                    width: 280px;
                    height: 380px;
                    /*border: 1px solid red;*/
                    position: absolute;
                    left: 0;
                    top: 36px;
                    z-index: 12;
                    box-sizing: border-box;
                    .head-img{
                        display: block;
                        width: 40px;
                        height: 40px;
                        overflow: hidden;
                        border-radius: 5px;
                        margin: 0 auto;
                        margin-top: 20px;
                        margin-bottom: 15px;
                        img{
                            width: 100%;
                        }
                    }
                    .nickname{
                        font-size: 16px;
                        width: 100%;
                        text-align: center;
                        color: #FFD83B;
                        margin-bottom:5px;
                    }
                    .num{
                        width: 100%;
                        text-align: center;
                        font-size: 14px;
                        color: #FFD83B;
                        margin-bottom: 30px;
                    }
                    .desc{
                        font-size: 20px;
                        font-weight: 600;
                        color: #FFD83B;
                        width: 80%;
                        margin: 0 auto;
                        text-align: center;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .special{
                        font-size:16px;
                        text-align: center;
                        color: #FFD83B;
                        width: 100%;
                        margin-top: 30px;
                        margin-bottom: 20px;
                    }
                    .form{
                        font-size: 14px;
                        text-align: center;
                        color: #FFD83B;
                        width: 100%;
                    }
                    .details{
                        position: absolute;
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        bottom: 0;
                        color: #FFD83B;
                        font-size: 14px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }



    }
</style>
