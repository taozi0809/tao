<template>
    <div class="red-packet" @click.stop="POPOVER('0')">
        <div class="left"></div>
        <div class="main">
            <div class="con">
                <div class="close" @click.stop="POPOVER('0')"><img src="../assets/images/hb/close.png" alt=""></div>
                <div class="hb"><img src="../assets/images/hb/red-bg.png" alt=""></div>
                <div class="open" v-if="packetInfo.info.idCode!=userInfo.idCode||this.chatInfo.type=='GROUP'" @click.stop="packetTake"><img src="../assets/images/hb/open.png" alt=""></div>

                <div class="hbInfo" v-if="packetInfo.info.idCode!=userInfo.idCode">
                    <div v-if="this.chatInfo.type=='USER'">
                        <span class="head-img"><img :src="packetInfo.info.avatar" alt=""></span>
                        <div class="nickname">{{packetInfo.info.nickName}}</div>
                        <div class="num">发了一个红包，金额 {{JSON.parse(JSON.parse(packetInfo.param).data).sum}} {{JSON.parse(JSON.parse(packetInfo.param).data).coinName}}</div>
                        <div class="desc">{{JSON.parse(JSON.parse(packetInfo.param).data).desc}}</div>
                    </div>
                    <div v-if="this.chatInfo.type=='GROUP'">
                        <span class="head-img"><img :src="packetInfo.info.avatar" alt=""></span>
                        <div class="nickname">{{packetInfo.info.nickName}}</div>
                        <div class="num">发了一个红包，金额 {{JSON.parse(JSON.parse(packetInfo.param).data).sum}} {{JSON.parse(JSON.parse(packetInfo.param).data).coinName}}</div>
                        <div class="desc">{{JSON.parse(JSON.parse(packetInfo.param).data).desc}}</div>
                    </div>

                </div>

                <div class="hbInfo oneself" v-if="packetInfo.info.idCode==userInfo.idCode">
                    <div v-if="this.chatInfo.type=='GROUP'">
                        <span class="head-img"><img :src="packetInfo.info.avatar" alt=""></span>
                        <div class="nickname">{{packetInfo.info.nickName}}</div>
                        <div class="num">发了一个红包，金额 {{JSON.parse(JSON.parse(packetInfo.param).data).sum}} {{JSON.parse(JSON.parse(packetInfo.param).data).coinName}}</div>
                        <div class="desc">{{JSON.parse(JSON.parse(packetInfo.param).data).desc}}</div>
                    </div>
                    <div v-if="this.chatInfo.type=='USER'">
                        <span class="head-img"><img :src="toInfo.avatar" alt=""></span>
                        <div class="nickname">{{toInfo.nickName}}</div>
                        <div class="special">只有以上专享人士才可以领取哦</div>
                        <div class="form">来自{{packetInfo.info.nickName}}</div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getUserInfo,packetTake} from "../service/api";

    export default {
        data(){
            return{
                toInfo:{},
            }
        },
        computed:{
            ...mapState(['chatInfo','packetInfo','userInfo','token']),
        },
        created:function(){
            console.log(this.chatInfo,this.packetInfo)

            if(this.packetInfo.info.idCode==this.userInfo.idCode&&this.chatInfo.type=='USER'){
                getUserInfo(JSON.parse(this.chatInfo.params).idCode).then(res=>{
                    console.log('toInfo',res)
                    if(res.code==0){
                        this.toInfo=res.data
                    }
                })
            }
        },
        methods:{
            ...mapMutations(['POPOVER','PACKETINFO']),
            packetTake(){
                packetTake(this.userInfo.userName,this.token,JSON.parse(JSON.parse(this.packetInfo.param).data).packetId,JSON.parse(JSON.parse(this.packetInfo.param).data).packetUserIdCode).then(res=>{
                    console.log('领取红包',res)
                    if(res.code==0){
                        this.PACKETINFO(this.packetInfo)
                        this.POPOVER('7')
                    }
                })
            },
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
                    height: 200px;
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
                }
            }
        }



    }
</style>
