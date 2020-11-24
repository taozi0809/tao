<template>
    <div class="friend-info">
        <HeadTop/>
        <div class="info">
            <div class="head-img"><img :src="chatInfo.avatar" alt=""></div>
            <div class="des-info">
                <div class="t1">{{chatInfo.nickName}}</div>
                <div class="t2">个性签名</div>
                <div class="t3">他太懒了，还未设置个性签名</div>
            </div>
            <div class="btn" @click="send" v-if="isFriend==0">发消息</div>
            <div class="btn" @click="add" v-if="isFriend==1">加好友</div>
        </div>
        <message ref="message"/>
    </div>
</template>

<script>
    import HeadTop from './main/HeadTop'
    import {mapState, mapMutations} from 'vuex'
    import {friendRelationApply} from "../service/api";

    export default {
        components:{HeadTop},
        data(){
            return{
                isFriend:-1,
            }
        },
        computed:{
            ...mapState(['userInfo','token','chatStatus','chatInfo','isChatInfoDes','messageList','friendList']),
        },
        created:function(){
            for(let i in this.friendList){
                if(this.friendList[i].idCode==this.chatInfo.idCode){
                    this.isFriend=0
                }
            }
            this.isFriend==0?'':this.isFriend=1
        },
        methods:{
            ...mapMutations(['CHATSTATUS','NAV','CHATINFO','CHATINFOINDEX']),
            send(){
                for(let i in this.messageList){
                    if(this.messageList[i].type=='USER'){
                        if(JSON.parse(this.messageList[i].params).idCode==this.chatInfo.idCode){
                            this.CHATINFOINDEX(i)
                            this.NAV('0')
                            this.CHATSTATUS('1')
                            this.CHATINFO(this.messageList[i])

                        }
                    }
                }
            },
            add(){
                friendRelationApply(this.userInfo.userName,this.token,this.chatInfo.idCode,`我是${this.userInfo.nickName}`).then(res=>{
                    console.log('添加好友',res)
                    if(res.code==0){
                        this.$refs.message.Message('已发送请求');
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
.friend-info{
    width:35.5vw;
    height: 39vw;
    min-width: 568px;
    min-height: 625px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);
    border-left: none;
    border-right: none;
    border-left: none;
    background: #fff;

    .info{
        border-top: 1px solid #D0D0D0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        /*border: 1px solid red;*/
        padding:0 15px;
        .head-img{
            width: 84px;
            height: 84px;
            overflow: hidden;
            border-radius:5px;
            margin-right: 15px;
            /*border: 1px solid red;*/
            img{
                width: 100%;
            }
        }
        .des-info{
            .t1{
                font-size: 16px;
                color: #333;
                font-weight: bold;
                height: 40px;
                line-height: 40px;
            }
            .t2{
                font-size:13px;
                color: #333;
                height: 22px;
                line-height: 22px;
            }
            .t3{
                font-size:13px;
                color: #888;
                height: 22px;
                line-height: 22px;
            }
        }
        .btn{
            width: 84px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #003680;
            border-radius: 6px;
            color: #003680;
            font-size: 16px;
            position: absolute;
            right:15px;
            cursor: pointer;
        }

    }
}
</style>