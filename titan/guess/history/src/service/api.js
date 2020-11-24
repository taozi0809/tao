import {YXB} from "../assets/js/YXB";
import fetch from '../assets/js/fetch'

//钱包中的资产列表
export const coin_balance_list = (userName,token) => fetch({
    method:'youxibi.coin.balance.list',
    data:{
        userName,
        token
    }
},YXB.url.coin+'/client.do')


// 比赛赔率信息
export const football_match_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.odds',
    data:{
        matchId
    }
})

// 足球赛事投注
export const football_bet = (matchId,userName,token,coinName,moneyCode,sum,type,info) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet',
    data:{
        matchId,userName,token,coinName,moneyCode,sum,type,info
    }
})

//全部投注列表
export const football_bet_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.list',
    data:{
        userName,token,page,pageSize
    }
})

// 待开奖的投注列表
export const football_bet_wait_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.wait.list',
    data:{
        userName,token,page,pageSize
    }
})

// 中奖的投注列表
export const football_bet_win_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.win.list',
    data:{
        userName,token,page,pageSize
    }
})


// 比赛日期列表（spocosy数据）
export const football_match_time_list = () => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.time.list',
    data:{}
})
//查询联赛列表（spocosy数据）
export const football_match_tournament_list= () => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.tournament.list',
    data:{}
})

//通过时间查找比赛（spocosy数据）
export const football_match_list_by_time= (date,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.list.by.time',
    data:{
        date,
        page,
        pageSize
    }
})

//通过联赛查找比赛（spocosy数据）
export const football_match_list_by_tournament= (tournamentId,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.list.by.tournament',
    data:{
        tournamentId,
        page,
        pageSize
    }
})

//用户创建的比赛预测分析
export const userPrediction= (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.user.prediction',
    data:{
        userName,token,page,pageSize
    }
})

//已购买的比赛预测分析
export const quizPurchasedPrediction = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.purchased.prediction',
    data:{
        userName,token,page,pageSize
    }
})
//已购买的比赛预测分析（命中）
export const hitPurchasedPrediction = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.hit.purchased.prediction',
    data:{
        userName,token,page,pageSize
    }
})
//比赛预测分析详情
export const quizPredictionDetails = (userName,token,predictionId) => fetch({
    method:'shenzhouxing.quiz.prediction.details',
    data:{
        userName,token,predictionId
    }
})

// 11.比赛的队伍阵容
export const football_match_lineup = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.lineup',
    data:{
        matchId
    }
})

// 12.比赛实况
export const football_match_incident = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.incident',
    data:{
        matchId
    }
})

// 13.队伍最近的比赛
export const team_match_history = (currentMatchId,teamId,type) => fetch({
    method:'shenzhouxing.quiz.team.match.history',
    data:{
        currentMatchId,
        teamId,
        type
    }
})

// 14.两支队伍最近的比赛
export const two_team_match_history = (currentMatchId,teamId1,teamId2,type) => fetch({
    method:'shenzhouxing.quiz.two.team.match.history',
    data:{
        currentMatchId,
        teamId1,
        teamId2,
        type
    }
})

// 15.比赛文字直播
export const football_match_text_live = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.text.live',
    data:{
        matchId
    }
})

// 16.欧洲赔率
export const football_match_european_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.european.odds',
    data:{
        matchId
    }
})

// 17.比赛详情（比分、状态等信息）
export const football_match_details = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.details',
    data:{
        matchId
    }
})

// 17.查询全部比赛
export const football_all_match = () => fetch({
    method:'shenzhouxing.quiz.football.all.match',
    data:{}
})

//24.串关下注查询
export const football_bet_ms_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.ms.list',
    data:{userName,token,page,pageSize}
},YXB.url.jc+'/client.do')

//19.滚球投注展示
export const betAllList = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.football.roll.bet.all.list',
    data:{
        userName,token,page,pageSize
    }
})


/*
* 篮球
* */


// 29.全部投注列表
export const basketball_bet_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.bet.list',
    data:{userName,token,page,pageSize}
},YXB.url.lqjc+'/client.do')

// 30.中奖的投注列表
export const basketball_bet_win_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.bet.win.list',
    data:{userName,token,page,pageSize}
},YXB.url.lqjc+'/client.do')

// 30.待开奖的投注列表
export const basketball_bet_wait_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.bet.wait.list',
    data:{userName,token,page,pageSize}
},YXB.url.lqjc+'/client.do')
