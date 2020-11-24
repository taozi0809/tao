import fetch from '../assets/config/fetch'
import {YXB} from "../assets/config/YXB";


//1.登录
export const login = (userName,password) => fetch({
    method:'vidfish.admin.user.login',
    data:{
        userName,
        password
    }
})

//2.获取用户、电影、电视剧统计结果
export const appStat = () => fetch({
    method:'vidfish.admin.app.stat',
    data:{

    }
})

//3.获取折线图-获取某月所有日期的电影、电视剧播放及下载量接口
export const videoStat = (year,month) => fetch({
    method:'vidfish.admin.video.stat',
    data:{
        year,
        month
    }
})


//4.查询视频基本信息
export const videoBaseList = (typeName,videoName,pageNum,pageSize) => fetch({
    method:'vidfish.video.base.list',
    data:{
        typeName,
        videoName,
        pageNum,
        pageSize,
    }
})

//5.视频信息新增接口
export const videoBaseAdd = (typeName,episode,genreName,posterUrl,frameRate,blackAreaShortName,isShow,isNew,isVip,status,isRecommend,resourceUrl,scores,fileSize,limitLevel,actorIds,total,parentId,fileId,coverPhotoUrl,backPhotoUrl,isWater) => fetch({
    method:'vidfish.video.base.add',
    data:{
        typeName,
        episode,
        genreName,
        posterUrl,
        frameRate,
        blackAreaShortName,
        isShow,
        isNew,
        isVip,
        status,
        isRecommend,
        resourceUrl,
        scores,
        fileSize,
        limitLevel,
        actorIds,
        total,
        parentId,
        fileId,
        coverPhotoUrl,
        backPhotoUrl,
        isWater,
    }
})


//6.修改视频信息接口(电视剧则为批量修改)
export const videoBaseEdit = (typeName,episode,genreName,posterUrl,frameRate,blackAreaShortName,isShow,isNew,isVip,status,isRecommend,resourceUrl,scores,fileSize,limitLevel,actorIds,total,parentId,id,fileId,coverPhotoUrl,backPhotoUrl,itemIds) => fetch({
    method:'vidfish.video.base.edit',
    data:{
        typeName,
        episode,
        genreName,
        posterUrl,
        frameRate,
        blackAreaShortName,
        isShow,
        isNew,
        isVip,
        status,
        isRecommend,
        resourceUrl,
        scores,
        fileSize,
        limitLevel,
        actorIds,
        total,
        parentId,
        id,
        fileId,
        coverPhotoUrl,
        backPhotoUrl,
        itemIds
    }
})
// 7.添加/更新电影详情
export const movieAddUpdate = (videoBaseId,movieName,description,id,lang) => fetch({
    method:'vidfish.admin.movie.add.update',
    data:{
        videoBaseId,
        movieName,
        description,
        id,
        lang
    }
})
//8.删除电影详情信息
export const movieDelete = (id) => fetch({
    method:'vidfish.admin.movie.delete',
    data:{
        id
    }
})

//9.根据视频id查询电影/电视剧详情
export const videoBaseDetails = (id) => fetch({
    method:'vidfish.video.base.details',
    data:{
        id
    }
})

//10.添加/修改电视剧详情内容
export const dramaAddUpdate = (dramaName,description,parentId,id,lang) => fetch({
    method:'vidfish.admin.drama.add.update',
    data:{
        dramaName,
        description,
        parentId,
        id,
        lang
    }
})

//11.删除电视剧详情信息
export const dramaDelete = (id) => fetch({
    method:'vidfish.admin.drama.delete',
    data:{
        id
    }
})

//12.添加/修改演员信息
export const performerAddUpdate = (actorName,actorArea,actorDesc,photoUrl,movieIds,lang,id) => fetch({
    method:'vidfish.admin.performer.add.update',
    data:{
        actorName,
        actorArea,
        actorDesc,
        photoUrl,
        movieIds,
        lang,
        id,
    }
})

//13.查询演员信息列表
export const performerList = (actorName,lang,flag, pageNum, pageSize,) => fetch({
    method:'vidfish.admin.performer.list',
    data:{
        actorName,
        lang,
        flag,
        pageNum,
        pageSize,
    }
})

//14.根据id和语言环境获取演员详情信息
export const performerDetails = (id,lang) => fetch({
    method:'vidfish.admin.performer.details',
    data:{
        id,
        lang
    }
})


//15.根据id删除演员信息
export const performerDelete = (id) => fetch({
    method:'vidfish.admin.performer.delete',
    data:{
        id
    }
})


//16.新增/修改字幕信息
export const subtitleAddUpdate = (videoBaseId,fileUrl,httpsUrl,lang,subtitleName,type,realName) => fetch({
    method:'vidfish.admin.subtitle.add.update',
    data:{
        videoBaseId,
        fileUrl,
        httpsUrl,
        lang,
        subtitleName,
        type,/* 0/null-app, 1-pc*/
        realName,
    }
})

//17.查询字幕信息列表
export const subtitleList = (videoBaseId,lang,) => fetch({
    method:'vidfish.admin.subtitle.list',
    data:{
        videoBaseId,
        lang,
    }
})

//18.根据id删除字幕信息
export const subtitleDelete = (id) => fetch({
    method:'vidfish.admin.subtitle.delete',
    data:{
       id
    }
})

//19.根据id查看字幕详情
export const subtitleDetails = (id,lang) => fetch({
    method:'vidfish.admin.subtitle.details',
    data:{
        id,
        lang
    }
})

//20.新增/修改片花记录信息
export const trailerAddUpdate = (videoBaseId,trailerName,resourceUrl,status,fileSize,frameRate,trailerDesc,id,fileId) => fetch({
    method:'vidfish.admin.trailer.add.update',
    data:{
        videoBaseId,
        trailerName,
        resourceUrl,
        status,
        fileSize,
        frameRate,
        trailerDesc,
        id,
        fileId
    }
})

//21.根据id删除片花记录信息
export const trailerDelete = (id) => fetch({
    method:'vidfish.admin.trailer.delete',
    data:{
        id
    }
})

//22.根据视频id查询片花记录信息
export const trailerList = (videoBaseId) => fetch({
    method:'vidfish.admin.trailer.list',
    data:{
        videoBaseId
    }
})

//23.新增/修改轮播图
export const carouselAddUpdate = (videoBaseId,reactionUrl,posterUrl,sort,type,isShow,id,lang) => fetch({
    method:'vidfish.admin.carousel.add.update',
    data:{
        videoBaseId,
        reactionUrl,
        posterUrl,
        sort,
        type,
        isShow,
        id,
        lang
    }
})

//24.查询轮播图
export const carouselList = (genreName,typeName,videoBaseId,videoName,isShow,lang) => fetch({
    method:'vidfish.admin.carousel.list',
    data:{
        genreName,
        typeName,
        videoBaseId,
        videoName,
        isShow,
        lang
    }
})

//25.根据id删除轮播记录
export const carouselDelete = (id) => fetch({
    method:'vidfish.admin.carousel.delete',
    data:{
        id
    }
})

//26.根据id删除视频
export const videoBaseDelete = (id) => fetch({
    method:'vidfish.video.base.delete',
    data:{
        id
    }
})

//27.新增/修改视频帧率信息
export const framerateAddUpdate = (videoBaseId,resourceUrl,frameRate,fileSize,id,fileId) => fetch({
    method:'vidfish.admin.framerate.add.update',
    data:{
        videoBaseId,
        resourceUrl,
        frameRate,
        fileSize,
        id,
        fileId
    }
})

//28.根据视频id查询视频帧率列表
export const framerateList = (videoBaseId) => fetch({
    method:'vidfish.admin.framerate.list',
    data:{
        videoBaseId
    }
})

//29.根据id删除视频帧率记录
export const framerateDelete = (id) => fetch({
    method:'vidfish.admin.framerate.delete',
    data:{
        id
    }
})

//30.查询视频类型列表
// export const genreList = () => fetch({
//     method:'vidfish.admin.genre.list',
//     data:{}
// })


//31.获取国家列表信息
export const contrynameList = () => fetch({
    method:'vidfish.admin.contryname.list',
    data:{}
})


//32.文件上传接口
// vidfish:subtitle--字幕
// vidfish:photo--图片
// vidfish:carousel--轮播

// vidfish:cover--横向封面
// vidfish:back:photo--背景
// vidfish:poster--海报/封面

export const uploadDo = (code,file) => fetch({
    method:'youxibi.upload.do',
    data:{
        code,
    }
},YXB.url.upload+'/client.do','POST',file,{})

//33.获取电视剧列表
export const dramaList= (parentId,pageNum,pageSize) => fetch({
    method:'vidfish.video.drama.list',
    data:{
        parentId,
        pageNum,
        pageSize,
    }
})

//34.添加启动页 vidfish:startup
export const startupPageAdd= (photoUrl) => fetch({
    method:'vidfish.admin.startup.page.add',
    data:{
        photoUrl
    }
})
//35.查询启动页
export const startupPageSearch= (photoUrl) => fetch({
    method:'vidfish.admin.startup.page.search',
    data:{}
})
//35.删除启动页
export const startupPageDelete= (id) => fetch({
    method:'vidfish.admin.startup.page.delete',
    data:{
            id
    }
})

//36.app用户查询列表
export const appUserList = (isBlack,isVip,userName,email,phoneNumber,pageNum, pageSize,startDate,endDate) => fetch({
    method:'vidfish.admin.app.user.list',
    data:{
        isBlack,isVip,userName,email,phoneNumber,pageNum, pageSize,startDate,endDate
    }
})
//37.app用户拉黑接口
export const appUserDisable = (id) => fetch({
    method:'vidfish.admin.app.user.disable',
    data:{
        id
    }
})
//38.app用户启用接口
export const appUserEnable = (id) => fetch({
    method:'vidfish.admin.app.user.enable',
    data:{
        id,
    }
})
//38.app用户赠送月卡年卡
export const appUserGift = (id,promotionType) => fetch({
    method:'vidfish.admin.app.user.gift',
    data:{
        id,
        promotionType
    }
})

//39.查询所有视频目录接口
export const baseCatalog = (typeName) => fetch({
    method:'vidfish.video.base.catalog',
    data:{
        typeName
    }
})

//40.获取语言版本信息
export const languageSelect = () => fetch({
    method:'vidfish.admin.language.select',
    data:{}
})

//41.新增语言版本信息
export const languageInsert = (Lang,Name,languageType) => fetch({
    method:'vidfish.admin.language.insert',
    data:{
        Lang,
        Name,
        languageType
    }
})

//42.修改语言版本信息
export const languageUpdate = (Id,Lang,Name,languageType) => fetch({
    method:'vidfish.admin.language.update',
    data:{
        Id,
        Lang,
        Name,
        languageType
    }
})

//43.删除语言版本信息
export const languageDelete = (Id) => fetch({
    method:'vidfish.admin.language.delete',
    data:{
        Id,
    }
})

//43.新增促销码
export const promotionCodeCreate = (promotionType) => fetch({
    method:'vidfish.promotionCode.create',
    data:{
        promotionType
    }
})

//43.查询促销码
export const promotionCodeList = (promotionType,flag,isEffective,promotionCode,pageNum,pageSize) => fetch({
    method:'vidfish.promotionCode.list',
    data:{
        promotionType,flag,isEffective,promotionCode,pageNum,pageSize
    }
})

//44.查询用户反馈
export const userFeedback = (startTime,endTime,pageNum,pageSize) => fetch({
    method:'vidfish.admin.user.feedback',
    data:{startTime,endTime, pageNum, pageSize}
})

//45.删除用户vip信息
export const userVipDelete = (id) => fetch({
    method:'vidfish.admin.app.user.vip.delete',
    data:{id}
})

//46.删除用户信息
export const userDelete = (id) => fetch({
    method:'vidfish.admin.app.user.delete',
    data:{id}
})


//47.新增视频海报接口
export const posterAddUpdate = (videoBaseId,posterUrl,createTime,updateTime,lang,id) => fetch({
    method:'vidfish.admin.poster.add.update',
    data:{videoBaseId,posterUrl,createTime,updateTime,lang,id}
})

//48.删除视频海报接口
export const posterDelete = (id) => fetch({
    method:'vidfish.admin.poster.delete',
    data:{id}
})

//49.查询用户点击记录
export const clickRecordList = (userId) => fetch({
    method:'vidfish.admin.click.record.list',
    data:{userId}
})

//50.查询用户视频播放记录列表
export const playbackRecords = (userId) => fetch({
    method:'vidfish.admin.playback.records',
    data:{userId}
})

//51.查询用户购买记录列表
export const detrimentList = (idCode) => fetch({
    method:'youxibi.detriment.list',
    data:{idCode}
},YXB.url.pay+'/client.do')


//52.置顶视频/取消置顶
export const videoBaseTopping = (id,isTop) => fetch({
    method:'vidfish.video.base.topping',
    data:{id,isTop}
})
//53.查询置顶排序记录
export const videoBaseOrderTopping = (typeName,pageNum,pageSize) => fetch({
    method:'vidfish.video.base.order.topping',
    data:{typeName,pageNum,pageSize}
})

//54.查询搜索记录
export const searchRecordList = (userId,pageNum,pageSize) => fetch({
    method:'admin.search.record.list',
    data:{userId,pageNum,pageSize}
})

//55.添加/更新充值码
export const rechargeSaveUpdate = (code,freeDays,id) => fetch({
    method:'vidfish.admin.recharge.save.update',
    data:{code,freeDays,id}
})
//56.查询充值码列表
export const rechargeList = (code,pageNum,pageSize) => fetch({
    method:'vidfish.admin.recharge.list',
    data:{code,pageNum,pageSize}
})
//57.查询充值码使用列表
export const rechargeUseList = (code,email,pageNum,pageSize) => fetch({
    method:'vidfish.admin.recharge.use.list',
    data:{code,email,pageNum,pageSize}
})

//58.查询帮助文档列表
export const helpDocumentList = (type,theme,lang,enable_,pageNum,pageSize) => fetch({
    method:'vidfish.admin.help.document.list',
    data:{type,theme,lang,enable_,pageNum,pageSize}
})
//59.新增帮助文档列表
export const helpDocumentAdd = (type,theme,lang,enable_,remark,title,fileId) => fetch({
    method:'vidfish.admin.help.document.add',
    data:{type,theme,lang,enable_,remark,title,fileId}
})
//60.删除帮助文档列表
export const helpDocumentDelete = (id) => fetch({
    method:'vidfish.admin.help.document.delete',
    data:{id}
})


//61.查询视频类型列表
export const genreList = (type,lang) => fetch({
    method:'vidfish.admin.genre.list',
    data:{type,lang}
})

//62.新增视频类型
export const genreAdd = (type,lang,name) => fetch({
    method:'vidfish.admin.genre.add',
    data:{type,lang,name}
})

//63.删除视频类型
export const genreDelete = (id) => fetch({
    method:'vidfish.admin.genre.delete',
    data:{id}
})


//64.批量生成免费码
export const freeCodeAddFactory = (number,freeDays) => fetch({
    method:'vidfish.admin.free.code.add.factory',
    data:{number,freeDays}
})
//65.查询免费码列表
export const freeCodeList = (pageNum,pageSize,startDate,endDate,status) => fetch({
    method:'vidfish.admin.free.code.list',
    data:{pageNum,pageSize,startDate,endDate,status}
})

//66.用户后台数据导出Excel
export const exportUserInfo = (startDate,endDate) => fetch({
    method:'vidfish.admin.app.export.user.info',
    data:{startDate,endDate}
})
//67.后台免费码数据导出Excel
export const freeCodeExport = (startTime,endTime) => fetch({
    method:'vidfish.admin.free.code.export',
    data:{startTime,endTime}
})
//67.后台用户反馈数据导出Excel
export const feedbackExport = (startTime,endTime) => fetch({
    method:'vidfish.admin.user.feedback.export',
    data:{startTime,endTime}
})

//68.新增/修改视频栏目信息
export const itemSaveUpdate = (lang,status,name,id) => fetch({
    method:'vidfish.admin.video.item.save.update',
    data:{lang,status,name,id}
})
//69.查询视频栏目列表
export const itemList = (lang,status,pageNum,pageSize,itemIds) => fetch({
    method:'vidfish.admin.video.item.list',
    data:{lang,status,pageNum,pageSize,itemIds}
})
//70.设置用户vip过期时间
export const editVipExpired = (id,expireDate) => fetch({
    method:'vidfish.admin.app.edit.vip.expired',
    data:{id,expireDate}
})