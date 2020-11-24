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
export const football_bet = (matchId,userName,token,coinName,moneyCode,sum,type,info,pid) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet',
    data:{
        matchId,userName,token,coinName,moneyCode,sum,type,info,pid
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
    method:'shenzhouxing.quiz.football.all.or.leagueId.match',
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

// 21.取消或中断的比赛
export const football_cancel_match = (page,pageSize) => fetch({
    method:'shenzhouxing.quiz.football.cancel.match',
    data:{
        page,pageSize
    }
})

// 22.文章详情
export const article_details = (articleId) => fetch({
    method:'youxibi.chat.article.details',
    data:{
        articleId
    }
},YXB.url.coin+'/client.do')


//23.串关
export const football_ms_bet = (userName,token,coinName,moneyCode,sum,type,multiple,baseBetMoney,multipleSelectionTypeList,matchIdAndInfos) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.ms.bet',
    data:{userName,token,coinName,moneyCode,sum,type,multiple,baseBetMoney,multipleSelectionTypeList,matchIdAndInfos}
},YXB.url.jc+'/client.do')

//23.串关赔率
export const football_match_ms_list_by_time = (date,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.ms.list.by.time',
    data:{date,page,pageSize}
},YXB.url.jc+'/client.do')

//24.串关下注查询
export const football_bet_ms_list = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.bet.ms.list',
    data:{userName,token,page,pageSize}
},YXB.url.jc+'/client.do')

//25.让分赔率查询
export const football_match_ah_odd = (matchId) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.ah.odd',
    data:{matchId}
},YXB.url.jc+'/client.do')

//26.大小分赔率查询
export const football_match_ou_odd = (matchId) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.ou.odd',
    data:{matchId}
},YXB.url.jc+'/client.do')

//27.半全场赔率查询
export const football_match_ht_odd = (matchId,homeId,guestId) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.match.ht.odd',
    data:{matchId,homeId,guestId}
},YXB.url.jc+'/client.do')


//28.大小分下注
export const football_ah_ou_bet_dparam = (matchId,userName,token,coinName,moneyCode,sum,info,type,dparam,pid) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.ah.ou.bet',
    data:{matchId,userName,token,coinName,moneyCode,sum,info,type,dparam,pid}
},YXB.url.jc+'/client.do')

//29.让分下注
export const football_ah_ou_bet_number = (matchId,userName,token,coinName,moneyCode,sum,info,type,number,dparam,pid) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.ah.ou.bet',
    data:{matchId,userName,token,coinName,moneyCode,sum,info,type,number,dparam,pid}
},YXB.url.jc+'/client.do')

//30.半全场下注
export const football_hft_bet = (matchId,userName,token,coinName,moneyCode,sum,info,type,iparam,iparam2,subtype,pid) => fetch({
    method:'shenzhouxing.quiz.spocosy.football.hft.bet',
    data:{matchId,userName,token,coinName,moneyCode,sum,info,type,iparam,iparam2,subtype,pid}
},YXB.url.jc+'/client.do')

//17.亚盘/让分 赔率
export const football_match_ah_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.ah.odds',
    data:{
        matchId
    }
})
//18.大小 赔率
export const football_match_ou_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.football.match.ou.odds',
    data:{
        matchId
    }
})

//19.滚球投注展示
export const betAllList = (userName,token,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.football.roll.bet.all.list',
    data:{
        userName,token,page,pageSize
    }
})


//19.每场比赛限额
export const betMinValue = (ids) => fetch({
    method:'spocosy.football.match.bet.min.value',
    data:{ids}
})


/*
* 篮球接口
* */

// 23.比赛日期列表（spocosy数据）
export const basketball_match_time_list = () => fetch({
    method:'shenzhouxing.quiz.spocosy.baskettball.match.time.list',
    data:{}
},YXB.url.lqjc+'/client.do')

// 24.查询联赛列表（spocosy数据）
export const basketball_match_tournament_list = () => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.match.tournament.list',
    data:{}
},YXB.url.lqjc+'/client.do')

// 25.通过联赛查找比赛（spocosy数据）
export const basketball_match_list_by_tournament = (tournamentId,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.match.list.by.tournament',
    data:{tournamentId,page,pageSize}
},YXB.url.lqjc+'/client.do')

// 26.通过时间查找比赛（spocosy数据）
export const basketball_match_list_by_time = (date,page,pageSize) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.match.list.by.time',
    data:{date,page,pageSize}
},YXB.url.lqjc+'/client.do')

// 27.比赛赔率信息
export const basketball_match_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.match.odds',
    data:{matchId}
},YXB.url.lqjc+'/client.do')

// 28.篮球投注
export const basketball_bet = (matchId,userName,token,coinName,moneyCode,sum,type,dparam,info,number,pid) => fetch({
    method:'shenzhouxing.quiz.spocosy.basketball.bet',
    data:{matchId,userName,token,coinName,moneyCode,sum,type,dparam,info,number,pid}
},YXB.url.lqjc+'/client.do')

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

// 31.可购买比赛预测分析的货币列表
export const quiz_prediction_pay_coin = () => fetch({
    method:'shenzhouxing.quiz.prediction.pay.coin',
    data:{}
},YXB.url.lqjc+'/client.do')

//32.大小分赔率列表
export const basketball_match_ou_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.basketball.match.ou.odds',
    data:{matchId}
},YXB.url.lqjc+'/client.do')

//33.让分赔率列表
export const basketball_match_ah_odds = (matchId) => fetch({
    method:'shenzhouxing.quiz.basketball.match.ah.odds',
    data:{matchId}
},YXB.url.lqjc+'/client.do')

//34.取消或中断的比赛
export const basketball_cancel_match = (page,pageSize) => fetch({
    method:'shenzhouxing.quiz.basketball.cancel.match',
    data:{page,pageSize}
},YXB.url.lqjc+'/client.do')

//35.联赛有多少场正在进行时或者将要开始的比赛
export const basketball_match_count = (page,pageSize) => fetch({
    method:'shenzhouxing.quiz.basketball.match.count',
    data:{page,pageSize}
},YXB.url.lqjc+'/client.do')

//36.完场的比赛
export const basketball_finished_match = (page,pageSize) => fetch({
    method:'shenzhouxing.quiz.basketball.finished.match',
    data:{page,pageSize}
},YXB.url.lqjc+'/client.do')

//37.即时的比赛
export const basketball_all_or_leagueId_match_im = (page,pageSize,type) => fetch({
    method:'shenzhouxing.quiz.basketball.all.or.leagueId.match',
    data:{page,pageSize,type}
},YXB.url.lqjc+'/client.do')

//38.根据联赛名字查找比赛
export const basketball_all_or_leagueId_match_name = (page,pageSize,type,leagueIds) => fetch({
    method:'shenzhouxing.quiz.basketball.all.or.leagueId.match',
    data:{page,pageSize,type,leagueIds}
},YXB.url.lqjc+'/client.do')






/*
* h5 邀请注册体坛
* */

// 1.注册
export const link_register_with_link = (identify,captcha,phoneNumber,password,inviteCode) => fetch({
    method:'shenzhouxing.link.register.with.link',
    data:{identify,captcha,phoneNumber,password,inviteCode}
},YXB.url.titanRegister+'/client.do')
// 2.获取验证码
export const sms_send_captcha = (contentCode,key,phoneNumber) => fetch({
    method:'youxibi.sms.send.captcha',
    data:{contentCode,key,phoneNumber}
},YXB.url.coin+'/client.do')
// 3.获取key
export const user_identify = () => fetch({
    method:'youxibi.user.identify',
    data:{}
},YXB.url.coin+'/client.do')



