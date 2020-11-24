import {USERNAME,TOKEN} from "./mutation-types";

export default {
    [USERNAME](state, userName) {
        state.userName= userName;
    },
    [TOKEN](state, token) {
        state.token= token;
    },
}


