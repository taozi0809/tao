import {MIXING_TOKEN,ISCOLLAPSE,GAMENAME} from "./type";


export default {
    //记录TOKEN
    [MIXING_TOKEN](state, mixing_token) {
        state.mixing_token = mixing_token;
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


