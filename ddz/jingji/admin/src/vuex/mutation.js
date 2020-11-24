import {TOKEN,ISCOLLAPSE,AGENTTYPE,AGENTTYPES,PAGES} from "./type";


export default {
    // 记录用户信息
    [TOKEN](state, token) {
        state.token = token;
    },
    //记录aside 展开/收起
    [ISCOLLAPSE](state, isCollapse) {
        state.isCollapse = isCollapse;
    },
    //账号权重信息
    [AGENTTYPE](state, agentType) {
        state.agentType = agentType;
    },
    [AGENTTYPES](state, agentTypes) {
        state.agentTypes = agentTypes;
    },
    //aside 列表
    [PAGES](state, pages) {
        state.pages= pages;
    },

}


