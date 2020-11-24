import {MESSAGE,GUESSACTIVE,GUESSTIMELIST,GUESSTOURNAMENTLIST,GUESSACTIVEDATALIST,
    GUESSACTIVEINDEX,BETINFO,ISBETINFO,GUESSINPUTDATA,USERNAME,TOKEN,GAMEDETAILS,
    ALLSCORE,GUESSSCORE,BEIDGSSCORE,FOOTBALLSCORE,ISCOMPETITION,COMPETITION, ISMENU,
    COMPETITIONFILTRATE,COMPETITIONFILTRATEIDARR,GUESSTIMELISTBASKETBALL,GUESSTOURNAMENTLISTBASKETBALL,
    GUESSACTIVEBASKETBALL,GUESSACTIVEINDEXBASKETBAL,GUESSACTIVEDATALISTBASKETBALL,BETINFOBASKETBALL,
    ISBETINPUTBASKETBALL,GUESSINPUTDATABASKETBALL,ISBETRELATED,REQUESTED,MULTIPLESELECTIONTYPE,
    MATCHIDANDINFOS,BETRELATEDRANDOM,
} from "./mutation-types";

export default {
    [MESSAGE](state, message) {
        state.message = message;
    },
    [GUESSACTIVE](state, guessActive) {
        state.guessActive = guessActive;
    },
    [GUESSACTIVEINDEX](state, guessActiveIndex) {
        state.guessActiveIndex = guessActiveIndex;
    },
    [GUESSACTIVEDATALIST](state, guessActiveDataList) {
        state.guessActiveDataList = guessActiveDataList;
    },
    [GUESSTIMELIST](state, guessTimeList) {
        state.guessTimeList = guessTimeList;
    },
    [GUESSTOURNAMENTLIST](state, guessTournamentList) {
        state.guessTournamentList = guessTournamentList;
    },
    [BETINFO](state, betInfo) {
        state.betInfo= betInfo;
    },
    [ISBETINFO](state, isBetInput) {
        state.isBetInput= isBetInput;
    },
    [GUESSINPUTDATA](state, guessInputData) {
        state.guessInputData= guessInputData;
    },
    [USERNAME](state, userName) {
        state.userName= userName;
    },
    [TOKEN](state, token) {
        state.token= token;
    },
    [GAMEDETAILS](state, gameDetails) {
        state.gameDetails = gameDetails;
    },
    [ALLSCORE](state, allScore) {
        state.allScore = allScore;
    },

    [GUESSSCORE](state, guessScore) {
        state.guessScore = guessScore;
    },

    [BEIDGSSCORE](state, beidgsScore) {
        state.beidgsScore = beidgsScore;
    },

    [FOOTBALLSCORE](state, footballScore) {
        state.footballScore = footballScore;
    },

    [ISCOMPETITION](state, isCompetition) {
        state.isCompetition = isCompetition;
    },

    [COMPETITION](state, competition) {
        state.competition = competition;
    },

    [ISMENU](state, isMenu) {
        state.isMenu = isMenu;
    },

    [COMPETITIONFILTRATE](state, competitionFiltrate) {
        state.competitionFiltrate = competitionFiltrate;
    },

    [COMPETITIONFILTRATEIDARR](state, competitionFiltrateIdArr) {
        state.competitionFiltrateIdArr = competitionFiltrateIdArr;
    },

    [GUESSTIMELISTBASKETBALL](state, guessTimeListBasketball) {
        state.guessTimeListBasketball = guessTimeListBasketball;
    },

    [GUESSTOURNAMENTLISTBASKETBALL](state, guessTournamentListBasketball) {
        state.guessTournamentListBasketball = guessTournamentListBasketball;
    },

    [GUESSACTIVEBASKETBALL](state, guessActiveBasketball) {
        state.guessActiveBasketball = guessActiveBasketball;
    },

    [GUESSACTIVEINDEXBASKETBAL](state, guessActiveIndexBasketball) {
        state.guessActiveIndexBasketball = guessActiveIndexBasketball;
    },

    [GUESSACTIVEDATALISTBASKETBALL](state, guessActiveDataListBasketball) {
        state.guessActiveDataListBasketball = guessActiveDataListBasketball;
    },

    [BETINFOBASKETBALL](state, betInfoBasketball) {
        state.betInfoBasketball = betInfoBasketball;
    },

    [ISBETINPUTBASKETBALL](state, isBetInputBasketball) {
        state.isBetInputBasketball = isBetInputBasketball;
    },

    [GUESSINPUTDATABASKETBALL](state, guessInputDataBasketball) {
        state.guessInputDataBasketball = guessInputDataBasketball;
    },

    [ISBETRELATED](state, isBetRelated) {
        state.isBetRelated = isBetRelated;
    },

    [REQUESTED](state, requestEd) {
        state.requestEd = requestEd;
    },

    [MATCHIDANDINFOS](state, matchIdAndInfos) {
        state.matchIdAndInfos = matchIdAndInfos;
    },

    [BETRELATEDRANDOM](state, betRelatedRandom) {
        state.betRelatedRandom = betRelatedRandom;
    },


}


