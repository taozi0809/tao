import {START,LOGININFO,PRIZETYPE} from "./types";


export default {
    // 开始页
    [START](state, start) {
        state.start = start
    },
    // 奖项
    [PRIZETYPE](state, prizeType) {
        state.prizeType = prizeType
    },
    // 登录后信息
    [LOGININFO](state, loginInfo) {
        state.loginInfo = loginInfo
    },
}


