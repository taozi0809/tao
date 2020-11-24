const state={
    token:'',
    account:'',
    userInfo:{},//用户信息
    nav:0, //0->显示消息列表 1->显示好友列表
    status:0,//0->初始化界面 1->钱包界面 2->创建群聊
    isUserInfoMenu:false,//是否显示用户信息
    friendRelationApplys:[],//好友申请列表
    messageList:[],//消息列表
    friendList:[],//好友列表
    friendMarkList:[],//星标好友列表
    groupList:[],//群列表
    chatStatus:0,//0->默认空白 1->好友聊天 2->群聊 3->联系人 4->新的朋友  5->星标&联系人聊天&陌生人
    chatInfo:{},//聊天对象
    chatInfoIndex:-1,//聊天对象在消息列表里的index
    isChatInfoDes:false,//是否显示聊天对象详情
    popover:0,//全局弹出框 0->隐藏 1->用户信息 2->群公告 3->创建群聊 4->群二维码 5->添加好友 6->红包DOING 7->红包TAKEN
    // 8->红包OVERTIME 9->红包OVER 10->红包details 11->私聊发红包 12->群聊发送包 13->群聊发指定人红包 14->搜索
    packetInfo:{},//红包详情
    topList:[],//消息列表置顶列表

}

export default state