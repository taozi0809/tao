<template>
    <div class="leagueMain">
        <div class="all-game-list-nav">
            <ul>
                <li :class="activeIndex=='全部游戏'?'active':''" @click="activeIndex='全部游戏'"><a href="javascript:void (0)"><div class="name">全部游戏</div></a></li>
                <li :class="activeIndex=='DOTA2'?'active':''" @click="activeIndex='DOTA2'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/dota2.png" alt=""></span><div class="name">DOTA2</div></a></li>
                <li :class="activeIndex=='CS:GO'?'active':''" @click="activeIndex='CS:GO'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/csgo.png" alt=""></span><div class="name">CS:GO</div></a></li>
            </ul>
        </div>
        <div class="game-list" ref="gameList">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <a href="/league/details">
                        <span class="img-box"><img :src="item.src" alt=""></span>
                        <div class="name-box">
                            <span><img :src="item.nameLogo" alt=""></span>
                            <div class="name">{{item.name}}</div>
                        </div>
                        <div class="status">
                            <span v-if="item.status=='start'"><img src="../../assets/image/league/status/league_start.png" alt=""></span>
                            <span v-if="item.status=='upcoming'"><img src="../../assets/image/league/status/league_upcoming.png" alt=""></span>
                            <span v-if="item.status=='end'"><img src="../../assets/image/league/status/league_finish.png" alt=""></span>
                        </div>
                        <div class="grade">
                            <span v-for="(itemItem,indexIndex) in item.grade" :key="indexIndex">
                                <svg class="icon icon-size" aria-hidden="true">
                                    <use xlink:href="#iconcaidan_wujiaoxingman"></use>
                                </svg>
                            </span>
                        </div>
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
                        src:require('../../assets/image/league/list/1.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/starcraft2.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/3.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'upcoming',
                        grade:3,
                        nameLogo:require('../../assets/image/gameIcon/hearthstone.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/4.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'end',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/3.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'upcoming',
                        grade:3,
                        nameLogo:require('../../assets/image/gameIcon/hearthstone.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/1.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/starcraft2.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/3.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'upcoming',
                        grade:3,
                        nameLogo:require('../../assets/image/gameIcon/hearthstone.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/4.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'end',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/starcraft2.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/1.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/starcraft2.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/3.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'upcoming',
                        grade:3,
                        nameLogo:require('../../assets/image/gameIcon/hearthstone.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/4.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'end',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/starcraft2.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/1.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/lol_3_0.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'start',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/starcraft2.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/3.jpg'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'upcoming',
                        grade:3,
                        nameLogo:require('../../assets/image/gameIcon/hearthstone.png'),
                    },
                    {
                        src:require('../../assets/image/league/list/4.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛',
                        status:'end',
                        grade:4,
                        nameLogo:require('../../assets/image/gameIcon/overwatch.png'),
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
            padding-bottom: 20px;
            margin-bottom: 20px;
            width: 100%;
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
                        width: 255px;
                        height: 175px;
                        background: #2c3040;
                        margin-bottom: 20px;
                        position: relative;
                        .img-box{
                            display: block;
                            width: 255px;
                            height: 145px;
                            overflow: hidden;
                            img{
                                width: 255px;
                                height: 100%;
                                transition: all 0.3s;
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
                        .status{
                            position: absolute;
                            top: 0;
                            right: 0;

                        }
                        .grade{
                            position: absolute;
                            right: 10px;
                            bottom: 35px;
                            display: flex;
                            align-items: center;
                            .icon-size{
                                font-size: 16px;
                                color: #ffed41;
                            }
                        }
                    }
                }
                li:hover{
                    a{
                        .img-box{
                            img{
                                transform: scale(1.2);
                            }
                        }
                        .name-box{
                            .name{
                                color: #f83b3b;
                            }
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