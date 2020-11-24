import {baseUrl} from "../data/base";
import {post} from "./axios";

/*登录*/
export const userLogin=(userName,password) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.admin.user.login',
    data:{userName,password}
})

/*查询联赛列表*/
export const leagueList=(shortName,status,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.league.list',
    data:{shortName,status,pageNum,pageSize}
})

/*赛事列表  type 0->今日  1->赛前  2->滚球  3->赛果  */
export const matchList=(type,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.match.list',
    data:{type,pageNum,pageSize}
})
/*查询比赛数据统计*/
export const matchStats=() => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.match.stats',
    data:{}
})
/*查询比赛详情*/
export const matchDetails=(matchId) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.match.details',
    data:{matchId}
})

/*查询竞猜列表*/
export const rollingList=(matchId,boardNum,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.rolling.list',
    data:{matchId,boardNum,pageNum,pageSize}
})

/*查询用户注单列表*/
export const recordList=(userId,status,result,quizType,betType,matchId,betId,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.quiz.record.list',
    data:{userId,status,result,quizType,betType,matchId,betId,pageNum,pageSize}
})

/*手动修改注单胜负  0->赢  1->输  2->异常  3->已取消*/
export const manualResult=(id,result) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.quiz.record.manual.result',
    data:{id,result}
})

/*批量封盘 betIds:竞猜id拼接字段，逗号隔开 */
export const batchSeal=(betIds,matchId) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.rolling.batch.seal',
    data:{betIds,matchId}
})

/*修改滚球信息*/
export const rollingUpdate=(betId,teamaOdds,teambOdds,title,side) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.rolling.update',
    data:{betId,teamaOdds,teambOdds,title,side}
})

/*查询用户擂台列表*/
export const platformList=(status,result,gameName,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.platform.list',
    data:{status,result,gameName,pageNum,pageSize}
})

/*查看对战详情*/
export const platformDetails=(id) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.platform.details',
    data:{id}
})

/*判定对战胜负*/
export const platformDetermine=(id,result,resultType) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.platform.determine',
    data:{id,result,resultType}
})

/*判定对局胜负*/
export const resultDetermine=(board,platformId,side) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.platform.result.determine',
    data:{board,platformId,side}
})

/*用户申诉列表*/
export const appealList=(userId,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.appeal.list',
    data:{userId,pageNum,pageSize}
})

/*用户申诉详情*/
export const appealDetails=(userId,pageNum,pageSize) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.user.appeal.details',
    data:{userId,pageNum,pageSize}
})

/*查询公告列表*/
export const announceList=(pageNum,pageSize,type) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.announce.list',
    data:{pageNum,pageSize,type}
})

/*新增公告*/
export const announceAdd=(title,content,type) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.announce.add',
    data:{title,content,type}
})

/*修改公告*/
export const announceUpdate=(title,content,type,enable_,id) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.announce.update',
    data:{title,content,type,enable_,id}
})

/*删除公告*/
export const announceDelete=(id) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.announce.delete',
    data:{id}
})

/*修改游戏显示状态*/
export const gameUpdate=(id,enable_) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.game.update',
    data:{id,enable_}
})

/*查询游戏列表*/
export const gameList=(gameName,gameEn,enable_) => post(`${baseUrl.admin}/admin.do`,{
    method:'gaming.game.list',
    data:{gameName,gameEn,enable_}
})

