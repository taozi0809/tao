import {TOKEN,ISCOLLAPSE,MANAGEINFO,MANAGEMENULIST} from "./types";


export default {
    // 记录管理员token
    [TOKEN](state, token) {
        state.token = token;
    },
    // 记录管理员信息
    [MANAGEINFO](state, manageInfo) {
        state.manageInfo = manageInfo;
    },
    //记录aside 展开/收起
    [ISCOLLAPSE](state, isCollapse) {
        state.isCollapse = isCollapse;
    },

    [MANAGEMENULIST](state, manageMenuList) {
        state.manageMenuList = manageMenuList;
    },


}


