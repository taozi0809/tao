import {LANG,ISLOGIN,USERISVIP,LOGINTYPE,USERINFO,LANGLIST,VIDEOGENRELIST,COUNTRY,STARTLOAD,
    SEARCH,

} from "./mutation-types";



export default {
    [LANG](state, lang) {
        state.lang = lang;
    },

    [ISLOGIN](state, isLogin) {
        state.isLogin = isLogin;
    },

    [LOGINTYPE](state, loginType) {
        state.loginType = loginType;
    },

    [USERINFO](state, userInfo) {
        state.userInfo = userInfo;
    },

    [LANGLIST](state, langList) {
        state.langList = langList;
    },

    [VIDEOGENRELIST](state, videoGenreList) {
        state.videoGenreList = videoGenreList;
    },

    [COUNTRY](state, country) {
        state.country = country;
    },

    [STARTLOAD](state, startLoad) {
        state.startLoad = startLoad;
    },

    [SEARCH](state, search) {
        state.search = search;
    },

}


