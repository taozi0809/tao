import {TOKEN,ISCOLLAPSE,POWER} from "./type";


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
    [POWER](state, power) {
        state.power = power;
    },

}


