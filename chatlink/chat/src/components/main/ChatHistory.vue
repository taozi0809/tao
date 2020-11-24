<template>
    <div class="chat-history" id="chat-history">
        <div class="list" v-for="(item,index) in list" :key="index">
            <div class="item oneself" v-if="item.idCode==userInfo.idCode">
                <div class="time">{{[item.createTime,index>0?list[index-1].createTime:0] | chatHistoryTimeToTime}}</div>
                <div class="content">
                    <div class="l">
                        <div class="img-box"><img :src="item.info.avatar" alt="" :onerror="defaultHeadImg"></div>
                    </div>
                    <div class="r">
                        <div class="t">{{item.info.nickName}}</div>
                        <div class="des-box">
                            <span class="des" v-if="item.paramType=='youxibi.chat.message.type.text'">{{item.content}}</span>
                            <div class="vcard" v-if="item.paramType=='youxibi.chat.message.type.vcard'" @click="goUserInfo('card',item)">
                                <div class="v-t">
                                    <span><img :src="JSON.parse(item.param).avatar" alt=""></span>
                                    <div class="des-info">
                                        <div class="des-info-name">{{JSON.parse(item.param).nickName}}</div>
                                        <div class="des-info-chat">{{JSON.parse(item.param).account}}</div>
                                    </div>
                                </div>
                                <div class="v-b">个人名片</div>
                            </div>
                            <div class="content-radio-box" v-if="item.paramType=='youxibi.chat.message.type.radio'" >
                                <div class="content-radio">
                                    <div class="audio" @click="onPlayerPlay(JSON.parse(item.param).radioUrl,Math.ceil(JSON.parse(item.param).duration),index)">
                                        <!--<audio :src="JSON.parse(item.param).radioUrl" autoplay></audio>-->
                                        <span><img :src="imgSrc" alt="" :id="'src'+index" ></span>
                                    </div>
                                    <div class="time">{{Math.ceil(JSON.parse(item.param).duration/1000)+'s'}}</div>
                                </div>
                                <p>请在手机客户端浏览</p>
                            </div>
                            <span class="pic-box" :class="JSON.parse(item.param).width/JSON.parse(item.param).height>1.24?'maxW':'maxH'" v-if="item.paramType=='youxibi.chat.message.type.pic'" @click="picMaxInfo={
                            isShow:true,url:JSON.parse(item.param).picUrl,w:JSON.parse(item.param).width,h:JSON.parse(item.param).height}">
                                <img :src="JSON.parse(item.param).picUrl" alt="">
                            </span>
                            <div class="redbag-box" v-if="item.paramType=='youxibi.chat.message.type.app'">
                                <div class="content-redbag"  v-if="JSON.parse(item.param).model=='shenzhouxing.circle.websocket.packet.normal'" @click="handleRedbag(item)">
                                    <div class="top">
                                        <span><img src="../../assets/images/hb/icon-redbag-small.png" alt=""></span>
                                        <div class="des-info">
                                            <p>{{JSON.parse(JSON.parse(item.param).data).desc}}</p>
                                            <p v-if="JSON.parse(JSON.parse(item.param).data).hasOwnProperty('toUserIdCode')">领取人@{{item.hbInfo.nickName}}</p>
                                            <p v-if="!JSON.parse(JSON.parse(item.param).data).hasOwnProperty('toUserIdCode')">共{{JSON.parse(JSON.parse(item.param).data).size}}人可领取</p>
                                        </div>
                                    </div>
                                    <div class="bot">{{JSON.parse(JSON.parse(item.param).data).hasOwnProperty('toUserIdCode')?'指定人红包':'拼手气红包'}}</div>
                                </div>
                                <div class="packet-normal" v-if="JSON.parse(item.param).model=='shenzhouxing.circle.websocket.packet.pay'">支付红包请在手机客户端查看</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item" v-if="item.idCode!=userInfo.idCode">
                <div class="time">{{[item.createTime,index>0?list[index-1].createTime:0] | chatHistoryTimeToTime}}</div>
                <div class="content">
                    <div class="l">
                        <div class="img-box" @click="goUserInfo('user',item)"><img :src="item.info.avatar" alt="" :onerror="defaultHeadImg"></div>
                    </div>
                    <div class="r">
                        <div class="t">{{item.info.nickName}}</div>
                        <div class="des" v-if="item.paramType=='youxibi.chat.message.type.text'">{{item.content}}</div>
                        <div class="vcard" v-if="item.paramType=='youxibi.chat.message.type.vcard'" @click="goUserInfo('card',item)">
                            <div class="v-t">
                                <span><img :src="JSON.parse(item.param).avatar" alt=""></span>
                                <div class="des-info">
                                    <div class="des-info-name">{{JSON.parse(item.param).nickName}}</div>
                                    <div class="des-info-chat">{{JSON.parse(item.param).account}}</div>
                                </div>
                            </div>
                            <div class="v-b">个人名片</div>
                        </div>
                        <div class="content-radio-box" v-if="item.paramType=='youxibi.chat.message.type.radio'" >
                            <div class="content-radio">
                                <div class="audio" @click="onPlayerPlay(JSON.parse(item.param).radioUrl,Math.ceil(JSON.parse(item.param).duration),index)">
                                    <!--<audio :src="JSON.parse(item.param).radioUrl" autoplay></audio>-->
                                    <span><img :src="imgSrc" alt="" :id="'src'+index" ></span>
                                </div>
                                <div class="time">{{Math.ceil(JSON.parse(item.param).duration/1000)+'s'}}</div>
                            </div>
                            <p>请在手机客户端浏览</p>
                        </div>
                        <span class="pic-box" :class="JSON.parse(item.param).width/JSON.parse(item.param).height>1.24?'maxW':'maxH'"
                              v-if="item.paramType=='youxibi.chat.message.type.pic'" @click="picMaxInfo={
                            isShow:true,url:JSON.parse(item.param).picUrl,w:JSON.parse(item.param).width,h:JSON.parse(item.param).height}">
                            <img :src="JSON.parse(item.param).picUrl" alt="">
                        </span>
                        <div class="redbag-box" v-if="item.paramType=='youxibi.chat.message.type.app'">
                            <div class="content-redbag"  v-if="JSON.parse(item.param).model=='shenzhouxing.circle.websocket.packet.normal'" @click="handleRedbag(item)">
                                <div class="top">
                                    <span><img src="../../assets/images/hb/icon-redbag-small.png" alt=""></span>
                                    <div class="des-info">
                                        <p>{{JSON.parse(JSON.parse(item.param).data).desc}}</p>
                                        <p v-if="JSON.parse(JSON.parse(item.param).data).hasOwnProperty('toUserIdCode')">领取人@{{item.hbInfo.nickName}}</p>
                                        <p v-if="!JSON.parse(JSON.parse(item.param).data).hasOwnProperty('toUserIdCode')">共{{JSON.parse(JSON.parse(item.param).data).size}}人可领取</p>
                                    </div>
                                </div>
                                <div class="bot">{{JSON.parse(JSON.parse(item.param).data).hasOwnProperty('toUserIdCode')?'指定人红包':'拼手气红包'}}</div>
                            </div>
                            <div class="packet-normal" v-if="JSON.parse(item.param).model=='shenzhouxing.circle.websocket.packet.pay'">支付红包请在手机客户端查看</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pic-max-box" v-if="picMaxInfo.isShow" @click="picMaxInfo={isShow:false,url:'',w:0,h:0}">
            <span :class="picMaxInfo.w/picMaxInfo.h>1.24?'maxW':'maxH'"><img :src="picMaxInfo.url" alt=""></span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {userChatHistory,userInfos,getUserInfo,packetCheck} from "../../service/api";
    import {bus} from "../../util/tools/eventBus";
    // var BenzAMRRecorder = require('benz-amr-recorder');

    // import {RongIMLib} from "../../util/plugin/voice-2.0";

    export default {
        // ...RongIMLib,
        data(){
            return{
                defaultHeadImg:'this.src="' + require('../../assets/images/main/default_head_img.png') + '"',
                imgSrc:require('../../assets/images/yuying/3.png'),
                list:[],
                isMore:true,
                isTime:true,
                oldH:0,
                picMaxInfo:{
                    isShow:false,
                    url:'',
                    w:0,
                    h:0,
                },
            }
        },
        computed:{
            ...mapState(['userInfo','token','chatStatus','chatInfo','isChatInfoDes',]),
            message(){
                return this.message
            },
        },
        created:function(){
            this.chatStatusToMessage()

            bus.$on('getMessage',data=>{
                if(data.groupIdCode==this.chatInfo.groupIdCode){
                    var arr=[]
                    var next =()=>{
                        getUserInfo(data.idCode).then(res=>{
                            if(res.code==0){
                                data['info']=res.data
                                arr.push(data)
                                this.list=[...this.list,...arr]
                                let h0=document.getElementById('chat-history').clientHeight
                                let hmax=document.getElementById('chat-history').scrollHeight
                                let hbot=document.getElementById('chat-history').scrollTop
                                if(parseInt(hmax)-parseInt(h0)==parseInt(hbot)){
                                    this.scrollToBottom()
                                }

                            }
                        })
                    }
                    if(data.paramType=='youxibi.chat.message.type.app'){
                        if(JSON.parse(data.param).model=='shenzhouxing.circle.websocket.packet.normal'){
                            if(JSON.parse(JSON.parse(data.param).data).hasOwnProperty('toUserIdCode')){
                                var idCodes=[]
                                idCodes.push(data.idCode)
                                idCodes.push(JSON.parse(JSON.parse(data.param).data).toUserIdCode)
                                userInfos(idCodes).then(res=>{
                                    if(res.code==0){
                                        for(let i in res.data.userInfoChatCtoModels){
                                            if(res.data.userInfoChatCtoModels[i].idCode==data.idCode){
                                                data['info']=res.data.userInfoChatCtoModels[i]
                                            }
                                            if(res.data.userInfoChatCtoModels[i].idCode==JSON.parse(JSON.parse(data.param).data).toUserIdCode){
                                                data['hbInfo']=res.data.userInfoChatCtoModels[i]
                                            }
                                        }
                                        arr.push(data)
                                        this.list=[...this.list,...arr]
                                        let h0=document.getElementById('chat-history').clientHeight
                                        let hmax=document.getElementById('chat-history').scrollHeight
                                        let hbot=document.getElementById('chat-history').scrollTop
                                        if(parseInt(hmax)-parseInt(h0)==parseInt(hbot)){
                                            this.scrollToBottom()
                                        }
                                    }
                                })
                            }else{
                                next()
                            }
                        }else{
                            next()
                        }
                    }else{
                        next()
                    }



                }
            })
        },
        mounted:function(){
            this.scrollToBottom()
            document.getElementById("chat-history").onscroll=()=>{
                var st=document.getElementById('chat-history').scrollTop
                if(st<=0&&this.isMore&&this.isTime){
                    this.isTime=false
                    setTimeout(()=>{this.isTime=true},1000)
                    this.chatStatusToMessage(this.list[0].createTime)
                    this.oldH=parseInt(document.getElementById('chat-history').scrollHeight)

                }
            }


        },
        // updated:function(){
        //     this.scrollToBottom()
        // },
        methods:{



            ...mapMutations(['ISCHATINFODES','CHATSTATUS','CHATINFO','POPOVER','PACKETINFO']),
            scrollToBottom(time) {
                this.$nextTick(() => {
                    let msg = document.getElementById('chat-history') // 获取对象
                    if(!!time){
                        // msg.scrollTop = 2906 // 滚动高度
                        msg.scrollTop = parseInt(document.getElementById('chat-history').scrollHeight)-this.oldH
                    }else{
                        msg.scrollTop = msg.scrollHeight // 滚动高度
                    }
                })
            },
            userChatHistory(beginTime,lastTime,userName,token,groupIdCode,type){
                userChatHistory(beginTime,lastTime,userName,token,groupIdCode,type).then(res=>{
                    console.log('历史消息',res)
                    if(res.code==0){
                        // console.log('0000',res.data.chatMessageCtoModels.length)
                        if(res.data.chatMessageCtoModels.length==30){
                            this.isMore=true
                        }else{
                            this.isMore=false
                        }
                        var idCodes=[]
                        for(let i in res.data.chatMessageCtoModels){
                            idCodes.push(res.data.chatMessageCtoModels[i].idCode)
                        }
                        var idCodesToInfo=[]
                        userInfos(idCodes).then(data=>{
                            console.log('历史消息用户信息',data)
                            if(data.code==0){
                                idCodesToInfo=data.data.userInfoChatCtoModels
                                for(let i in res.data.chatMessageCtoModels){
                                    for(let j in idCodesToInfo){
                                        if(res.data.chatMessageCtoModels[i].idCode==idCodesToInfo[j].idCode){
                                            res.data.chatMessageCtoModels[i]['info']=idCodesToInfo[j]
                                        }
                                    }
                                }
                                // this.list = res.data.chatMessageCtoModels.reverse()
                                var arr1 = res.data.chatMessageCtoModels.reverse()
                                // this.list=[...arr1,...this.list]
                                // this.scrollToBottom(lastTime)

                                var hbArr=[]
                                for(let i in arr1){
                                    if(arr1[i].paramType=='youxibi.chat.message.type.app'){
                                        if(JSON.parse(arr1[i].param).model=='shenzhouxing.circle.websocket.packet.normal'){
                                           if(JSON.parse(JSON.parse(arr1[i].param).data).hasOwnProperty('toUserIdCode')){
                                               // console.log(JSON.parse(JSON.parse(arr1[i].param).data).toUserIdCode)
                                               hbArr.push(JSON.parse(JSON.parse(arr1[i].param).data).toUserIdCode)
                                           }
                                        }
                                    }
                                }
                                userInfos(hbArr).then(resdata=>{
                                    if(resdata.code==0){
                                        for(let i in arr1){
                                            for(let j in resdata.data.userInfoChatCtoModels){
                                                if(arr1[i].paramType=='youxibi.chat.message.type.app'){
                                                    if(JSON.parse(arr1[i].param).model=='shenzhouxing.circle.websocket.packet.normal'){
                                                        if(JSON.parse(JSON.parse(arr1[i].param).data).hasOwnProperty('toUserIdCode')){
                                                            if(JSON.parse(JSON.parse(arr1[i].param).data).toUserIdCode==resdata.data.userInfoChatCtoModels[j].idCode){
                                                                // console.log(resdata.data.userInfoChatCtoModels[j])
                                                                arr1[i]['hbInfo']=resdata.data.userInfoChatCtoModels[j]
                                                            }
                                                            // console.log(JSON.parse(JSON.parse(arr1[i].param).data).toUserIdCode,resdata.data.userInfoChatCtoModels[j])
                                                            // JSON.parse(JSON.parse(arr1[i].param).data).toUserIdCode
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        this.list=[...arr1,...this.list]
                                        this.scrollToBottom(lastTime)
                                    }
                                })


                            }
                        })




                    }
                })
            },
            chatStatusToMessage(lastTime=null){
                switch (this.chatStatus){
                    case '1':
                        this.userChatHistory(null,lastTime,this.userInfo.userName,this.token,this.chatInfo.groupIdCode,'USER')
                        break;
                    case '2':
                        this.userChatHistory(null,lastTime,this.userInfo.userName,this.token,this.chatInfo.groupIdCode,'GROUP')
                        break;
                    case '5':
                        console.log('5')
                        break;
                    default:
                        break;
                }
            },
            goUserInfo(type,item){
                this.CHATSTATUS('5')
                if(type=='user'){this.CHATINFO(item.info)}
                if(type=='card'){this.CHATINFO(JSON.parse(item.param))}

            },
            onPlayerPlay(url,time,index) {
                return
                console.log(url,time,index)
                // var amr = new BenzAMRRecorder();
                // amr.initWithUrl(url).then(function() {
                //     amr.play();
                // });
                // RongIMLib.RongIMVoice.init();
                // RongIMLib.RongIMVoice.play(url)

                if(!!this['timer'+index]){return}else{
                    let i = 1
                    this['timer'+index]= setInterval(()=>{
                        document.getElementById("src"+index).src = require(`../../assets/images/yuying/${i}.png`)
                        i>=3?i=1:i++
                    },300)
                    setTimeout(()=>{
                        clearInterval(this['timer'+index])
                        document.getElementById("src"+index).src = require('../../assets/images/yuying/3.png')
                        this['timer'+index] = null
                    },time)
                }

            },
            onPlayerPause(player,index) {
                clearInterval(this['timer'+index])
                document.getElementById("src"+index).src = require('../../assets/images/yuying/3.png')
                this['timer'+index] = null
            },

            handleRedbag(item){
                // console.log(item)
                packetCheck(this.userInfo.userName,this.token,JSON.parse(JSON.parse(item.param).data).packetId,JSON.parse(JSON.parse(item.param).data).packetUserIdCode).then(res=>{
                    console.log('查看红包状态',res)
                    if(res.code==0){
                        if(res.data=='DOING'){
                            this.PACKETINFO(item)
                            this.POPOVER('6')
                        }
                        if(res.data=='TAKEN'){
                            this.PACKETINFO(item)
                            this.POPOVER('7')
                        }
                        if(res.data=='OVERTIME'){
                            this.PACKETINFO(item)
                            this.POPOVER('8')
                        }
                        if(res.data=='OVER'){
                            if(this.chatInfo.type=='USER'){
                                this.PACKETINFO(item)
                                this.POPOVER('10')
                            }
                            if(this.chatInfo.type=='GROUP'){
                                this.PACKETINFO(item)
                                this.POPOVER('9')
                            }

                        }
                    }
                })
            },
        },


    }
</script>

<style lang="scss" scoped>
    .chat-history{
        width:35.5vw;
        height: 26vw;
        min-width: 568px;
        min-height: 420px;
        overflow-x: hidden;
        overflow-y:scroll;
        box-sizing: border-box;
        background: #fff;
        border-top: 1px solid #D0D0D0;
        border-bottom: 1px solid #D0D0D0;
        /*background: #e8e9ee;*/
        .item{
            box-sizing: border-box;
            padding: 10px 20px;
            .time{
                width: 100%;
                font-size: 12px;
                text-align: center;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #888;
            }
            .content{
                display: flex;
                .l{
                    width: 40px;
                    .img-box{
                        width: 40px;
                        height: 40px;
                        overflow: hidden;
                        border-radius: 6px;
                        img{
                            width: 100%;
                        }
                    }
                }
                .r{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 10px;
                    .t{
                        font-size: 12px;
                        color: #888;
                        margin-bottom: 10px;
                    }
                    .des{
                        font-size: 15px;
                        color: #000;
                        line-height: 1.5;
                        word-break:break-all;
                    }
                    .pic-box{
                        border-radius: 6px;
                        overflow: hidden;
                        display: block;
                        img{
                            width: 100%;
                        }
                    }
                    .maxW{
                        width: 40%;
                    }
                    .maxH{
                        width: 20%;
                    }
                    .vcard{
                        width: 220px;
                        height: 100px;
                        border-radius: 5px;
                        overflow: hidden;
                        background: #f0f2f5;
                        box-sizing: border-box;
                        padding:0 10px;
                        .v-t{
                            width: 200px;
                            height: 70px;
                            margin: 0 auto;
                            display: flex;
                            align-items: center;
                            border-bottom: 0.5px solid #d0d0d0;
                            box-sizing: border-box;
                            span{
                                margin-right: 6px;
                                display: block;
                                width: 40px;
                                height: 40px;
                                overflow: hidden;
                                border-radius: 5px;
                                img{
                                    width: 100%;
                                }
                            }
                            .des-info{
                                width: 140px;
                                overflow: hidden;
                                .des-info-name{
                                    font-size: 14px;
                                    color: #333;
                                    height: 20px;
                                    line-height: 20px;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    word-break: break-all;
                                }
                                .des-info-chat{
                                    font-size: 12px;
                                    color: #888;
                                    height: 20px;
                                    line-height: 20px;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    word-break: break-all;
                                }
                            }
                        }
                        .v-b{
                            width: 200px;
                            height: 30px;
                            line-height: 30px;
                            font-size: 12px;
                            color: #888;
                            margin: 0 auto;
                        }
                    }

                    .content-radio-box{
                        .content-radio{
                            display: flex;
                            align-items: center;
                            position: relative;
                            width: 120px;
                            .audio{
                                display: flex;
                                align-items: center;
                                background: #fff;
                                width: 80px;
                                height: 40px;
                                border-radius: 5px;
                                overflow: hidden;
                                position: relative;
                                cursor: pointer;
                                span{
                                    position: absolute;
                                    display: block;
                                    width: 15px;
                                    /*left: 5px;*/
                                    margin-left: 5px;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                            .time{
                                position: absolute;
                                left: 25px;
                                font-size: 12px;
                                color: #808080;
                                width: auto;
                            }
                        }
                        p{
                            color: #888;
                            font-size: 12px;
                            padding-top: 5px;
                        }
                    }

                    .redbag-box{
                        .content-redbag{
                            width:240px;
                            height:85px;
                            border-radius: 5px;
                            overflow: hidden;
                            cursor: pointer;
                            border: 1px solid rgba(0,0,0,.2);
                            /*border: 1px solid #808080;*/

                            .top{
                                width: 100%;
                                height: 65px;
                                display: flex;
                                align-items: center;
                                box-sizing: border-box;
                                overflow: hidden;
                                background:#ff7a51;
                                span{
                                    display: block;
                                    width: 30px;
                                    height: 40px;
                                    background: red;
                                    overflow: hidden;
                                    border-radius: 5px;
                                    margin-left: 10px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .des-info{
                                    padding-left: 10px;
                                    height: 40px;
                                    overflow: hidden;
                                    p{color: #fff;padding: 0;margin: 0;}
                                    max-width: 150px;
                                    p:nth-child(1){
                                        display: inline-block;
                                        font-size: 16px;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                        margin-bottom: 3px;
                                    }
                                    p:nth-child(2){
                                        font-size: 12px;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                    }
                                }
                            }
                            .bot{
                                background: #fff;
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                                padding-left: 10px;
                                box-sizing: border-box;
                                font-size: 12px;
                                color: #808080;
                                overflow: hidden;

                            }
                        }
                        .packet-normal{
                            font-size: 12px;
                            color: #888;

                        }
                        .packet-color{
                            background: #1aa059;
                        }
                    }
                }
            }
        }
        .oneself{
            .content{
                display: flex;
                flex-direction: row-reverse;
                .r{
                    .t{
                        display: flex;
                        flex-direction: row-reverse;
                    }
                    .des-box{
                        display: flex;
                        flex-direction: row-reverse;
                    }
                    .des{
                        color: #fff;
                        background: #319CFF;
                        border-radius: 6px;
                        box-sizing: border-box;
                        padding:5px 10px;
                        word-break:break-all;
                    }
                    .pic-box{
                        display: block;
                        width: 20%;
                        border-radius: 6px;
                        overflow: hidden;
                        border: 6px solid #eee ;
                        img{
                            width: 100%;
                        }
                    }
                    .maxW{
                        width: 40%;
                    }
                    .maxH{
                        width: 20%;
                    }
                    .content-radio-box{
                        justify-content: flex-end;
                        .content-radio{  display: flex;
                            justify-content: flex-end;
                            .audio{
                                span{
                                    transform:rotate(180deg);
                                    right: 5px;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                            .time{
                                position: absolute;
                                right: -40px;
                                padding-right: 6px;
                            }
                        }
                        p{
                            text-align: right;
                        }
                    }
                }
            }
        }

        .pic-max-box{
            position: absolute;
            z-index: 12;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,.2);
            left: 0;
            top: 0;
            overflow: hidden;
            span{
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
            .maxW{
                width: 100%;
                img{
                    width: 100%;
                }
            }
            .maxH{
                height: 100%;
                img{
                    height: 100%;
                }
            }
        }
    }
    .chat-history::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;

    }
    .chat-history::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(168,168,168,0.2);
        background:rgba(168,168,168,.3);

    }
    .chat-history::-webkit-scrollbar-track {/*滚动条里面轨道*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        border-radius: 10px;
        background: #fff;

    }

</style>