<template>
    <div class="main">
        <div v-if="chatStatus=='1'||chatStatus=='2'">
            <HeadTop/>
            <ChatHistory :key="chatIdCode"/>
            <Chat/>
        </div>
        <NewFriendInfo v-if="chatStatus=='4'"/>
        <FriendInfo v-if="chatStatus=='5'"/>
    </div>
</template>
<script>
    import HeadTop from './HeadTop'
    import ChatHistory from './ChatHistory'
    import Chat from './Chat'
    import FriendInfo from '../FriendInfo'
    import NewFriendInfo from '../NewFriendInfo'
    import {mapState, mapMutations} from 'vuex'
    export default {
        components:{HeadTop,ChatHistory,Chat,FriendInfo,NewFriendInfo},
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['chatStatus','chatInfo','isChatInfoDes']),
            chatIdCode(){
                switch (this.chatStatus){
                    case '1':
                        return this.chatInfo.groupIdCode
                        break;
                    case '2':
                        return this.chatInfo.groupIdCode
                        break;
                    case '3':
                        break;
                    case '4':
                        break;
                    case '5':
                        break;
                    default:
                        break;

                }
            },
        },
        created:function(){

        },

    }
</script>


<style lang="scss" scoped>
    .main{
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
    }
</style>