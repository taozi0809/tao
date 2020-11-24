import {SG_TOKEN,ISCOLLAPSE,GAMENAME} from "./type";


export default {
    // 记录用户信息
    [SG_TOKEN](state, sg_token) {
        state.sg_token = sg_token;
    },
    //记录aside 展开/收起
    [ISCOLLAPSE](state, isCollapse) {
        state.isCollapse = isCollapse;
    },
    //记录后台名称 财神麻将/快约麻将
    [GAMENAME](state, gameName) {
        state.gameName = gameName;
    },

}


