<template>
    <div class="head-top">
        <div class="item" v-if="chatStatus=='1'">
            <div class="t">{{JSON.parse(chatInfo.params).nickName}}</div>
            <div class="r" @click="ISCHATINFODES(!isChatInfoDes)">
                <img src="../../assets/images/main/gfInfo.png" alt="">
            </div>
        </div>
        <div class="item" v-if="chatStatus=='2'||chatStatus=='6'">
            <div class="t">{{JSON.parse(chatInfo.params).name}}</div>
            <div class="r" @click="ISCHATINFODES(!isChatInfoDes)">
                <img src="../../assets/images/main/gfInfo.png" alt="">
            </div>
        </div>
        <div class="item" v-if="chatStatus=='5'">
            <div class="t">{{chatInfo.nickName}}</div>
        </div>
        <div class="item" v-if="chatStatus=='4'">
            <div class="t">新的朋友</div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {userChatStateIn,userChatStateOut} from "../../service/api";

    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['chatStatus','chatInfo','isChatInfoDes','userInfo','token']),
        },
        methods:{
            ...mapMutations(['ISCHATINFODES']),
        },
        created:function(){
            userChatStateIn(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,this.chatInfo.type).then(res=>{
                console.log('进入聊天',res)
                if(res.code==0){}
            })
        },
        watch:{
            chatInfo(newValue,oldValue){
                if(newValue!=oldValue){
                    // console.log('1',newValue,oldValue)
                    userChatStateOut(this.userInfo.userName,this.token,oldValue.groupIdCode,oldValue.type).then(res=>{
                        console.log('退出聊天',res)
                        if(res.code==0){}
                    })
                    userChatStateIn(this.userInfo.userName,this.token,newValue.groupIdCode,newValue.type).then(res=>{
                        console.log('进入聊天',res)
                        if(res.code==0){}
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .head-top{
        width:35.5vw;
        height: 3.9vw;
        min-width: 568px;
        min-height: 62.5px;
        /*border: 1px solid #ee3747;*/
        overflow: hidden;
        box-sizing: border-box;
        background: #fff;
        .item{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 20px;
            .r{
                cursor: pointer;
                width: 24px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>