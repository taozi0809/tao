<template>
    <div class="allGameList">
        <div class="all-game-list-nav">
            <ul>
                <li :class="activeIndex=='全部游戏'?'active':''" @click="activeIndex='全部游戏'"><a href="javascript:void (0)"><div class="name">全部游戏</div></a></li>
                <li :class="activeIndex=='DOTA2'?'active':''" @click="activeIndex='DOTA2'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/dota2.png" alt=""></span><div class="name">DOTA2</div></a></li>
                <li :class="activeIndex=='CS:GO'?'active':''" @click="activeIndex='CS:GO'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/csgo.png" alt=""></span><div class="name">CS:GO</div></a></li>
                <li :class="activeIndex=='LOL'?'active':''" @click="activeIndex='LOL'">
                    <a href="javascript:void (0)">
                        <span><img src="../../assets/image/gameIcon/lol_3_0.png" alt=""></span>
                        <div class="name">LOL</div>
                    </a>
                    <div class="new"><img src="../../assets/image/index/new_0.png" alt=""></div>
                </li>
            </ul>
            <div class="refresh-time">
                <span class="icon" v-if="iconLoad"><img src="../../assets/image/index/loading.gif" alt=""></span>
                <div class="txt">刷新倒计时<span class="time"> {{time}} </span>秒</div>
            </div>
        </div>
        <div class="allGameList-list">
            <ul>
                <li v-for="(item,index) in allGameList" :key="index">
                    <a :href="'/score/'+item.type" class="li-a">
                        <div class="item-top">
                            <div class="name">
                                <span><img :src="item.gameSrc" alt=""></span>
                                <div class="gameName">{{item.gameName}}</div>
                            </div>
                            <div class="bo">{{item.bo}}</div>
                            <div class="time">{{item.startTime}}</div>
                            <div class="exponent">指数</div>
                            <div class="camp">阵营</div>
                            <div class="icons"></div>
                            <div class="kill">击杀</div>
                            <div class="economic">经济</div>
                            <div class="experience">经验</div>
                        </div>
                        <div class="item-main">
                            <div class="gameIndex">
                                {{item.gameIndex}} <br>
                                {{item.time}}
                            </div>
                            <div class="team">
                                <div class="teama"><span><img :src="item.teama.src" alt=""></span><div class="name">{{item.teama.name}}</div></div>
                                <div class="teamb"><span><img :src="item.teamb.src" alt=""></span><div class="name">{{item.teamb.name}}</div></div>
                            </div>
                            <div class="score">
                                <div class="scorea">{{item.teama.score}}</div>
                                <div class="scoreb">{{item.teamb.score}}</div>
                            </div>
                            <div class="exponent">
                                <div class="value">{{item.teama.exponent}}</div>
                                <div class="value">{{item.teamb.exponent}}</div>
                            </div>
                            <div class="camp">
                                <div class="value">{{item.teama.camp}}</div>
                                <div class="value">{{item.teamb.camp}}</div>
                            </div>
                            <div class="icons">
                                <div class="value"><span v-for="(itemItem,indexIndex) in item.teama.designation"><img :src="itemItem.src" alt=""></span></div>
                                <div class="value"><span v-for="(itemItem,indexIndex) in item.teamb.designation"><img :src="itemItem.src" alt=""></span></div>
                            </div>
                            <div class="kill">
                                <div class="value">{{item.teama.kill}}</div>
                                <div class="value">{{item.teamb.kill}}</div>
                            </div>
                            <div class="economic">
                                <div class="value">{{item.teama.economic}}</div>
                                <div class="value">{{item.teamb.economic}}</div>
                            </div>
                            <div class="experience">
                                <div class="value">{{item.teama.experience}}</div>
                                <div class="value">{{item.teamb.experience}}</div>
                            </div>
                        </div>
                    </a>
                </li>
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
                time:3,
                iconLoad:false,
                allGameList:[
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/dota2.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'dota2',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/csgo.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'csgo',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/lol_3_0.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'lol',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/dota2.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'dota2',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/csgo.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'csgo',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/lol_3_0.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'lol',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/dota2.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'dota2',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/csgo.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'csgo',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/lol_3_0.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'lol',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/dota2.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'dota2',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/csgo.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'csgo',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                    {
                        gameName:'ONE Esports Dota 2世界职业邀请赛',
                        gameSrc:require('../../assets/image/gameIcon/lol_3_0.png'),
                        bo:'BO2',
                        startTime:'12月17日 14:26',
                        gameIndex:'第一局',
                        time:'31分01秒',
                        type:'lol',
                        teama:{
                            src:require('../../assets/image/index/allGameList/team/1-1.png'),
                            name:'TNC',
                            score:0,
                            exponent:1.55,
                            camp:'夜魇',
                            kill:'1',
                            economic:'9k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ],
                        },
                        teamb:{
                            src:require('../../assets/image/index/allGameList/team/1-2.png'),
                            name:'Aster',
                            score:0,
                            exponent:0.57,
                            camp:'天辉',
                            kill:'2',
                            economic:'8k',
                            experience:'7k',
                            designation:[
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/first_blood.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/ten_kills.png')
                                },
                                {
                                    src:require('../../assets/image/index/allGameList/designation/lol/winner.png')
                                },
                            ]
                        }
                    },
                ],
                pageList:[1,2,3,4,5,6,7],
                pageActiveIndex:1,
            }
        },
        mounted() {
            setInterval(()=>{
                this.time--
                if(this.time<0){this.time=3}
            },1000)
        }
    }
</script>

<style lang="scss" scoped>
    .allGameList{
        .all-game-list-nav{
            width: 850px;
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
                    .new{
                        display: block;
                        width: 27px;
                        position: absolute;
                        right:3px;
                        top: -3px;
                        img{
                            width: 100%;
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
            .refresh-time{
                flex-shrink: 0;
                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: center;
                padding-right: 10px;
                .icon{
                    width: 14px;
                    height: 14px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                    img{
                       width: 100%;
                    }
                }
                .txt{
                    color: #9f9f9f;
                    font-size: 12px;
                }
                .time{
                    color: #f83b3b;
                }
            }
        }
        .allGameList-list{
            background: #1b1f2a;
            width: 850px;
            padding-top: 15px;
            padding-bottom: 20px;
            margin-bottom: 20px;
            ul{
                width: 850px;
                li{
                     margin: 0 15px;
                     margin-bottom: 20px;
                     border-left: 5px solid #f83b3b;
                     padding-top: 2px;
                     padding-bottom: 2px;
                    .li-a{
                        display: block;
                        width: 814px;
                        .item-top{
                            background: #2b2e3e;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            .name{
                                display: flex;
                                align-items: center;
                                width: 210px;
                                height: 30px;
                                box-sizing: border-box;
                                padding:0 5px;
                                flex-shrink: 0;
                                span{
                                    flex-shrink: 0;
                                    display: block;
                                    width: 14px;
                                    height: 14px;
                                    overflow: hidden;
                                    margin-right: 5px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .gameName{
                                    white-space:nowrap;
                                    overflow:hidden;
                                    text-overflow:ellipsis;
                                    color: #aaa;
                                    font-size: 12px;
                                    height: 30px;
                                    line-height: 30px;
                                }
                            }
                            .bo{
                                color: #aaa;
                                font-size: 12px;
                                width: 40px;
                                height: 30px;
                                line-height: 30px;
                                flex-shrink: 0;
                            }
                            .time{
                                width: 100px;
                                height: 30px;
                                line-height: 30px;
                                padding-right: 10px;
                                font-size: 12px;
                                color: #aaa;
                                flex-shrink: 0;
                            }
                            .exponent,.camp,.kill,.economic,.experience{
                                flex-shrink: 0;
                                width: 70px;
                                height: 30px;
                                line-height: 30px;
                                color: #aaa;
                                font-size: 12px;
                                padding: 0 5px;
                            }
                            .icons{
                                width: 130px;
                                height: 30px;
                            }

                        }
                        .item-main{
                            background: #2c3040;
                            height: 80px;
                            display: flex;
                            align-items: center;
                            .gameIndex{
                                text-align: center;
                                width: 120px;
                                height: 60px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-shrink: 0;
                            }
                            .team{
                                width: 120px;
                                height: 60px;
                                flex-shrink: 0;
                                .teama,.teamb{
                                    width: 120px;
                                    height: 30px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        display: block;
                                        width: 20px;
                                        height: 20px;
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
                            .icons{
                                width: 130px;
                                height: 60px;
                                .value{
                                   display: flex;
                                   align-items: center;
                                   span{
                                       display: block;
                                       width: 12px;
                                       height: 30px;
                                       overflow: hidden;
                                       margin-right: 10px;
                                       img{
                                           width: 100%;
                                       }
                                   }
                                }
                            }
                            .scorea,.scoreb{
                                width:110px;
                                height: 30px;
                                line-height: 30px;
                                display: flex;
                                align-items: center;
                            }
                            .value{
                                width:70px;
                                height: 30px;
                                line-height: 30px;
                                display: flex;
                                align-items: center;
                                padding: 0 5px;
                            }
                        }

                    }
                }
                li:hover{
                    box-shadow: 1px 1px 5px 1px grey;
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