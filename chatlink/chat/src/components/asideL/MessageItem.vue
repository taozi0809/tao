<template>
    <div class="friend-item">
        <ul>
            <li v-for="(item,index) in messageList">
                <div v-if="item.type=='GROUP'" class="item" :class="index==chatInfoIndex?'active':''" @click="chatGroup(item,index)">
                    <div class="head-img">
                        <GroupHeadImg :imgList="JSON.parse(item.params).icons"/>
                    </div>
                    <div class="message">
                        <div class="t1">{{JSON.parse(item.params).name}}</div>
                        <div class="t2">{{item.lastMessage!=null?item.lastMessage.content:''}}</div>
                    </div>
                    <div class="status">
                        <div class="s1" v-if="item.lastMessage!=null">{{item.lastMessage.createTime | timestampToDate}}</div>
                        <div class="s1" v-if="item.lastMessage===null">{{item.lastTime | timestampToDate}}</div>
<!--                        <div class="s1">{{item.lastTime | timestampToDate}}</div>-->
                        <div class="s2">
                            <div class="badge" v-if="item.unread>0">{{item.unread}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="item.type=='USER'" class="item" :class="index==chatInfoIndex?'active':''" @click="chatFriend(item,index)">
                    <div class="head-img">
                        <GroupHeadImg :imgList="JSON.parse(item.params).avatar"/>
                    </div>
                    <div class="message">
                        <div class="t1">{{JSON.parse(item.params).nickName}}</div>
                        <div class="t2">{{item.lastMessage!=null?item.lastMessage.content:''}}</div>
                    </div>
                    <div class="status">
                        <div class="s1" v-if="item.lastMessage!=null">{{item.lastMessage.createTime | timestampToDate}}</div>
                        <div class="s1" v-if="item.lastMessage===null">{{item.lastTime | timestampToDate}}</div>
<!--                        <div class="s1">{{item.lastTime | timestampToDate}}</div>-->

                        <div class="s2">
                            <span class="badge" v-if="item.unread>0">{{item.unread}}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import GroupHeadImg from '../GroupHeadImg'
    import {bus} from "../../util/tools/eventBus";
    import {duplicateRemoval} from "../../util/tools/sore";

    export default {
        components:{GroupHeadImg},
        data(){
            return{
                list:[],
            }
        },
        computed:{
            ...mapState(['token','userInfo','messageList','chatInfoIndex','chatInfo','topList']),
        },
        created:function(){
            bus.$on('getMessage',data=>{
                // console.log('aa',this.chatInfo)
                // console.log('data',data)
                // console.log(this.messageList,this.chatInfoIndex)
                for(let i in this.messageList){
                    if(this.messageList[i].groupIdCode==data.groupIdCode){
                        this.messageList[i].lastMessage['content']=data.content
                        this.messageList[i].lastMessage['createTime']=data.createTime
                        if(this.messageList[i].groupIdCode==data.groupIdCode&&this.chatInfo.groupIdCode!=data.groupIdCode){
                            this.messageList[i].unread=parseInt(this.messageList[i].unread)+1
                        }
                    }
                }
            })
            bus.$on('getGroupListAdd',data=>{
                var arr = []
                arr.push(data)
                this.MESSAGELIST([...arr,...this.messageList])
            })

        },
        methods:{
            ...mapMutations(['CHATSTATUS','CHATINFO','CHATINFOINDEX','MESSAGELIST']),
            chatGroup(item,index){
                this.CHATINFOINDEX(index)
                this.CHATSTATUS('2')
                this.CHATINFO(item)
                // console.log('groupIndex',index,item)
            },
            chatFriend(item,index){
                this.CHATINFOINDEX(index)
                this.CHATSTATUS('1')
                this.CHATINFO(item)
                // console.log('FriendIndex',index,item)
            },
        },
        watch:{
            chatInfoIndex(newValue,oldValue){
                this.messageList[newValue].unread=0
            },
            chatInfo(newValue,oldValue){
                if(newValue!=oldValue){
                    console.log(newValue.groupIdCode)
                    for(let i in this.messageList){
                        if(newValue.groupIdCode==this.messageList[i].groupIdCode){
                            this.CHATINFOINDEX(i)
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.friend-item{
    width: 100%;
    background: #DEE2E8;
    .item{
        display: flex;
        align-items: center;
        width: 100%;
        height: 70px;
        background: #DEE2E8;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        margin: 0 auto;
        .head-img{
            width: 42px;
            height: 42px;
            margin-right: 6px;
            background: #fff;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink:0;
            margin-left: 10px;
        }
        .message{
            box-sizing: border-box;
            height: 50px;
            flex-shrink: 0;
            width: 150px;
            overflow: hidden;
            .t1{
                font-size: 15px;
                height: 26px;
                line-height: 26px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space : nowrap;
            }
            .t2{
                font-size: 12px;
                color: #888888;
                height: 18px;
                line-height: 18px;
                max-width: 160px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space : nowrap;

            }
        }
        .status{
            margin-right: 10px;
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            flex-shrink:0;
            height: 50px;
            /*border: 1px solid red;*/
            overflow: hidden;
            /*min-width: 100px;*/
            .s1{
                font-size: 12px;
                color: #888888;
                height: 26px;
                line-height: 26px;
            }
            .s2{
                height: 18px;
                line-height: 18px;
                .badge{
                    position: absolute;
                    right: 0;
                    border-radius: 10px;
                    height:20px;
                    overflow: hidden;
                    background: #FF6767;
                    padding: 0 7px;
                    font-size: 12px;
                    color: #fff;
                    display: inline-block;
                    text-align: center;
                    line-height: 20px;
                    margin: 0 auto;
                }
            }
        }
    }
    .active{
        background: #fff;
    }
    .item:hover{
        background:rgba(255,255,255,0.3);
    }
    .active:hover{
        background: #fff;
    }

}
</style>