import {baseUrl} from "../data/base";
import {post} from "./axios";

/*获取每个币种的投注详情*/
export const oneyDetail=(startTime,endTime,type) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.match.bet.oney.detail',
    data:{startTime,endTime,type}
})

/*根据时间查询用户活跃数*/
export const betUser=(data) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.match.bet.user',
    data:{data}
})

/*指定时间投注的笔数*/
export const betNum=(startTime,endTime) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.match.bet.num',
    data:{startTime,endTime}
})

/*有直播的地址的数据*/
export const liveMatch=() => post(`${baseUrl.football}/client.do`,{
    method:'shenzhouxing.quiz.live.match',
    data:{}
})

/*运营已经匹配到的直播地址的比赛*/
export const liveAllData=(page,pageSize) => post(`${baseUrl.football}/client.do`,{
    method:'shenzhouxing.quiz.live.all.data',
    data:{page,pageSize}
})

/*我们体坛的大于当前时间的比赛*/
export const initMatchData=(page,pageSize) => post(`${baseUrl.football}/client.do`,{
    method:'shenzhouxing.quiz.live.init.match.data',
    data:{page,pageSize}
})

/*运营根据有直播地址的数据和显示的比赛 进行匹配插入的数据*/
export const liveDataInsert=(matchId,tournamentName,matchTime,homeTeam,guestTeam,url,state) => post(`${baseUrl.football}/client.do`,{
    method:'shenzhouxing.quiz.live.data.insert',
    data:{matchId,tournamentName,matchTime,homeTeam,guestTeam,url,state}
})

/*订单类型*/
export const allCurrType=() => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.all.curr.type',
    data:{}
})
/*刷选*/
export const allLeagueName=() => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.all.league.name',
    data:{}
})
/*详情列表*/
export const matchDetail=(currencyType,leagueId,page,pageSize,queryName) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.match.detail',
    data:{currencyType,leagueId,page,pageSize,queryName}
})
/*锁定*/
export const matchLocak=(matchId,state) => post(`${baseUrl.football}/client.do`,{
    method:'spocosy.football.manger.match.locak',
    data:{matchId,state}
})
/*投注详情*/
export const betDetailId=(matchId,page,pageSize) => post(`${baseUrl.football}/client.do`,{
    method:'spocosy.football.manger.match.bet.detail.id',
    data:{matchId,page,pageSize}
})

/*未转换名字的比赛*/
export const matchNoState=(page,pageSize) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.match.no.state',
    data:{page,pageSize}
})
/*根据名字和数据来源查询名字是否被转换*/
export const matchIsSwitch=(name,providerId) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.match.is.switch',
    data:{name,providerId}
})
/*根据比赛开始时间获得雷达数据的主客队名字*/
export const mangerNameSwitch=(date) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.name.switch',
    data:{date}
})
/*转换名字*/
export const switchUpOrInsert=(providerId,switchName,name) => post(`${baseUrl.football}/client.do`,{
    method:'shengzhouxing.manger.name.switch.up.or.insert',
    data:{providerId,switchName,name}
})
/*删除重复比赛*/
export const deleteRepeat=(id) => post(`${baseUrl.football}/client.do`,{
    method:'spocosy.football.manger.match.delete.repeat',
    data:{id}
})

/*查询*/
export const liveQueryData=(name) => post(`${baseUrl.football}/client.do`,{
    method:'shenzhouxing.quiz.live.query.data',
    data:{name}
})
/*转换名字*/
export const liveInsertSwitchname=(name,id,switchName) => post(`${baseUrl.football}/client.do`,{
    method:'shenzhouxing.quiz.live.insert.switchname',
    data:{name,id,switchName}
})

