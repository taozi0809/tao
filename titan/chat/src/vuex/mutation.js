import {TOKEN,USERINFO,ACCOUNT,NAV,STATUS,ISUSERINFOMENU,FRIENDRELATIONAPPLYS,MESSAGELIST,
    FRIENDLIST,FRIENDMARKLIST,GROUPLIST,CHATSTATUS,CHATINFO,ISCHATINFODES,CHATINFOINDEX,
    POPOVER,PACKETINFO,ISASIDESEARCH,TOPLIST,


} from "./types";


export default {
    // 记录用户信息
    [TOKEN](state, token) {
        state.token = token;
    },
    [USERINFO](state, userInfo) {
        state.userInfo = userInfo;
    },
    //账号
    [ACCOUNT](state, account) {
        state.account = account;
    },
    //显示消息&好友
    [NAV](state, nav) {
        state.nav = nav;
    },
    //显示消息&钱包
    [STATUS](state, status) {
        state.status = status;
    },
    //显示设置
    [ISUSERINFOMENU](state, isUserInfoMenu) {
        state.isUserInfoMenu = isUserInfoMenu;
    },
    //好友申请列表
    [FRIENDRELATIONAPPLYS](state, friendRelationApplys) {
        state.friendRelationApplys = friendRelationApplys;
    },
    //消息列表
    [MESSAGELIST](state, messageList) {
        state.messageList = messageList;
    },
    //好友列表
    [FRIENDLIST](state, friendList) {
        state.friendList = friendList;
    },
    //星标好友列表
    [FRIENDMARKLIST](state, friendMarkList) {
        state.friendMarkList = friendMarkList;
    },
    //群列表
    [GROUPLIST](state, groupList) {
        state.groupList = groupList;
    },
    //聊天状态
    [CHATSTATUS](state, chatStatus) {
        state.chatStatus = chatStatus;
    },
    //聊天对象
    [CHATINFO](state, chatInfo) {
        state.chatInfo = chatInfo;
    },
    //是否显示聊天对象详情
    [ISCHATINFODES](state, isChatInfoDes) {
        state.isChatInfoDes = isChatInfoDes;
    },
    //聊天对象在消息列表里的index
    [CHATINFOINDEX](state, chatInfoIndex) {
        state.chatInfoIndex = chatInfoIndex;
    },
    //全局弹出框
    [POPOVER](state, popover) {
        state.popover = popover;
    },
    //红包详情
    [PACKETINFO](state, packetInfo) {
        state.packetInfo = packetInfo;
    },
    //置顶列表
    [TOPLIST](state,topList) {
        state.topList = topList;
    },
}



