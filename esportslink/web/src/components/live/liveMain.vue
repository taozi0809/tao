<template>
    <div class="leagueMain">
        <div class="all-game-list-nav">
            <ul>
                <li :class="activeIndex=='全部游戏'?'active':''" @click="activeIndex='全部游戏'"><a href="javascript:void (0)"><div class="name">全部游戏</div></a></li>
                <li :class="activeIndex=='DOTA2'?'active':''" @click="activeIndex='DOTA2'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/dota2.png" alt=""></span><div class="name">DOTA2</div></a></li>
                <li :class="activeIndex=='CS:GO'?'active':''" @click="activeIndex='CS:GO'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/csgo.png" alt=""></span><div class="name">CS:GO</div></a></li>
                <li :class="activeIndex=='PUBG'?'active':''" @click="activeIndex='PUBG'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/pubg.png" alt=""></span><div class="name">PUBG</div></a></li>
                <li :class="activeIndex=='LOL'?'active':''" @click="activeIndex='LOL'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/lol_3_0.png" alt=""></span><div class="name">LOL</div></a></li>
                <li :class="activeIndex=='娱乐星秀'?'active':''" @click="activeIndex='娱乐星秀'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/ylxx.png" alt=""></span><div class="name">娱乐星秀</div></a></li>
            </ul>
        </div>
        <div class="game-list">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <a href="javascript:void (0)">
                        <span class="img-box"><img :src="item.src" alt=""></span>
                        <div class="name-box">
                            <span><img :src="item.nameLogo" alt=""></span>
                            <div class="name">{{item.name}}</div>
                        </div>
                        <div class="number-box">
                           <div class="l">
                               <span><img :src="item.headImgSrc" alt=""></span>
                               <div class="name">{{item.nickName}}</div>
                           </div>
                            <div class="r">
                                <span>
                                    <svg class="icon icon-size" aria-hidden="true">
                                        <use xlink:href="#iconyanjing"></use>
                                    </svg>
                                </span>
                                <div class="number">{{item.number}}</div>
                            </div>
                        </div>

                        <span class="play"><span><img src="../../assets/image/live/play.png" alt=""></span></span>
                    </a>
                </li>
                <li style="opacity: 0;" v-for="(item,index) in supplementNumber"><a href="javascript:void (0)"></a></li>
            </ul>
            <div class="pageNum">
                <div class="first">首页</div>
                <div class="pre">上一页</div>
                <div class="page-item" v-for="(item,index) in pageList" :key="index" :class="pageActiveIndex==item?'active':''">{{item}}</div>
                <div class="next">下一页</div>
                <div class="last">末页</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                activeIndex:'全部游戏',
                list:[
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/2.png'),
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'【黄金大奖赛S8】18号17点D组',
                        nickName:'芜湖大司马丶',
                        number:'230.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/3.png'),
                        nameLogo:require('../../assets/image/gameIcon/csgo.png'),
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        name:'小渔村〖大波浪〗',
                        nickName:'芜湖大司马丶',
                        number:'560.56万'
                    },
                    {
                        src:require('../../assets/image/live/list/1.png'),
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'正在准备新的游戏商务！3点半准时开播！',
                        headImgSrc:require('../../assets/image/gameIcon/douyu.png'),
                        nickName:'芜湖大司马丶',
                        number:'100.56万'
                    },

                ],
                pageList:[1,2,3,4,5,6,7],
                pageActiveIndex:1,
                supplementNumber:0,
            }
        },
        mounted() {
            this.supplementNumber = 4 - (this.list.length%4)
        }
    }
</script>

<style lang="scss" scoped>
    .leagueMain{
        width: 1150px;
        background: #1b1f2a;
        min-height: 726px;
        margin: 0 10px;
        margin-bottom: 20px;
        .all-game-list-nav{
            width: 1150px;
            height: 40px;
            background: #141821;
            display: flex;
            align-items: center;
            justify-content: space-between;
            ul{
                display: flex;
                align-items: center;
                li{
                    border-top: 2px solid #141821;
                    position: relative;
                    a{
                        width: 120px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        span{
                            width: 14px;
                            height: 14px;
                            overflow: hidden;
                            display: block;
                            margin-right: 10px;
                            img{
                                width: 100%;
                            }
                        }
                        .name{
                            font-size: 14px;
                            color: #afb0b2;
                            height: 40px;
                            line-height: 40px;
                        }
                    }
                }
                li:hover{
                    a{
                        .name{
                            color: #ddd;
                        }
                    }
                }
                .active{
                    border-top: 2px solid #f83b3b;
                    background: #1b1f2a;
                    a{
                        .name{
                            color: #ddd;
                        }
                    }
                }
            }
        }
        .game-list{
            width: 100%;
            padding-bottom: 20px;
            margin-bottom: 20px;
            ul{
                width: 100%;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-around;
                padding: 20px 30px;
                li{
                    a{
                        display: block;
                        width: 257px;
                        height: 205px;
                        background: #2c3040;
                        margin-bottom: 20px;
                        overflow: hidden;
                        position: relative;
                        .img-box{
                            display: block;
                            width: 257px;
                            height: 145px;
                            overflow: hidden;
                            img{
                                width: 100%;
                            }
                        }
                        .name-box{
                            height: 20px;
                            display: flex;
                            align-items: center;
                            padding:0 5px;
                            margin: 5px 0;
                            span{
                                display: block;
                                width: 14px;
                                height: 14px;
                                overflow: hidden;
                                margin-right: 6px;
                                flex-shrink: 0;
                                img{
                                    width: 100%;
                                }
                            }
                            .name{
                                height: 20px;
                                line-height: 20px;
                                color: #eee;
                                font-size: 12px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                        }
                        .number-box{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            height: 20px;
                            padding:0 5px;
                            margin: 5px 0;
                            .l{
                                display: flex;
                                align-items: center;
                                span{
                                    display: block;
                                    width: 14px;
                                    height: 14px;
                                    overflow: hidden;
                                    margin-right: 6px;
                                    flex-shrink: 0;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .name{
                                    height: 20px;
                                    line-height: 20px;
                                    color: #eee;
                                    font-size: 12px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                    max-width: 150px;
                                }
                            }
                            .r{
                                display: flex;
                                align-items: center;
                                .icon-size{
                                    font-size: 16px;
                                    position: relative;
                                    top: 2px;
                                    margin-right: 2px;
                                }
                                .number{
                                    height: 20px;
                                    line-height: 20px;
                                    color: #eee;
                                    font-size: 12px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                        .play{
                            position: absolute;
                            width: 257px;
                            height: 145px;
                            top: 0;
                            left: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: rgba(0,0,0,.5);
                            opacity: 0;
                            span{
                                display: block;
                                width: 96px;
                                height:96px;
                                overflow: hidden;
                                transition: all 0.3s ease-out;
                                img{
                                    width: 100%;
                                }
                            }
                        }
                    }
                }
                li:hover{
                    .play{
                        opacity: 0.5;
                        /*display: block;*/
                        span{
                            transform: scale(0.5);
                        }
                    }
                }
            }
            .pageNum{
                width: 100%;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                .first,.last,.pre,.next,.page-item{
                    width: 54px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ccc;
                    font-size: 14px;
                    border: 1px solid #444;
                    background: #282e3e;
                }
                .first{
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }
                .last{
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
                .page-item{
                    padding: 6px 12px;
                    width: auto;
                    height: 34px;
                }
                .first:hover,.last:hover,.pre:hover,.next:hover,.page-item:hover{
                    color: #f83b3b;
                    background-color: #282e3e;
                    border-color: #f83b3b;
                }
                .active{
                    color: #f83b3b;
                    background-color: #282e3e;
                    border-color: #f83b3b;
                }

            }
        }
    }
</style>