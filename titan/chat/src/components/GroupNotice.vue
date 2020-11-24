<template>
    <div class="group-notice" @click.stop="POPOVER('0')">
        <div class="con" @click.stop="POPOVER('2')">
            <div class="t">编辑群公告</div>
            <div class="input">
                <textarea style="vertical-align:top;outline:none;" v-model="content" class="txt2"></textarea>
            </div>
            <div class="btn">
                <div class="cancel" @click.stop="POPOVER('0')">取消</div>
                <div class="post" @click="groupChatAddNotice">发布</div>
            </div>
        </div>
        <message ref="message"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {groupChatAddNotice,groupInfo,messageSend} from "../service/api";

    export default {
        data(){
            return{
                content:'',

            }
        },
        computed:{
            ...mapState(['userInfo','token','chatInfo']),
        },
        created:function(){
            groupInfo(this.userInfo.userName,this.token,this.chatInfo.groupIdCode).then(res=>{
                console.log('群详情',res)
                if(res.code==0){
                    var info = res.data
                    this.content=info.hasOwnProperty('notice')?!!info.notice?info.notice.content:'':''
                }
            })
        },
        methods:{
            ...mapMutations(['POPOVER']),
            groupChatAddNotice(){
                groupChatAddNotice(this.userInfo.userName,this.token,null,this.content,this.chatInfo.groupIdCode).then(res=>{
                    console.log('发布群公告',res)
                    if(res.code==0){

                        messageSend('',this.userInfo.userName,this.token,`群公告 ${this.content}`,this.chatInfo.groupIdCode,this.chatInfo.type).then(res=>{

                        })



                        this.POPOVER('0')
                        window.location.reload();
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .group-notice{
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        .con{
            height: 365px;
            width: 470px;
            background: #fff;
            border-radius: 6px;
            .t{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding:0 20px;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
            }
            .input{
                width:calc(100% - 40px);
                height: 185px;
                border: 1px solid #DBE0E7;
                overflow: hidden;
                background: #F7F8FA;
                margin: 0 auto;
                box-sizing: border-box;
                .txt2{
                    margin: 0;
                    width: 100%;
                    box-sizing: border-box;
                    border: none;
                    padding:20px;
                    font-size: 16px;
                    color: #333;
                    overflow-x: hidden;
                    overflow-y: auto;
                    line-height: 1.2;
                    outline: none;
                    resize: none;
                    height: 100%;
                    word-break:break-all;
                    /*border: 1px solid red;*/
                }
                .txt2::-webkit-scrollbar { width: 0 !important }
                .txt2{ -ms-overflow-style: none; }
                .txt2{ overflow: -moz-scrollbars-none; }
            }
            .btn{
                width: 50%;
                margin: 0 auto;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .cancel,.post{
                    width: 84px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #003680;
                    border-radius: 6px;
                    color: #003680;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
        }
    }
</style>