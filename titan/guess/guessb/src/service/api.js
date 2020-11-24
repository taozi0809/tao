import {YXB} from "../assets/js/YXB";
import fetch from '../assets/js/fetch'

// 1.钱包中的资产列表
export const coin_balance_list = (userName,token) => fetch({
    method:'youxibi.coin.balance.list',
    data:{
        userName,
        token
    }
},YXB.url.coin+'/client.do')


// 2.比赛赔率信息
export const football_match_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.odds',
    data:{
        matchId
    }
})

// 3.足球赛事投注
export const football_bet = (matchId,userName,token,coinName,moneyCode,sum,type,info) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet',
    data:{
        matchId,userName,token,coinName,moneyCode,sum,type,info
    }
})

// 4.全部投注列表
export const football_bet_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.list',
    data:{
        userName,token,page,pageSize
    }
})

// 5.待开奖的投注列表
export const football_bet_wait_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.wait.list',
    data:{
        userName,token,page,pageSize
    }
})

// 6.中奖的投注列表
export const football_bet_win_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.win.list',
    data:{
        userName,token,page,pageSize
    }
})


// 7.比赛日期列表（spocosy数据）
export const football_match_time_list = () => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.time.list',
    data:{}
})
// 8.查询联赛列表（spocosy数据）
export const football_match_tournament_list= () => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.tournament.list',
    data:{}
})

// 9.通过时间查找比赛（spocosy数据）
export const football_match_list_by_time= (date,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.list.by.time',
    data:{
        date,
        page,
        pageSize
    }
})

// 10.通过联赛查找比赛（spocosy数据）
export const football_match_list_by_tournament= (tournamentId,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.list.by.tournament',
    data:{
        tournamentId,
        page,
        pageSize
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

// 18.根据条件查询比赛
export const football_all_or_league_ids_start_mactch = (type,leagueIds,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.football.all.or.league.ids_start.mactch',
    data:{
        type,
        leagueIds,
        page,
        pageSize
    }
})

// 19.查询所有联赛即将开始的场数
export const football_all_match_list = () => fetch({
    method:'shenzhouxing.quiz.football.all.match.list',
    data:{}
})

// 20.最近结束的比赛
export const football_recent_finished_mactch = (page,pageSize) => fetch({
    method:'shenzhouxing.quiz.football.recent.finished.mactch',
    data:{
        page,pageSize
    }
})