<template>
    <div class="game-list">
        <div class="today-game">
            <ul class="nav">
                <li @click="activeIndex='全部比赛'" :class="activeIndex=='全部比赛'?'active':''" ><a href="javascript:void (0)">全部比赛</a></li>
                <li @click="activeIndex='DOTA2'" :class="activeIndex=='DOTA2'?'active':''"><a  href="javascript:void (0)">DOTA2</a></li>
                <li @click="activeIndex='CS:GO'" :class="activeIndex=='CS:GO'?'active':''"><a  href="javascript:void (0)">CS:GO</a></li>
                <li @click="activeIndex='LOL'" :class="activeIndex=='LOL'?'active':''"><a  href="javascript:void (0)">LOL</a></li>
            </ul>
            <ul class="today-game-list">
                <li v-for="(item,index) in todayGameList" :key="index">
                    <a :href="'/score/'+item.type">
                        <span><img :src="item.src" alt=""></span>
                        <div class="name">{{item.name1}}</div>
                        <div class="bo">{{item.bo}}</div>
                        <div class="name">{{item.name2}}</div>
                        <div class="status" :class="item.status!='进行中'?'green':''">{{item.status}}</div>
                    </a>
                </li>
                <li class="more"><a href="/score">查看更多...</a></li>
            </ul>
        </div>
        <div class="recent-game">
            <ul class="recent-game-list">
                <li class="nav"><a href="javascript:void (0)">
                    <span><img src="../../assets/image/index/hotCorps.png" alt=""></span>
                    <div class="name">近期赛事</div>
                </a></li>
                <li v-for="(item,index) in recentGameList" :key="index">
                    <a href="/league/details">
                        <span><img :src="item.src" alt=""></span>
                        <div class="name">{{item.name}}</div>
                        <div class="status" :class="item.status=='进行中'?'red':item.status=='即将开始'?'green':item.status=='已结束'?'gray':''">{{item.status}}</div>
                    </a>
                </li>
                <li class="more"><a href="/league">查看更多...</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                activeIndex:'全部比赛',
                todayGameList:[
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'进行中',
                        type:'dota2'
                    },
                    {
                        src:require('../../assets/image/gameIcon/csgo.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'进行中',
                        type:'csgo'
                    },
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'进行中',
                        type:'dota2'
                    },
                    {
                        src:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'进行中',
                        type:'lol'
                    },
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'1小时内',
                        type:'dota2'
                    },
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'2小时内',
                        type:'dota2'
                    },
                    {
                        src:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'4小时内',
                        type:'lol'
                    },
                    {
                        src:require('../../assets/image/gameIcon/csgo.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'4小时内',
                        type:'csgo'
                    },
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'5小时内',
                    },
                    {
                        src:require('../../assets/image/gameIcon/csgo.png'),
                        name1:'Typhoon Ec',
                        name2:'Serenity',
                        bo:'BO3',
                        status:'8小时内',
                        type:'csgo'
                    },
                ],
                recentGameList:[
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛 ',
                        status:'进行中',
                        type:'dota2'
                    },
                    {
                        src:require('../../assets/image/gameIcon/csgo.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛 ',
                        status:'即将开始',
                        type:'csgo'
                    },
                    {
                        src:require('../../assets/image/gameIcon/lol_3_0.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛 ',
                        status:'已结束',
                        type:'lol'
                    },
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛 ',
                        status:'已结束',
                        type:'dota2'
                    },
                    {
                        src:require('../../assets/image/gameIcon/dota2.png'),
                        name:'ONE Esports Dota 2世界职业邀请赛 ',
                        status:'已结束',
                        type:'dota2'
                    },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .game-list{
        width: 270px;
        .today-game{
            width: 270px;
            .nav{
                background: #141821;
                height: 35px;
                display: flex;
                align-items: center;
                li{
                    height: 35px;
                    border-top: 2px solid #141821;
                    a{
                        display: block;
                        width: 67px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 12px;
                        color: #afb0b2;
                    }
                }

                li:hover{
                    color: #fff;
                }
                .active{
                    border-top: 2px solid #f83b3b;
                    background: #1b1f2a;
                    a{
                        color: #ddd;
                        height: 33px;
                    }
                }
            }
            
            .today-game-list{
                width: 270px;
                background: #1b1f2a;
                li{
                    a{
                        width: 270px;
                        display: flex;
                        align-items: center;
                        height: 40px;
                        padding: 10px;
                        span{
                            width: 14px;
                            height:14px;
                            overflow: hidden;
                            margin-right: 10px;
                            position: relative;
                            top: 3px;
                            img{
                                width: 100%;
                                /*margin-top: 3px;*/
                            }
                        }
                        .name{
                            width: 60px;
                            margin-right: 10px;
                            height: 20px;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .bo{
                            width: 36px;
                            margin-right: 10px;
                            height: 20px;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .status{
                            width: 60px;
                            text-align: right;
                            height: 20px;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                            color: #f83b3b;
                        }
                        .green{
                            color: #83cf39;
                        }

                    }
                }
                .more{
                    a{
                        flex-direction: row-reverse;
                        color: #afb0b2;
                        display: flex;
                    }
                }
                li:hover{
                    border-color: #404661;
                    background-color: #282e3e;
                }
            }
        }
        .recent-game{
            .recent-game-list{
                background: #1b1f2a;
                .nav{
                    background: #141821;
                    a{
                        display: flex;
                        align-items: center;
                        width: 270px;
                        height: 42px;
                        padding: 10px;
                        span{
                            display: block;
                            width: 14px;
                            height: 14px;
                            overflow: hidden;
                            margin-right: 10px;
                            img{
                                width: 100%;
                            }
                        }
                        .name{
                            color: #ddd;
                            font-size: 14px;
                        }
                    }
                }
                li{
                    a{
                        display: flex;
                        align-items: center;
                        width: 270px;
                        height: 40px;
                        padding: 10px;
                        span{
                            width: 14px;
                            height:14px;
                            overflow: hidden;
                            margin-right: 10px;
                            position: relative;
                            top: 3px;
                            img{
                                width: 100%;
                            }
                        }
                        .name{
                            width: 160px;
                            margin-right: 10px;
                            height: 20px;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .status{
                            width: 60px;
                            text-align: right;
                            height: 20px;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                            color: #f83b3b;
                        }
                        .red{
                            color: #f83b3b;
                        }
                        .green{
                            color: #83cf39;
                        }
                        .gray{
                            color: #777;
                        }

                    }
                }
                .more{
                    a{
                        flex-direction: row-reverse;
                        color: #afb0b2;
                        display: flex;
                    }
                }
                li:hover{
                    border-color: #404661;
                    background-color: #282e3e;
                }
            }

        }
    }
</style>