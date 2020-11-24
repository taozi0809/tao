import {ISCOLLAPSE,VIDEOBASECTOMODELLIST,POSTERURL,RESOURCEURL,VIDEODETAILS,
    COUNTNUM,FILEID,PREVUEBASECTOMODELLIST,PREVUECOUNTNUM,COVERURL,BACKURL,

} from "./mutation-types";

export default {
    [ISCOLLAPSE](state, isCollapse) {
        state.isCollapse = isCollapse;
    },

    [VIDEOBASECTOMODELLIST](state, videoBaseCtoModelList) {
        state.videoBaseCtoModelList = videoBaseCtoModelList;
    },

    [COUNTNUM](state, countNum) {
        state.countNum = countNum;
    },

    [POSTERURL](state, posterUrl) {
        state.posterUrl = posterUrl;
    },

    [RESOURCEURL](state, resourceUrl) {
        state.resourceUrl = resourceUrl;
    },

    [VIDEODETAILS](state, videoDetails) {
        state.videoDetails = videoDetails;
    },

    [FILEID](state, fileId) {
        state.fileId = fileId;
    },

    [PREVUEBASECTOMODELLIST](state, prevueBaseCtoModelList) {
        state.prevueBaseCtoModelList = prevueBaseCtoModelList;
    },

    [PREVUECOUNTNUM](state, prevueCountNum) {
        state.prevueCountNum = prevueCountNum;
    },

    [COVERURL](state, coverUrl) {
        state.coverUrl = coverUrl
    },

    [BACKURL](state, backUrl) {
        state.backUrl = backUrl
    },



}


