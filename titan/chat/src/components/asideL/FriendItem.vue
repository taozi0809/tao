<template>
    <div class="friend-item">
        <div class="new-friend" :class="activeIndex=='newFriend'?'active':''" @click="chatNewFriend">
            <div class="head-img"><img src="../../assets/images/asideL/new_friend.png" alt=""></div>
            <div class="t1">新的朋友</div>
            <span class="badge" v-if="friendRelationApplys.length>0">{{friendRelationApplys.length}}</span>
        </div>
        <ul>
            <div class="title">
                <span><img src="../../assets/images/asideL/xb.png" alt=""></span>
                星标好友
            </div>
            <li v-for="(item,index) in friendMarkList" :class="index==activeIndex?'active':''" @click="chatFriend(item,index)">
                <div class="item">
                    <div class="head-img">
                        <GroupHeadImg :imgList="item.avatar"/>
                    </div>
                    <div class="message">
                        <div class="t1">{{item.userNickName}}</div>
                    </div>
                </div>
            </li>
        </ul>
        <ul>
            <div class="title">我的群聊</div>
            <li v-for="(item,index) in groupList" :class="index==activeIndex?'active':''" @click="chatGroup(item,index)">
                <div class="item">
                    <div class="head-img">
                        <GroupHeadImg :imgList="JSON.parse(item.params).icons"/>
                    </div>
                    <div class="message">
                        <div class="t1">{{JSON.parse(item.params).name}}</div>
                    </div>
                </div>
            </li>
        </ul>
        <ul>
            <div class="title">联系人</div>
            <li v-for="(item,index) in friendList" :class="index==activeIndex?'active':''" @click="chatFriend(item,index)">
                <div class="item">
                    <div class="head-img">
                        <GroupHeadImg :imgList="item.avatar"/>
                    </div>
                    <div class="message">
                        <div class="t1">{{item.userNickName}}</div>
                    </div>
                </div>
            </li>
        </ul>


    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex'
    import GroupHeadImg from '../GroupHeadImg'

    export default {
        components:{GroupHeadImg},
        data(){
            return{
                activeIndex:'',
            }
        },
        computed:{
            ...mapState(['token','userInfo','friendList','friendMarkList','groupList','friendRelationApplys'])
        },
        created:function(){

        },
        methods:{
            ...mapMutations(['CHATSTATUS','CHATINFO']),
            chatGroup(item,index){
                this.activeIndex=index
                this.CHATSTATUS('2')
                this.CHATINFO(item)
                console.log('groupIndex',index,item)
            },
            chatFriend(item,index){
                this.activeIndex=index
                this.CHATSTATUS('5')
                this.CHATINFO(item)
                console.log('FriendIndex',index,item)
            },
            chatNewFriend(){
                this.activeIndex='newFriend'
                this.CHATSTATUS('4')
                this.CHATINFO(this.friendRelationApplys)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .friend-item{
        width: 100%;
        background: #DEE2E8;
        .new-friend{
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
                img{
                    width: 100%;
                }
            }
            .badge{
                position: absolute;
                right: 10px;
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
        .title{
            width: 100%;
            height: 30px;
            font-size: 14px;
            color: #333333;
            background: #D5DCE6;
            line-height: 30px;
            box-sizing: border-box;
            padding-left: 14px;
            font-family:"Leelawadee UI";
            display: flex;
            align-items: center;
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 14px;
                margin-right:4px;
                img{
                    width: 100%;
                }
            }
        }
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
                max-width: 90%;
                overflow: hidden;
                .t1{
                    font-size: 15px;
                    height: 26px;
                    line-height: 26px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }

        }
        .active{
            background: #fff;
        }
        .item:hover,.new-friend:hover{
            background:rgba(255,255,255,0.3);
        }

    }
</style>