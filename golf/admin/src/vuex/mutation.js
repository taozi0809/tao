import {TOKEN,ISCOLLAPSE,CURRENTDATA} from "./type";


export default {
    // 记录用户信息
    [TOKEN](state, token) {
        state.token = token;
    },
    //记录aside 展开/收起
    [ISCOLLAPSE](state, isCollapse) {
        state.isCollapse = isCollapse;
    },
    //记录权限
    [CURRENTDATA](state, currentdata) {
        state.currentdata = currentdata;
    },

}


