<template>
    <div class="red-packet" @click.stop="POPOVER('0')">
        <div class="left"></div>
        <div class="main">
            <div class="con">
                <div class="close" @click.stop="POPOVER('0')"><img src="../assets/images/hb/close.png" alt=""></div>
                <div class="hb"><img src="../assets/images/hb/in-red-bg.png" alt=""></div>
                <div class="item1">
                    <div class="desc">{{JSON.parse(JSON.parse(packetInfo.param).data).desc}}</div>
                    <div class="num">手慢了，红包派发完了</div>
                    <div class="head-img"><img :src="packetInfo.info.avatar" alt=""></div>
                    <div class="form">{{packetInfo.info.nickName}}的红包</div>
                    <div class="sum">领取{{res.packetDetailCtoModels.length}}/{{res.size}}个</div>
                </div>
                <div class="item2">
                    <ul>
                        <li v-for="(item,index) in res.packetDetailCtoModels" :key="index">
                            <div class="l">
                                <div class="head-img"><img :src="item.info.avatar" alt=""></div>
                                <div class="user-info">
                                    <div class="name">{{item.info.nickName}}</div>
                                    <div class="time">{{item.takeTime | timestampFormatting('mm-dd mm:hh')}}</div>
                                </div>
                            </div>
                            <div class="r">
                                <div class="sum">{{item.sum}} {{JSON.parse(JSON.parse(packetInfo.param).data).coinName}}</div>
                                <div class="best" v-if="item.sum==maxSum"><img src="../assets/images/hb/best-luck.png" alt=""></div>
                            </div>
                        </li>

                    </ul>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getPacketInfo,userInfos} from "../service/api";

    export default {
        data(){
            return{
                res:{
                    packetDetailCtoModels:[],
                },
                maxSum:-1,
            }
        },
        computed:{
            ...mapState(['chatInfo','packetInfo','userInfo']),
        },
        created:function(){
            // console.log(this.chatInfo,this.packetInfo)
            getPacketInfo(this.userInfo.userName,this.token,JSON.parse(JSON.parse(this.packetInfo.param).data).packetId,JSON.parse(JSON.parse(this.packetInfo.param).data).packetUserIdCode).then(res=>{
                console.log('红包详情',res)
                if(res.code==0){
                    // this.res=res.data
                    if(res.data.packetDetailCtoModels.length==res.data.size){
                        for(let i in res.data.packetDetailCtoModels){
                            res.data.packetDetailCtoModels[i].sum>this.maxSum?this.maxSum=res.data.packetDetailCtoModels[i].sum:''
                        }
                    }
                    let arr=[]
                    let idCodesToInfo=[]
                    for(let i in res.data.packetDetailCtoModels){arr.push(res.data.packetDetailCtoModels[i].idCode)}
                    userInfos(arr).then(data=>{
                        console.log('已领红包用户信息',data)
                        if(data.code==0){
                            idCodesToInfo=data.data.userInfoChatCtoModels
                            for(let i in res.data.packetDetailCtoModels){
                                for(let j in idCodesToInfo){
                                    if(res.data.packetDetailCtoModels[i].idCode==idCodesToInfo[j].idCode){
                                        res.data.packetDetailCtoModels[i]['info']=idCodesToInfo[j]
                                    }
                                }
                            }
                            this.res=res.data
                        }
                    })


                }
            })
        },
        methods:{
            ...mapMutations(['POPOVER']),

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
                    border-radius: 20px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .item1{
                    width: 280px;
                    height: 200px;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    overflow: hidden;
                    position: absolute;
                    top: 36px;
                    left: 0;
                    z-index: 11;
                    .desc{
                        font-size: 18px;
                        color: #FFD83B;
                        margin: 0 auto;
                        text-align: center;
                        margin-top: 20px;
                        margin-bottom: 10px;
                        width: 80%;
                        text-align: center;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .num{
                        font-size: 14px;
                        color: #FFD83B;
                        width: 80%;
                        margin: 0 auto;
                        text-align: center;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .head-img{
                        display: block;
                        width: 40px;
                        height: 40px;
                        overflow: hidden;
                        border-radius: 50%;
                        position: absolute;
                        top: 104px;
                        left: 120px;
                        img{
                            width: 100%;
                        }
                    }
                    .form{
                        font-size: 16px;
                        color: #333;
                        width: 100%;
                        text-align: center;
                        margin-top: 90px;
                        margin-bottom: 10px;
                    }
                    .sum{
                        font-size: 12px;
                        color: #888;
                        width: 100%;
                        box-sizing: border-box;
                        padding-left: 10px;
                    }
                }
                .item2{
                    width: 280px;
                    height: 164px;
                    height: 190px;
                    box-sizing: border-box;
                    overflow: hidden;
                    position: absolute;
                    top: 236px;
                    left: 0;
                    z-index: 11;
                    border-top: 1px solid rgba(0,0,0,.1);
                    overflow-x: hidden;
                    overflow-y:scroll;
                    background: #fff;
                    ul{
                        li{
                            width: 100%;
                            height: 60px;
                            border-bottom: 1px solid rgba(0,0,0,.1);
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            box-sizing: border-box;
                            padding: 0 10px;
                            .l{
                                display: flex;
                                align-items: center;
                                max-width: 150px;
                                overflow: hidden;
                                .head-img{
                                    width: 40px;
                                    height: 40px;
                                    overflow: hidden;
                                    border-radius: 5px;
                                    margin-right: 6px;
                                    flex-shrink:0;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .user-info{
                                    .name{
                                        color: #333;
                                        font-size: 16px;
                                        height: 20px;
                                        line-height: 20px;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                    }
                                    .time{
                                        color: #888;
                                        font-size: 12px;
                                        height: 20px;
                                        line-height: 20px;
                                    }
                                }

                            }
                            .r{
                                max-width: 100px;
                                /*width: 100px;*/
                                overflow: hidden;
                                .sum{
                                    font-size: 16px;
                                    color: #333;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                    height: 20px;
                                    line-height: 20px;
                                }
                                .best{
                                    width: 60px;
                                    height: 20px;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }

                }
                .item2::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 1px;
                }
                .item2::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px rgba(168,168,168,0.2);
                    background:rgba(168,168,168,.3);

                }
                .item2::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
                    border-radius: 10px;
                    background: #fff;

                }

            }
        }



    }
</style>
