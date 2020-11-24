<template>
    <div class="red-packet" @click.stop="POPOVER('0')">
        <div class="left"></div>
        <div class="main">
            <div class="con">
                <div class="close" @click.stop="POPOVER('0')"><img src="../assets/images/hb/close.png" alt=""></div>
                <div class="hb"><img src="../assets/images/hb/send-red-bg.png" alt=""></div>
                <div class="card">
                    <div class="item i1">
                        <div class="l">币种</div>
                        <div class="r" @click.stop="isCoinList=!isCoinList">
                            {{coinName}}
                            <span><img src="../assets/images/hb/red-arrow.png" alt=""></span>
                        </div>
                    </div>
                    <div class="item i5" @click.stop="POPOVER('13')">
                        <div class="l">领取人</div>
                        <div class="r" @click.stop="isGroupUserList=!isGroupUserList">
                            <div class="head-img"><img :src="groupUserActive.avatar" alt=""></div>
                            <span><img src="../assets/images/hb/red-arrow.png" alt=""></span>
                        </div>

                    </div>
                    <div class="item i2" @click.stop="POPOVER('13')">
                        <div class="l">总金额</div>
                        <div class="r">
                            <input type="text" placeholder="输入金额" v-model="sum" autofocus>
                        </div>
                    </div>
                    <div class="item i3" @click.stop="POPOVER('13')">
                        <input type="text" placeholder="恭喜发财" v-model="desc">
                    </div>
                    <div class="item i4" @click.stop="sendPacket">塞钱进红包</div>
                    <div class="coinBalanceCtoModels" v-if="isCoinList">
                        <ul>
                            <li v-for="(item,index) in coinBalanceCtoModels" :key="index">
                                <div class="l">
                                    <span><img :src="item.icon" alt=""></span>
                                    <div class="coin-name">{{item.name}}</div>
                                </div>
                                <div class="r" @click.stop="changeSelect(item,index)">
                                    <div class="sum">可用<div class="balance">{{item.balance>0?item.balance:0}}</div></div>
                                    <span v-if="!item.isSelected"><img src="../assets/images/hb/select.png" alt=""></span>
                                    <span v-if="item.isSelected"><img src="../assets/images/hb/select-active.png" alt=""></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="userInfoChatCtoModels" v-if="isGroupUserList">
                        <ul>
                            <li v-for="(item,index) in userInfoChatCtoModels" :key="index" @click.stop="groupUser(item)">
                                <div class="l">
                                    <span><img :src="item.avatar" alt=""></span>
                                    <div class="coin-name">{{item.nickName}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="switch" @click.stop="POPOVER('12')">当前指定人领取，<span>改为所有人领取</span></div>
                </div>
            </div>
        </div>
        <message ref="message"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {balanceList,packetCreateNormal,userInfos} from "../service/api";

    export default {
        data(){
            return{
                coinBalanceCtoModels:[],
                size:'',
                sum:'',
                desc:'',
                coinName:'GACT',
                isCoinList:false,

                userInfoChatCtoModels:[],
                isGroupUserList:false,
                groupUserActive:{},
            }
        },
        computed:{
            ...mapState(['chatInfo','packetInfo','userInfo','token']),
        },
        created:function(){
            console.log(this.chatInfo)
            balanceList(this.userInfo.userName,this.token).then(res=>{
                console.log('查询资产',res)
                if(res.code==0){
                    let arr=res.data.coinBalanceCtoModels
                    for(let i in arr){
                        arr[i].name==this.coinName?arr[i]['isSelected']=true:arr[i]['isSelected']=false
                    }
                    this.coinBalanceCtoModels=arr
                }
            })

            var userIdCodes=[]
            for(let i in JSON.parse(this.chatInfo.params).userIdCodes){
                userIdCodes.push(JSON.parse(this.chatInfo.params).userIdCodes[i].idCode)
            }
            userInfos(userIdCodes).then(res=>{
                console.log('群成员详情',res)
                if(res.code==0){
                    var arr=[]
                    for(let i in res.data.userInfoChatCtoModels){
                        if(res.data.userInfoChatCtoModels[i].idCode!=this.userInfo.idCode){
                            arr.push(res.data.userInfoChatCtoModels[i])
                        }
                    }
                    this.userInfoChatCtoModels=arr
                }
            })

        },
        methods:{
            ...mapMutations(['POPOVER']),
            changeSelect(item,index){
                for(let i in this.coinBalanceCtoModels){this.coinBalanceCtoModels[i].isSelected=false}
                this.coinBalanceCtoModels[index].isSelected=true
                this.coinName=this.coinBalanceCtoModels[index].name
                this.isCoinList=false
            },
            sendPacket(){
                if(!this.groupUserActive.hasOwnProperty('idCode')){
                    this.$refs.message.Message('未指定领取人');
                    return
                }
                if(this.sum>0){
                    var coin={}
                    for(let i in this.coinBalanceCtoModels){
                        if(this.coinBalanceCtoModels[i].isSelected){
                            this.coin=this.coinBalanceCtoModels[i]
                        }
                    }
                    packetCreateNormal(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,this.groupUserActive.idCode,'GROUP',coin.coinName,coin.moneyCode,this.sum,!!this.desc?this.desc:'恭喜发财').then(res=>{
                        console.log('私聊发送包',res)
                        if(res.code==0){
                            this.POPOVER('0')
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }else{
                    this.$refs.message.Message('金额错误');
                }

            },
            groupUser(item){
                this.POPOVER('13')
                this.isGroupUserList=false
                this.groupUserActive=item
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
                    border-radius: 20px;
                    overflow: hidden;
                    /*background: #fff;*/
                    img{
                        width: 100%;
                    }
                }
                .card{
                    width: 280px;
                    height: 390px;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    position: absolute;
                    top: 36px;
                    left: 0;
                    z-index: 11;
                    padding: 0 10px;
                    .item{
                        width: 100%;
                        background: #fff;
                        height: 40px;
                        border-radius: 3px;
                        margin-bottom: 20px;
                        overflow: hidden;
                        box-sizing: border-box;
                        padding: 0 10px;
                        position: relative;
                    }
                    .i1{
                        margin-top: 76px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0;
                        padding-left: 10px;
                        .l{
                            flex-shrink: 0;
                            width: 60px;
                        }
                        .r{
                            max-width: 200px;
                            display: flex;
                            align-items: center;
                            width: auto;
                            height: 40px;
                            cursor: pointer;
                            span{
                                display: block;
                                width: 20px;
                                transform: rotate(-90deg);
                                img{
                                    width: 100%;
                                }
                            }
                        }

                    }
                    .i2{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 40px;
                        .l{
                            flex-shrink: 0;
                            width: 60px;
                        }
                        .r{
                            width: 100px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            input{
                                width: 100px;
                                height: 40px;
                                line-height: 40px;
                                border: 0;
                                box-sizing: border-box;
                                color: #333;
                                font-size: 16px;
                                text-align: right;
                            }
                        }
                    }
                    .i3{
                        input{
                            line-height: 40px;
                            color: #333;
                            font-size: 16px;
                            height: 40px;
                            width: 100%;

                        }
                    }
                    .i4{
                        text-align: center;
                        line-height: 40px;
                        font-size: 16px;
                        color: #fff;
                        background: #cd533d;
                        cursor: pointer;
                    }
                    .i5{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0;
                        padding-left: 10px;
                        .l{
                            flex-shrink: 0;
                            width: 80px;
                        }
                        .r{
                            max-width: 200px;
                            display: flex;
                            align-items: center;
                            width: auto;
                            height: 40px;
                            cursor: pointer;
                            .head-img{
                                width: 24px;
                                height: 24px;
                                overflow: hidden;
                                border-radius: 50%;
                                img{
                                    width: 100%;
                                }
                            }
                            span{
                                display: block;
                                width: 20px;
                                transform: rotate(-90deg);
                                img{
                                    width: 100%;
                                }
                            }
                        }
                    }
                    .coinBalanceCtoModels{
                        width: 260px;
                        position: absolute;
                        top: 120px;
                        height: 260px;
                        background: #fff;
                        overflow-y: auto;
                        overflow-x: hidden;
                        z-index: 15;
                        ul{
                            li{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 100%;
                                height: 60px;
                                border-bottom: 1px solid rgba(0,0,0,.1);
                                box-sizing: border-box;
                                padding: 0 10px;
                                .l{
                                    display: flex;
                                    align-items: center;
                                    flex-shrink: 0;
                                    width: 120px;
                                    span{
                                        display: block;
                                        width: 30px;
                                        height: 30px;
                                        flex-shrink: 0;
                                        overflow: hidden;
                                        border-radius: 50%;
                                        margin-right: 10px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    .name{
                                        font-size: 14px;
                                        color: #333;
                                        flex-shrink: 0;
                                    }
                                }
                                .r{
                                    display: flex;
                                    align-items: center;
                                    flex-shrink: 0;
                                    max-width: 100px;
                                    cursor: pointer;
                                    .sum{
                                        display: flex;
                                        align-items: center;
                                        color: #888;
                                        font-size: 14px;
                                        flex-shrink: 0;
                                        height: 20px;
                                        line-height: 20px;
                                        .balance{
                                            color: #333;
                                            margin-left: 4px;
                                            margin-right: 8px;
                                            height: 20px;
                                            line-height: 20px;
                                        }
                                    }
                                    span{
                                        display: block;
                                        width: 20px;
                                        flex-shrink: 0;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .coinBalanceCtoModels::-webkit-scrollbar {/*滚动条整体样式*/
                        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    .coinBalanceCtoModels::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 5px rgba(168,168,168,0.2);
                        background:rgba(168,168,168,.3);

                    }
                    .coinBalanceCtoModels::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
                        border-radius: 10px;
                        background: #fff;

                    }
                    .switch{
                        position: absolute;
                        top: 250px;
                        left: 10px;
                        z-index: 11;
                        color: #333;
                        font-size: 12px;
                        cursor: pointer;
                        span{
                            color: #cd533d;
                        }
                    }
                    .userInfoChatCtoModels{
                        width: 260px;
                        position: absolute;
                        top: 180px;
                        height: 200px;
                        background: #fff;
                        overflow-y: auto;
                        overflow-x: hidden;
                        z-index: 15;
                        ul{
                            li{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 100%;
                                height: 60px;
                                border-bottom: 1px solid rgba(0,0,0,.1);
                                box-sizing: border-box;
                                padding: 0 10px;
                                .l{
                                    display: flex;
                                    align-items: center;
                                    flex-shrink: 0;
                                    width: 120px;
                                    span{
                                        display: block;
                                        width: 30px;
                                        height: 30px;
                                        flex-shrink: 0;
                                        overflow: hidden;
                                        border-radius: 50%;
                                        margin-right: 10px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    .name{
                                        font-size: 14px;
                                        color: #333;
                                        flex-shrink: 0;
                                    }
                                }
                                .r{
                                    display: flex;
                                    align-items: center;
                                    flex-shrink: 0;
                                    max-width: 100px;
                                    cursor: pointer;
                                    .sum{
                                        display: flex;
                                        align-items: center;
                                        color: #888;
                                        font-size: 14px;
                                        flex-shrink: 0;
                                        height: 20px;
                                        line-height: 20px;
                                        .balance{
                                            color: #333;
                                            margin-left: 4px;
                                            margin-right: 8px;
                                            height: 20px;
                                            line-height: 20px;
                                        }
                                    }
                                    span{
                                        display: block;
                                        width: 20px;
                                        flex-shrink: 0;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .userInfoChatCtoModels::-webkit-scrollbar {/*滚动条整体样式*/
                        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    .userInfoChatCtoModels::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 5px rgba(168,168,168,0.2);
                        background:rgba(168,168,168,.3);

                    }
                    .userInfoChatCtoModels::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
                        border-radius: 10px;
                        background: #fff;

                    }
                }
            }
        }



    }
</style>
