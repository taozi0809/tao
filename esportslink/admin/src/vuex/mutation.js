import {TOKEN,ISCOLLAPSE,
FIGHTFIRSTNUM,FIGHTSECONDNUM,FIGHTTHIRDNUM,FIGHTFOURTHNUM,FIGHTFIRSTBNUM} from "./types";


export default {
    // 记录用户信息
    [TOKEN](state, token) {
        state.token = token
    },
    //记录aside 展开/收起
    [ISCOLLAPSE](state, isCollapse) {
        state.isCollapse = isCollapse
    },



    //约战管理 /待处理/待结算/已完成/申诉 数量
    [FIGHTFIRSTNUM](state, fightFirstNum) {
        state.fightFirstNum = fightFirstNum
    },
    [FIGHTFIRSTBNUM](state, fightFirstbNum) {
        state.fightFirstbNum = fightFirstbNum
    },
    [FIGHTSECONDNUM](state, fightSecondNum) {
        state.fightSecondNum = fightSecondNum
    },
    [FIGHTTHIRDNUM](state, fightThirdNum) {
        state.fightThirdNum = fightThirdNum
    },
    [FIGHTFOURTHNUM](state, fightFourthNum) {
        state.fightFourthNum = fightFourthNum
    },

}


