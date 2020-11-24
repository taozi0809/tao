<template>
    <div class="group-info">
        <div class="index" v-if="status==0">
            <div class="top">群信息</div>
            <div class="box">
                <div class="name-label">群名</div>
                <div class="name group-edit" @click="isGroupEdit=true" v-if="!isGroupEdit&&info.role!=0">
                    <div class="name-name">{{oldGroupName}}</div>
                    <span><img src="../../assets/images/asideR/editor.png" alt=""></span>
                </div>
                <div class="name group-edit" v-if="info.role==0">{{oldGroupName}}</div>
                <div class="name new-group-name" v-if="isGroupEdit">
                    <input autofocus type="text" v-model="newGroupName" @blur="editGroupNameOnBlur" :placeholder="oldGroupName">
                </div>
                <div class="name-label">群公告</div>
                <div class="name notice" @click="POPOVER('2')" v-if="isInfoContent">{{info.notice.content}}</div>
                <div class="name no-notice" @click="POPOVER('2')" v-if="!isInfoContent">点击编辑群公告
                    <span><img src="../../assets/images/asideR/editor.png" alt=""></span>
                </div>
                <div class="name-label manage" @click="POPOVER('4')">群二维码
                    <span class="arrow-r"><img src="../../assets/images/asideR/arrow-r.png" alt=""></span>
                </div>
                <div class="name-label manage" @click="info.role!=0?status=1:''" v-if="info.role==1||info.role==2">群管理
                    <span class="arrow-r"><img src="../../assets/images/asideR/arrow-r.png" alt=""></span>
                </div>
                <div class="name-label apply" @click="info.role!=0?status=2:''" v-if="info.role==1||info.role==2">新成员申请
                    <span class="arrow-r"><img src="../../assets/images/asideR/arrow-r.png" alt=""></span>

                    <span class="badge" v-if="groupApplyList.length>0">{{groupApplyList.length}}</span>
                    <!--<div class="list"></div>-->
                </div>
                <div class="name-label manage">
                    <div class="t2">置顶聊天</div>
                    <div class="r">
                        <el-switch
                                v-model="stick3"
                                active-color="#56c47d"
                                inactive-color="#bbb"
                                @change="onStick3"
                        >
                        </el-switch>
                    </div>
                </div>
                <div class="members">
                    <div class="t">群成员</div>
                    <div class="list-members" :class="isMore?'list-members-no':'list-members-more'">
                        <ul>
                            <li @click="status=3" v-if="info.role!=0&&info.type=='NORMAL'"><span><img src="../../assets/images/asideR/add.png" alt=""></span><div class="user-name"></div></li>
                            <li @click="status=4" v-if="info.role!=0"><span><img src="../../assets/images/asideR/sub.png" alt=""></span><div class="user-name"></div></li>
                            <li v-for="(item,index) in info.groupUserCtoModels" :key="index" @click="goUserInfo(item)">
                                <span><img :src="item.avatar" alt=""></span>
                                <div class="user-name">{{item.nickName}}</div>
                                <div class="role" :class="item.role==1?'owner':item.role==2?'manageTxt':''">{{item.role==1?'群主':item.role==2?'群管理':''}}</div>
                            </li>
                      </ul>
                    </div>
                    <div class="more" v-if="isMore" @click="showMore">查看更多群成员 ></div>
                    <!--<div class="more" v-if="isMore" @click="showMore">查看更多群成员 <span><img src="../../assets/images/asideL/arrow-bot.png" alt=""></span></div>-->
                </div>
            </div>
            <div class="less" v-if="isLess" @click="showLess">收起群成员 <span><img src="../../assets/images/asideL/arrow-bot.png" alt=""></span></div>
<!--            <div class="btn b-r" @click="groupDestroy">删除并退出</div>-->
            <div class="btn b-r" @click="groupDestroy"v-if="info.role==1||info.role==2">删除并退出</div>
            <div class="btn b-r" @click="groupOut" v-if="info.role!=1&&info.role!=2">退出群聊</div>
        </div>
        <div class="group-manage" v-if="status==1">
            <div class="top">群管理</div>
            <div class="stick">
                <div class="t2">加群需群管理审核</div>
                <div class="r">
                    <el-switch
                            v-model="stick2"
                            active-color="#56c47d"
                            inactive-color="#bbb"
                            @change="onStick2"
                    >
                    </el-switch>
                </div>
            </div>
            <div class="manage-des t3">启用后，群成员邀请新成员入群，必须由 管理员审核，同意方可入群。</div>
            <div class="transfer" @click="status=5">
                群主管理权转让
                <span class="arrow-r"><img src="../../assets/images/asideR/arrow-r.png" alt=""></span>
            </div>
            <div class="administrator">
                <div class="t3">群管理员</div>
                <ul class="ul1">
                    <li class="li1">群管理员拥有以下能力：</li>
                    <li class="li1">1.发表群公告</li>
                    <li class="li1">2.设置入群审核，并可确认入群申请</li>
                    <li class="li1">3.移除群成员</li>
                </ul>
                <div class="list2">
                    <ul class="ul2">
                        <li class="li2" @click="status=6"><span><img src="../../assets/images/asideR/add.png" alt=""></span><div class="user-name"></div></li>
                        <li class="li2" @click="status=7"><span><img src="../../assets/images/asideR/sub.png" alt=""></span><div class="user-name"></div></li>
                        <li class="li2" v-for="(item,index) in info.groupUserCtoModels" :key="index" v-if="item.role==1||item.role==2">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="user-name">{{item.nickName}}</div>
                            <div class="role" :class="item.role==1?'owner':item.role==2?'manageTxt':''">{{item.role==1?'群主':item.role==2?'群管理':''}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="btn b-r" @click="status=0">返回</div>
        </div>
        <div class="new-group-user-apply" v-if="status==2">
            <div class="top">新成员申请</div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in groupApplyList" :key="index">
                        <div class="info">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="name">{{item.nickName}}</div>
                        </div>
                        <div class="radio-select">
                            <div class="btn-agreed" @click="agreed(item)">同意</div>
                            <!--<span v-if="!item.isSelect"><img src="../../assets/images/font_select.png" alt=""></span>-->
                            <!--<span v-if="item.isSelect"><img src="../../assets/images/font_selected.png" alt=""></span>-->
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn b-r" @click="back('0')">返回</div>
        </div>
        <div class="add-group-user" v-if="status==3">
            <div class="top">添加群成员</div>
            <div class="search"><input type="text" v-model="addGroupUserSearch" placeholder="搜索" @input="changeAddGroupUserSearch"></div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in addGroupUserList" :key="index" @click="addGroupUserSelect(item,index)">
                        <div class="info">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="name">{{item.nickName}}</div>
                        </div>
                        <div class="radio-select">
                            <span v-if="!item.isSelect"><img src="../../assets/images/font_select.png" alt=""></span>
                            <span v-if="item.isSelect"><img src="../../assets/images/font_selected.png" alt=""></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-box">
                <div class="btn-return" @click="back('0')">返回</div>
                <div class="btn-holder" @click="addGroupUser">添加</div>
            </div>
        </div>
        <div class="delete-group-user" v-if="status==4">
            <div class="top">删除群成员</div>
            <div class="search"><input type="text" v-model="delGroupUserSearch" placeholder="搜索" @input="changeDelGroupUserSearch"></div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in delGroupUserList" :key="index" @click="delGroupUserSelect(item,index)">
                        <div class="info">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="name">{{item.nickName}}</div>
                        </div>
                        <div class="radio-select">
                            <span v-if="!item.isSelect"><img src="../../assets/images/font_select.png" alt=""></span>
                            <span v-if="item.isSelect"><img src="../../assets/images/font_selected.png" alt=""></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-box">
                <div class="btn-return" @click="back('0')">返回</div>
                <div class="btn-holder" @click="delGroupUser">删除</div>
            </div>
        </div>
        <div class="group-set-holder" v-if="status==5">
            <div class="top">群主管理权转让</div>
            <div class="search"><input type="text" v-model="searchHolder" placeholder="搜索" @input="changeSearchHolder"></div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in holderList" :key="index" @click="holderSelect(item,index)">
                        <div class="info">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="name">{{item.nickName}}</div>
                        </div>
                        <div class="radio-select">
                            <span v-if="!item.isSelect"><img src="../../assets/images/font_select.png" alt=""></span>
                            <span v-if="item.isSelect"><img src="../../assets/images/font_selected.png" alt=""></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-box">
                <div class="btn-return" @click="back('1')">返回</div>
                <div class="btn-holder" @click="groupSetHolder">转让群主</div>
            </div>
        </div>
        <div class="add-group-holder" v-if="status==6">
            <div class="top">添加群管理员</div>
            <div class="search"><input type="text" v-model="addSearchHolder" placeholder="搜索" @input="changeAddSearchHolder"></div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in addHolderList" :key="index" @click="addHolderSelect(item,index)">
                        <div class="info">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="name">{{item.nickName}}</div>
                        </div>
                        <div class="radio-select">
                            <span v-if="!item.isSelect"><img src="../../assets/images/font_select.png" alt=""></span>
                            <span v-if="item.isSelect"><img src="../../assets/images/font_selected.png" alt=""></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-box">
                <div class="btn-return" @click="back('1')">返回</div>
                <div class="btn-holder" @click="addGroupSetHolder">添加</div>
            </div>
        </div>
        <div class="del-group-holder" v-if="status==7">
            <div class="top">删除群管理员</div>
            <div class="search"><input type="text" v-model="delSearchHolder" placeholder="搜索" @input="changeDelSearchHolder"></div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in delHolderList" :key="index" @click="delHolderSelect(item,index)">
                        <div class="info">
                            <span><img :src="item.avatar" alt=""></span>
                            <div class="name">{{item.nickName}}</div>
                        </div>
                        <div class="radio-select">
                            <span v-if="!item.isSelect"><img src="../../assets/images/font_select.png" alt=""></span>
                            <span v-if="item.isSelect"><img src="../../assets/images/font_selected.png" alt=""></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-box">
                <div class="btn-return" @click="back('1')">返回</div>
                <div class="btn-holder" @click="delGroupSetHolder">删除</div>
            </div>
        </div>
        <message ref="message"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {groupInfo,groupEdit,groupJoinApplyList,groupDestroy,groupEditType,groupSetHolder,
    groupAddManager,groupRemoveManager,groupJoin,groupDelete,userInfos,groupJoinAgree,groupOut,
    } from "../../service/api";
    import {duplicateRemoval,sortKey} from "../../util/tools/sore";

    export default {
        data(){
            return{
                info:{},
                stick:false,
                stick2:false,
                stick3:false,
                isGroupEdit:false,
                newGroupName:'',
                oldGroupName:'',
                status:0,//0->默认群详情 1->群管理 2->新成员申请 3->添加群成员 4->删除群成员 5->群主管理权转让 6->添加群管理员 7->删除群管理员
                isMore:false,
                isLess:false,
                applyList:[],
                isInfoContent:false,
                searchHolder:'',
                holderList:[],
                holderIdCode:[],
                addSearchHolder:'',
                addHolderList:[],
                addHolderListCopy:[],
                holderListCopy:[],
                delSearchHolder:'',
                delHolderList:[],
                delHolderListCopy:[],
                addGroupUserSearch:'',
                addGroupUserList:[],
                addGroupUserListCopy:[],
                delGroupUserSearch:'',
                delGroupUserList:[],
                delGroupUserListCopy:[],
                groupApplyList:[],


            }
        },
        computed:{
            ...mapState(['chatInfo','userInfo','token','friendList','topList','messageList']),
        },
        created:function(){
            this.groupInfo()
            this.groupJoinApplyList()
            for(let i in this.topList){
                if(this.topList[i].groupIdCode==this.chatInfo.groupIdCode){
                    this.stick3=true
                }
            }


        },
        methods:{
            ...mapMutations(['POPOVER','CHATSTATUS','ISCHATINFODES','CHATINFOINDEX','CHATINFO','TOPLIST','MESSAGELIST']),

            groupInfo(){
                groupInfo(this.userInfo.userName,this.token,this.chatInfo.groupIdCode).then(res=>{
                    console.log('群详情',res)
                    if(res.code==0){
                        var arr1=[]
                        var arr2=[]
                        var arr3=[]
                        for(let i in res.data.groupUserCtoModels){
                            if(res.data.groupUserCtoModels[i].role==0){
                                arr3.push(res.data.groupUserCtoModels[i])
                            }
                            if(res.data.groupUserCtoModels[i].role==1){
                                arr1.push(res.data.groupUserCtoModels[i])
                            }
                            if(res.data.groupUserCtoModels[i].role==2){
                                arr2.push(res.data.groupUserCtoModels[i])
                            }
                        }
                        this.addHolderList=[...arr3]
                        this.addHolderListCopy=[...arr3]
                        this.delHolderList=[...arr2]
                        this.delHolderListCopy=[...arr2]
                        this.holderList=[...arr2,...arr3]
                        this.holderListCopy=[...arr2,...arr3]
                        this.delGroupUserList=[...arr2,...arr3]
                        this.delGroupUserListCopy=[...arr2,...arr3]
                        res.data.groupUserCtoModels=[...arr1,...arr2,...arr3]
                        this.info=res.data
                        this.isMore=res.data.groupUserCtoModels.length>4?true:false
                        // this.isMore=false
                        this.oldGroupName = res.data.name
                        if(res.data.hasOwnProperty('notice')){
                            if(!!res.data.notice){
                                if(!!res.data.notice.content){
                                    this.isInfoContent=true
                                }else{
                                    this.isInfoContent=false
                                }
                            }else{
                                this.isInfoContent=false
                            }
                        }else{
                            this.isInfoContent=false
                        }
                        var arr4=[]
                        for(let i in this.friendList){
                            let m=0
                            let n=res.data.groupUserCtoModels.length
                            for(let j in res.data.groupUserCtoModels){
                                if(this.friendList[i].idCode!=res.data.groupUserCtoModels[j].idCode){m++}
                                if(n==m){
                                    arr4.push(this.friendList[i])
                                }
                            }
                        }
                        this.addGroupUserList=[...arr4]
                        this.addGroupUserListCopy=[...arr4]
                        if(this.info.type=="NORMAL"){
                            this.stick2=false
                        }else{
                            this.stick2=true
                        }
                    }
                })
            },
            groupJoinApplyList(){
                groupJoinApplyList(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,'1','100').then(res=>{
                    console.log('申请加入群List',res)
                    if(res.code==0){
                        let arr =[]
                        for(let i in res.data.groupApplyCtoModels){
                            arr.push(res.data.groupApplyCtoModels[i].idCode)
                        }
                        userInfos(arr).then(r=>{
                            if(res.code==0){
                                this.groupApplyList = r.data.userInfoChatCtoModels
                            }
                        })
                    }
                })
            },
            editGroupNameOnBlur(){
              this.isGroupEdit=false
              if(!!this.newGroupName){
                  groupEdit(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,this.newGroupName).then(res=>{
                      console.log('修改群名',res)
                      if(res.code==0){
                          this.oldGroupName=this.newGroupName
                          window.location.reload();
                      }else{
                          this.newGroupName=''
                          this.$refs.message.Message(res.message);
                      }
                  })
              }
            },
            groupDestroy(){
                groupDestroy(this.userInfo.userName,this.token,this.chatInfo.groupIdCode).then(res=>{
                    console.log('销毁群',res)
                    if(res.code==0){
                        var arr=[]
                        for(let i in this.topList){
                            if(this.chatInfo.groupIdCode!=this.topList[i].groupIdCode){
                                arr.push(this.topList[i])
                            }
                        }
                        this.TOPLIST(arr)
                        this.CHATSTATUS('0')
                        this.CHATINFOINDEX('-1')
                        this.ISCHATINFODES(false)
                        window.location.reload();
                    }
                })
            },
            groupOut(){
                groupOut(this.userInfo.userName,this.token,this.chatInfo.groupIdCode).then(res=>{
                    console.log('退出群',res)
                    if(res.code==0){
                        var arr=[]
                        for(let i in this.topList){
                            if(this.chatInfo.groupIdCode!=this.topList[i].groupIdCode){
                                arr.push(this.topList[i])
                            }
                        }
                        this.TOPLIST(arr)
                        this.CHATSTATUS('0')
                        this.CHATINFOINDEX('-1')
                        this.ISCHATINFODES(false)
                        window.location.reload();
                    }
                })
            },
            onStick2(){
                groupEditType(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,this.stick2?'MANAGER_AUDIT':'NORMAL').then(res=>{
                    console.log('修改进群是否要审核',res)
                    if(res.code==0){
                        window.location.reload();
                    }
                })
            },
            holderSelect(item,index){
                if(!item.isSelect){
                    for(let i in this.holderList){
                        this.holderList[i].isSelect=false
                    }
                }
                this.holderList[index]['isSelect']=!this.holderList[index]['isSelect']
                this.$forceUpdate()
            },
            changeSearchHolder(){
                if(!!this.searchHolder){
                    this.holderList=this.holderList.filter(value => value.nickName.indexOf(this.searchHolder) !==-1)
                }else{
                    this.holderList=this.holderListCopy
                }
            },
            groupSetHolder(){
                for(let i in this.holderList){
                    if(this.holderList[i].isSelect){
                        this.holderIdCode=this.holderList[i].idCode
                    }
                }
                if(!!this.holderIdCode){
                    groupSetHolder(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,this.holderIdCode).then(res=>{
                        console.log('转让群主',res)
                        if(res.code==0){
                            this.status=0
                            window.location.reload();
                        }
                    })
                }
            },
            addHolderSelect(item,index){
                this.addHolderList[index]['isSelect']=!this.addHolderList[index]['isSelect']
                this.$forceUpdate()
            },
            changeAddSearchHolder(){
                if(!!this.addSearchHolder){
                    this.addHolderList=this.addHolderList.filter(value => value.nickName.indexOf(this.addSearchHolder) !==-1)
                }else{
                    this.addHolderList=this.addHolderListCopy
                }
            },
            addGroupSetHolder(){
                let arr=[]
                for(let i in this.addHolderList){
                    if(this.addHolderList[i].isSelect){
                        arr.push(this.addHolderList[i].idCode)
                    }
                }
                if(arr.length>0){
                    groupAddManager(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,arr).then(res=>{
                        console.log('添加群管理员',res)
                        if(res.code==0){
                            this.status=1
                            window.location.reload();
                        }
                    })
                }
            },
            delHolderSelect(item,index){
                this.delHolderList[index]['isSelect']=!this.delHolderList[index]['isSelect']
                this.$forceUpdate()
            },
            changeDelSearchHolder(){
                if(!!this.delSearchHolder){
                    this.delHolderList=this.delHolderList.filter(value => value.nickName.indexOf(this.delSearchHolder) !==-1)
                }else{
                    this.delHolderList=this.delHolderListCopy
                }
            },
            delGroupSetHolder(){
                let arr=[]
                for(let i in this.delHolderList){
                    if(this.delHolderList[i].isSelect){
                        arr.push(this.delHolderList[i].idCode)
                    }
                }
                if(arr.length>0){
                    groupRemoveManager(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,arr).then(res=>{
                        console.log('删除群管理员',res)
                        if(res.code==0){
                            this.status=1
                            window.location.reload();
                        }
                    })
                }
            },
            changeAddGroupUserSearch(){
                if(!!this.addGroupUserSearch){
                    this.addGroupUserList=this.addGroupUserList.filter(value => value.nickName.indexOf(this.addGroupUserSearch) !==-1)
                }else{
                    this.addGroupUserList=this.addGroupUserListCopy
                }
            },
            addGroupUserSelect(item,index){
                this.addGroupUserList[index]['isSelect']=!this.addGroupUserList[index]['isSelect']
                this.$forceUpdate()
            },
            addGroupUser(){
                let arr=[]
                for(let i in this.addGroupUserList){
                    if(this.addGroupUserList[i].isSelect){
                        arr.push(this.addGroupUserList[i].idCode)
                    }
                }
                if(arr.length>0){
                    groupJoin(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,arr).then(res=>{
                        console.log('添加群成员',res)
                        if(res.code==0){
                            this.status=0
                            window.location.reload();
                        }
                    })
                }
            },
            changeDelGroupUserSearch(){
                if(!!this.delGroupUserSearch){
                    this.delGroupUserList=this.delGroupUserList.filter(value => value.nickName.indexOf(this.delGroupUserSearch) !==-1)
                }else{
                    this.delGroupUserList=this.delGroupUserListCopy
                }
            },
            delGroupUserSelect(item,index){
                this.delGroupUserList[index]['isSelect']=!this.delGroupUserList[index]['isSelect']
                this.$forceUpdate()
            },
            delGroupUser(){
                let arr=[]
                for(let i in this.delGroupUserList){
                    if(this.delGroupUserList[i].isSelect){
                        arr.push(this.delGroupUserList[i].idCode)
                    }
                }
                if(arr.length>0){
                    groupDelete(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,arr).then(res=>{
                        console.log('删除群成员',res)
                        if(res.code==0){
                            this.status=0
                            window.location.reload();
                        }
                    })
                }
            },

            agreed(item){
                groupJoinAgree(this.userInfo.userName,this.token,this.chatInfo.groupIdCode,item.idCode).then(res=>{
                    console.log('同意进群',res)
                    if(res.code==0){
                        this.status=0
                        window.location.reload();
                    }
                })
            },
            back(n){
                for(let i in this.info.groupUserCtoModels){
                    this.info.groupUserCtoModels[i]['isSelect']=false
                }
                this.status=n
            },
            goUserInfo(item){
                this.CHATSTATUS('5')
                this.CHATINFO(item)
            },
            onStick3(){
                if(this.stick3){
                    //添加置顶
                    var arr1=[]
                    arr1.push(this.chatInfo)
                    var arr2=[]
                    arr2=[...arr1,...this.topList]
                    this.TOPLIST(arr2)
                    var list4 = duplicateRemoval(this.messageList,this.topList)
                    this.MESSAGELIST([...this.topList,...list4])
                    setTimeout(()=>{
                        this.ISCHATINFODES(false)
                    },100)

                }else{
                    // 取消置顶
                    var arr=[]
                    for(let i in this.topList){
                        if(this.topList[i].groupIdCode!=this.chatInfo.groupIdCode){
                            arr.push(this.topList[i])
                        }
                    }
                    this.TOPLIST(arr)


                    var list3 = sortKey(this.messageList,'lastTime')
                    //去重
                    var list4 = duplicateRemoval(list3,this.topList)
                    this.MESSAGELIST([...this.topList,...list4])
                    setTimeout(()=>{
                        this.ISCHATINFODES(false)
                    },100)
                }
            },
            showMore(){
                this.isMore=false
                this.isLess=true
            },
            showLess(){
                this.isMore=true
                this.isLess=false
            }
        },

    }
</script>

<style lang="scss" scoped>
    .group-info,.group-manage{
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        .top{
            height: 3.9vw;
            min-height: 62.5px;
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            box-sizing: border-box;
            padding: 0 15px;
        }
        .box{
            width: 100%;
            height: calc(39vw - 55px);
            min-height: 500px;
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
            /*border: 1px solid red;*/
            box-sizing: border-box;
            .name-label{
                color: #888888;
                font-size: 16px;
                box-sizing: border-box;
                padding: 0 15px;
                width: 100%;
            }
            .manage{
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                height: 40px;
                .arrow-r{
                    width: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 100%;
                    }
                }
            }
            .apply{
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                .arrow-r{
                    width: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 100%;
                    }

                }
                .badge{
                    position: absolute;
                    right: 30px;
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
            .name{
                width: 100%;
                color: #333333;
                font-size: 14px;
                box-sizing: border-box;
                padding: 0 15px;
            }
            .group-edit{
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .name-name{
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                span{
                    width:16px;
                    display: inline-block;
                    margin-left: 10px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
            }
            .new-group-name{
                height: 40px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                input{
                    border: 1px solid #888;
                    height:20px;
                    line-height: 20px;
                }
            }
            .notice{
                color: #333333;
                max-height: 60px;
                overflow: hidden;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }
            .no-notice{
                color: #333333;
                height: 40px;
                line-height: 40px;
                span{
                    width:16px;
                    display: inline-block;
                    margin-left: 10px;
                    img{
                        width: 100%;
                    }
                }
            }

            .members{
                box-sizing: border-box;
                border-top: 1px solid #E5E5E5;
                padding: 20px 0;
                width: calc(100% - 30px);
                margin: 0 auto;
                .t{
                    color: #888888;
                    font-size: 16px;
                    box-sizing: border-box;
                    padding: 0 15px;
                    width: 100%;
                    margin-bottom: 10px;
                }
                .list-members{
                    ul{
                        /*border: 1px solid red;*/
                        max-height: 140px;
                        height: 140px;
                        /*display: grid;*/
                        /*grid-template-columns: 24% 24% 24% 24%;*/
                        /*grid-template-rows: 50% 50%;*/
                        /*justify-content: center;*/
                        /*align-items: center;*/


                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        width: 100%;

                        li{
                            /*border: 1px solid red;*/
                            margin-bottom: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-wrap: wrap;
                            position: relative;
                            width: 25%;
                            span{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                overflow: hidden;
                                width: 40px;
                                height: 40px;
                                margin-bottom: 5px;
                                border-radius: 5px;
                                img{
                                    width: 100%;
                                }
                            }
                            .user-name{
                                color: #333333;
                                font-size: 12px;
                                overflow: hidden;
                                /*text-overflow: ellipsis;*/
                                white-space: nowrap;
                                box-sizing: border-box;
                                height: 15px;
                                line-height: 15px;
                                width: 100%;
                                text-align: center;
                                /*border: 1px solid red;*/
                            }
                            .role{
                                position: absolute;
                                bottom: 16px;
                                overflow: hidden;
                                border-radius:4px;
                                width: 50px;
                                height: 16px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                white-space :nowrap;
                                font-size: 12px;
                                color: #fff;
                                transform:scale(0.8);
                                z-index: 10;
                                left:5px;
                                -webkit-transform:scale(0.8);
                            }
                            .owner{
                                background: #FF9C31;
                            }
                            .manageTxt{
                                background: #319CFF;
                            }


                        }
                        li:nth-child(1),li:nth-child(2){
                            cursor: pointer;
                        }
                    }
                }
                .list-members-no{
                    overflow: hidden;
                }
                .list-members-more{
                    height: 280px;
                    /*border: 1px solid red;*/
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                .list-members::-webkit-scrollbar {display:none;}

                .more{
                    color: #888888;
                    font-size: 13px;
                    box-sizing: border-box;
                    padding: 0 15px;
                    width: 100%;
                    height: 20px;
                    text-align: right;
                    cursor: pointer;
                    margin-top: 15px;
                    /*display: flex;*/
                    /*align-items: center;*/
                    /*span{*/
                        /*display: block;*/
                        /*width: 12px;*/
                        /*margin-left: 5px;*/
                        /*img{*/
                            /*width: 100%;*/
                        /*}*/
                    /*}*/
                }
            }
        }
        .box::-webkit-scrollbar {display:none}
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
             cursor: pointer;
         }
        .b-r{
            position: absolute;
            right: 15px;
            bottom: 20px;
        }
        .less{
            position: absolute;
            left: 15px;
            bottom: 30px;
            color: #888888;
            font-size: 13px;
            height: 20px;
            line-height: 20px;
            text-align: right;
            cursor: pointer;
            display: flex;
            align-items: center;
            span{
                display: block;
                width: 12px;
                margin-left: 5px;
                transform:rotate(180deg);
                img{
                    width: 100%;
                }
            }
        }
        .stick{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            .t2{
                color: #333333;
                font-size: 16px;
            }
            .l{
                color: #888888;
                font-size: 16px;
            }
        }
        .t3{
            color: #888888;
            font-size: 12px;
        }
        .manage-des{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
            line-height: 1.4;
            margin-bottom: 15px;
        }
        .transfer{
            width: calc(100% - 30px);
            margin: 0 auto;
            box-sizing: border-box;
            height: 60px;
            border-top: 1px solid #E5E5E5;
            border-bottom: 1px solid #E5E5E5;
            font-size: 16px;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content:space-between;
            .arrow-r{
                width: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 100%;
                }
            }

        }
        .administrator{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
            .t3{
                height: 50px;
                line-height: 50px;
                color: #333;
                font-size: 16px;
                width: 100%;
            }
            .ul1{
                .li1{
                    color: #888888;
                    font-size: 12px;
                    margin-bottom: 6px;
                }
            }
            .list2{
                width:100%;
                box-sizing: border-box;
                height: 17vw;
                min-height: 220px;
                overflow-x: hidden;
                overflow-y: auto;
                padding-top: 20px;
                /*border: 1px solid red;*/
                .ul2{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    width: 100%;
                    .li2{
                        /*border: 1px solid red;*/
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-wrap: wrap;
                        position: relative;
                        width: 25%;
                        span{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            overflow: hidden;
                            width: 40px;
                            height: 40px;
                            margin-bottom: 5px;
                            border-radius: 5px;
                            img{
                                width: 100%;
                            }
                        }
                        .user-name{
                            color: #333333;
                            font-size: 12px;
                            overflow: hidden;
                            /*text-overflow: ellipsis;*/
                            white-space: nowrap;
                            box-sizing: border-box;
                            height: 15px;
                            line-height: 15px;
                            width: 100%;
                            text-align: center;
                            /*border: 1px solid red;*/
                        }
                        .role{
                            position: absolute;
                            bottom: 16px;
                            overflow: hidden;
                            border-radius:4px;
                            width: 50px;
                            height: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            white-space :nowrap;
                            font-size: 12px;
                            color: #fff;
                            transform:scale(0.8);
                            -webkit-transform:scale(0.8);
                        }
                        .owner{
                            background: #FF9C31;
                        }
                        .manageTxt{
                            background: #319CFF;
                        }


                    }
                    .li2:nth-child(1),li:nth-child(2){
                        cursor: pointer;
                    }
                }
            }
            .list2::-webkit-scrollbar {display:none;}
        }
    }
    .add-group-user,.delete-group-user,.new-group-user-apply,
    .group-set-holder,.add-group-holder,.del-group-holder{
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        .top{
            height: 3.9vw;
            min-height: 62.5px;
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            box-sizing: border-box;
            padding: 0 15px;
            justify-content: space-between;
        }
        .search{
            width: calc(100% - 30px);
            box-sizing: border-box;
            margin: 0 auto;
            input{
                box-sizing: border-box;
                width: 100%;
                height: 30px;
                background: #EDEDED;
                border-radius: 6px;
                font-size: 14px;
                color: #333;
                padding: 0 10px;
            }
            ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                color:   #888888;
                text-align: center;
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color:   #888888;
                text-align: center;
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color:   #888888;
                text-align: center;
            }
            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color:   #888888;
                text-align: center;
            }
        }
        .list{
            width: calc(100% - 30px);
            margin: 0 auto;
            box-sizing: border-box;
            height: 29.25vw;
            min-height: 468.75px;
            overflow-x: hidden;
            overflow-y: auto;
            ul{
                li{
                    width: 100%;
                    height: 60px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    .info{
                        display: flex;
                        align-items: center;
                        flex: auto;
                        overflow: hidden;
                        span{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 40px;
                            height: 40px;
                            overflow: hidden;
                            margin-right: 8px;
                            border-radius: 6px;
                            img{
                                width: 100%;
                            }
                        }
                        .name{
                            color: #333333;
                            font-size: 14px;
                            font-weight: 600;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .radio-select{
                        min-width: 60px;
                        height: 60px;
                        overflow: hidden;
                        flex: 0 0 60px;
                        display: flex;
                        align-items: center;
                        flex-direction: row-reverse;
                        /*border: 1px solid red;*/
                        span{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 26px;
                            img{
                                width: 100%;
                            }
                        }
                        .btn-agreed{
                            width: 42px;
                            height: 20px;
                            line-height: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 1px solid #003680;
                            border-radius: 6px;
                            color: #003680;
                            font-size: 12px;
                            cursor: pointer;
                        }

                    }
                }
            }
        }
        .list::-webkit-scrollbar {display:none;}
        .btn-box{
            position: absolute;
            bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width:calc(100% - 30px);
            left: 15px;
            .btn-holder{
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
            .btn-return{
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
</style>