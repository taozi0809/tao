<template>
    <div class="home">
        <AsideL/>
        <Main/>
        <transition name="animation">
            <AsideR v-if="isChatInfoDes"/>
        </transition>
        <UserInfoMenu v-if="isUserInfoMenu"/>
        <GroupNotice v-if="popover=='2'"/>
        <CreateGroup v-if="popover=='3'"/>
        <QrGroup v-if="popover=='4'"/>
        <AddFriend v-if="popover==5"/>
        <RedPacketA v-if="popover==6"/>
        <RedPacketB v-if="popover==7"/>
        <RedPacketC v-if="popover==8"/>
        <RedPacketD v-if="popover==9"/>
        <RedPacketE v-if="popover==10"/>
        <SendPacketA v-if="popover==11"/>
        <SendPacketB v-if="popover==12"/>
        <SendPacketC v-if="popover==13"/>
        <SearchList v-if="popover==14"/>
    </div>
</template>

<script>
    import AsideL from '../components/asideL/AsideL'
    import Main from '../components/main/Main'
    import AsideR from '../components/assideR/AsideR'
    import UserInfoMenu from '../components/asideL/UserInfoMenu'
    import GroupNotice from '../components/GroupNotice'
    import QrGroup from '../components/QrGroup'
    import CreateGroup from '../components/CreateGroup'
    import AddFriend from '../components/AddFriend'
    import RedPacketA from '../components/RedPacketA'
    import RedPacketB from '../components/RedPacketB'
    import RedPacketC from '../components/RedPacketC'
    import RedPacketD from '../components/RedPacketD'
    import RedPacketE from '../components/RedPacketE'
    import SendPacketA from '../components/SendPacketA'
    import SendPacketB from '../components/SendPacketB'
    import SendPacketC from '../components/SendPacketC'
    import SearchList from '../components/SearchList'
    import {YXB} from "../data/YXB";
    import {mapState, mapMutations} from 'vuex'
    import {friendRelationApplyList,userInit,friendRelationList,userInfos,friendMark} from "../service/api";
    import {baseUrl} from "../data/base";
    import {bus} from "../util/tools/eventBus";
    import {sortKey,duplicateRemoval} from "../util/tools/sore";

    export default {
        components:{AsideL,Main,AsideR,UserInfoMenu,GroupNotice,CreateGroup,QrGroup,AddFriend,
            RedPacketA,RedPacketB,RedPacketC,RedPacketD,RedPacketE,SendPacketA,SendPacketB,SendPacketC,
            SearchList,},
        data(){
            return{
                userInitData:{},
                messageList:[],
                friendMarkArr:[],
            }
        },
        computed:{
            ...mapState(['isUserInfoMenu','userInfo','token','isChatInfoDes','chatStatus','chatInfo','popover','topList']),
        },
        created:function(){
            this.initWebsocket()
            this.getUserInit()
            this.friendRelationApplyList()
            this.friendRelationList()
        },
        methods:{
            ...mapMutations(['FRIENDRELATIONAPPLYS','MESSAGELIST','FRIENDLIST','FRIENDMARKLIST','GROUPLIST','USERINFO','TOKEN',
                'MESSAGETXT','ISCHATINFODES']),
            friendRelationApplyList(){
                friendRelationApplyList(this.userInfo.userName,this.token).then(res=>{
                    console.log('好友申请列表',res)
                    if(res.code==0){
                        this.FRIENDRELATIONAPPLYS(res.data.friendRelationApplys)
                    }
                })
            },
            async userInita(type){
                return await new Promise((resolve, reject) => {
                    userInit(this.userInfo.userName,this.token,type).then(res=>{
                        resolve(res.data)
                    })
                })
            },
            async getUserInit(){
                this.MESSAGELIST([])
                var list1= await this.userInita('GROUP')
                var list2= await this.userInita('USER')


                var idCodes=[]
                for(let i in list2.userChatCtoModels){
                   idCodes.push(JSON.parse(list2.userChatCtoModels[i].params).idCode)
                }
                userInfos(idCodes).then(response=>{
                    // console.log(response)
                    if(response.code==0){
                        for(let i in list2.userChatCtoModels){
                            for(let j in response.data.userInfoChatCtoModels){
                                if(response.data.userInfoChatCtoModels[j].idCode==JSON.parse(list2.userChatCtoModels[i].params).idCode){
                                    list2.userChatCtoModels[i].params=JSON.stringify(response.data.userInfoChatCtoModels[j])
                                }
                            }
                        }
                        // console.log(list2.userChatCtoModels)

                        console.log('消息列表',[...list1.userChatCtoModels,...list2.userChatCtoModels])
                        console.log('群列表',list1.userChatCtoModels)

                        //messageList排序
                        var list3 = sortKey([...list1.userChatCtoModels,...list2.userChatCtoModels],'lastTime')
                        //去重
                        var list4 = duplicateRemoval(list3,this.topList)
                        var messageList = [...this.topList,...list4]
                        this.GROUPLIST(list1.userChatCtoModels)
                        this.MESSAGELIST(messageList)
                    }
                })
            },
            friendRelationList(){
                friendRelationList(this.userInfo.userName,this.token).then(res=>{
                    // console.log('好友列表idCode',res)
                    if(res.code==0){
                        var friendUsers=res.data.friendUsers
                        var arr=[]
                        for(let i in friendUsers){
                            var last
                            parseInt(i)+1==friendUsers.length?last=true:last=false
                            arr.push(friendUsers[i].idCode)
                            this.getFriendMark(friendUsers[i].idCode,last)
                        }
                        userInfos(arr).then(data=>{
                            console.log('好友列表',data)
                            if(data.code==0){
                                this.FRIENDLIST(data.data.userInfoChatCtoModels)
                            }
                        })
                    }
                })
            },
            async friendMark(idCode){
                return await new Promise((resolve, reject) => {
                    friendMark(idCode,this.token,this.userInfo.userName).then(res=>{
                        resolve(res)
                    })
                })
            },
            async getFriendMark(idCode,last){
                var data = await this.friendMark(idCode)
                if(data.data.mark=='1'){
                    this.friendMarkArr.push(idCode)
                }
                if(last){
                    userInfos(this.friendMarkArr).then(data=>{
                        console.log('星标好友列表',data)
                        if(data.code==0){
                            this.FRIENDMARKLIST(data.data.userInfoChatCtoModels)
                        }
                    })
                }
            },

            initWebsocket(){
                let _this = this
                let websocket = new YXB.websocket({
                    userName :this.userInfo.userName,
                    token : this.token,
                    url:baseUrl.ws,
                    error : function(code) {
                        if(code==12008){
                            _this.TOKEN('')
                            _this.USERINFO({})
                            _this.$router.push('/login')
                            alert('您的账号已在其他设备登录，请重新登录')
                        }
                    },
                    close : function(evt) {
                        if(evt.code==1006){
                            console.log('1006')
                        }
                    },
                    message : function(model, data) {
                        filter(model, data);
                    }
                });
                let filter = (model,data)=>{
                    switch (model) {
                        case "youxibi.center.regist.success":
                            console.log('websocket注册成功')
                            break;
                        case "youxibi.chat.websocket.message.model":
                            console.log('好友/群消息:',data)
                            //处理消息
                            // _this.messageProcess(data)
                            bus.$emit('getMessage',data)
                            break;
                        case "youxibi.chat.websocket.message.model.list":
                            console.log('message.model.list:',data)
                            break;
                        case "youxibi.chat.websocket.group.user.delete":
                            console.log('group.user.delete:',data)
                            break;
                        case "youxibi.chat.websocket.user.init":
                            console.log('websocket初始化:',data)
                            break;
                        case "youxibi.chat.websocket.user.chat.in":
                            console.log('user.chat.in:',data)
                            break;
                        case "youxibi.chat.websocket.user.chat.out":
                            console.log('user.chat.out:',data)
                            break;
                        case "youxibi.chat.websocket.user.chat.update":
                            console.log('user.chat.update:',data)
                            break;
                        case "youxibi.chat.websocket.user.chat":
                            console.log('user.chat:',data)
                            if(data.type=='GROUP'){
                                //更新群列表
                                bus.$emit('getGroupListAdd',data)
                            }
                            break;
                        case "youxibi.chat.websocket.user.chat.delete":
                            console.log('user.chat.delete:',data)
                            //解散群
                            break;
                        case "youxibi.chat.websocket.group.edit":
                            console.log('group.edit:',data)
                            //修改群名&加群是否需要审核
                            break;
                        case "youxibi.user.websocket.change.info":
                            console.log('change.info:',data)
                            break;
                        case "youxibi.user.websocket.change.lang":
                            console.log('change.lang:',data)
                            break;
                        case "youxibi.user.websocket.friend.relation.apply.agree":
                            console.log('friend.relation.apply.agree:',data)
                            //同意/拒绝
                            _this.friendRelationApplyList()
                            window.location.reload();
                            break;
                        case "youxibi.user.websocket.friend.relation.apply":
                            // console.log('friend.relation.apply:',data)
                            //好友申请
                            _this.friendRelationApplyList()
                            break;
                        case "youxibi.user.websocket.other.login":
                            console.log('other.login:',data)
                            break;
                        default:
                            break;
                    }
                }
            },
        },
        watch:{
            chatInfo(newValue,oldValue){
                if(newValue!=oldValue){
                    this.ISCHATINFODES(false)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/mixin";
    .home{
        @include center;
        display: flex;
        width: 62.5vw;
        height: 39vw;
        min-width: 1000px;
        min-height: 625px;
        /*position: relative;*/

    }
    .animation-enter,.animation-leave-to{
        opacity: 0;
        transform: translateX(-150px);
    }
    .animation-enter-active{
        transition: all .5s ease;
    }
    .animation-leave-active{
        transition: all .2s ease;
    }
</style>