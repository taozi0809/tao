<template>
    <div class="details">
        <div class="head">
            <div class="level">
                <a href="javascript:void (0)">
                    <span><img src="../../assets/image/gameIcon/dota2.png" alt=""></span>
                    <div class="name">DOTA2</div>
                    <div class="c">></div>
                </a>
            </div>
            <div class="level">
                <a href="javascript:void (0)">
                    <div class="name">ONE Esports Dota 2世界职业邀请赛 </div>
                </a>
            </div>
        </div>
        <div class="details-info">
            <div class="game-details">
                <div class="l"><img src="../../assets/image/league/list/1.jpg" alt=""></div>
                <div class="r">
                    <div class="r1">
                        <div class="title">ONE Esports Dota 2世界职业邀请赛</div>
                        <div class="time">2019年12月17日 - 2019年12月22日</div>
                    </div>
                    <div class="r2">
                        <span v-for="(itemItem,indexIndex) in 4" :key="indexIndex">
                                <svg class="icon icon-size" aria-hidden="true">
                                    <use xlink:href="#iconcaidan_wujiaoxingman"></use>
                                </svg>
                            </span>
                    </div>
                    <div class="r3">
                        <div class="item">赛事总奖金:<span class="s1">$500,000 USD</span></div>
                        <div class="item">主办方:<span class="s2">ONE Esports PGL</span></div>
                        <div class="item">举办地:<span class="s3">Singapore</span></div>
                    </div>
                </div>
            </div>
            <div class="game-teams">
                <div class="title">直接参赛队伍</div>
                <ul class="teams">
                   <li><img src="../../assets/image/league/details/team/1.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/2.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/3.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/4.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/5.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/6.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/7.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/8.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/9.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/10.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/11.png" alt=""></li>
                   <li><img src="../../assets/image/league/details/team/12.png" alt=""></li>
                </ul>
            </div>
            <div class="game-info">
                <div class="title">赛事信息</div>
                <div class="game-box">
                    <div class="btn-box">
                        <ul>
                            <li :class="gameActiveIndex=='淘汰赛'?'active':''" @click="gameActiveIndex='淘汰赛'"><a href="javascript:void (0)">淘汰赛</a></li>
                            <li :class="gameActiveIndex=='小组赛'?'active':''" @click="gameActiveIndex='小组赛'"><a href="javascript:void (0)">小组赛</a></li>
                        </ul>
                    </div>
                    <div class="out" v-if="gameActiveIndex=='淘汰赛'">
                        <div class="item1 item1-1">
                            <div class="item1-top">
                                <div class="item-item"></div>
                                <div class="item-item"></div>
                                <div class="item-item item1-top-3">
                                    <div class="team1">
                                        <div class="team-title">胜者组第一轮（BO3）</div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                    <div class="team2">
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                </div>
                                <div class="item-item item1-top-4">
                                    <div class="team1">
                                        <div class="team-title">胜者组第一轮（BO3）</div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="item1-bot">
                                <div class="item-item item1-bot-1">
                                    <div class="team1">
                                        <div class="team-title">胜者组第一轮（BO3）</div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                    <div class="team2">
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                </div>
                                <div class="item-item item1-bot-2">
                                    <div class="team1">
                                        <div class="team-title">胜者组第一轮（BO3）</div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                    <div class="team2">
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                </div>
                                <div class="item-item item1-bot-3">
                                    <div class="team1">
                                        <div class="team-title">胜者组第一轮（BO3）</div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                </div>
                                <div class="item-item item1-bot-4">
                                    <div class="team1">
                                        <div class="team-title">胜者组第一轮（BO3）</div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                                <div class="team-name">Gambit</div>
                                            </div>
                                            <div class="r">0</div>
                                        </a></div>
                                        <div class="team-item"><a href="javascript:void (0)">
                                            <div class="l">
                                                <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                                <div class="team-name">Alliance</div>
                                            </div>
                                            <div class="r">2</div>
                                        </a></div>
                                        <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item2 item2-2">
                            <div class="item-item">
                                <div class="team1">
                                    <div class="team-title">胜者组第一轮（BO3）</div>
                                    <div class="team-item"><a href="javascript:void (0)">
                                        <div class="l">
                                            <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                                            <div class="team-name">Gambit</div>
                                        </div>
                                        <div class="r">0</div>
                                    </a></div>
                                    <div class="team-item"><a href="javascript:void (0)">
                                        <div class="l">
                                            <span><img src="../../assets/image/league/details/team/2.png" alt=""></span>
                                            <div class="team-name">Alliance</div>
                                        </div>
                                        <div class="r">2</div>
                                    </a></div>
                                    <div class="team-time"><a href="javascript:void (0)">2019-12-19 12:45</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="item3">
                            <div class="win">
                                <div class="s1"><img src="../../assets/image/league/details/team/winner.png" alt=""></div>
                                <div class="s2"><img src="../../assets/image/league/details/team/default.png" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="group" v-if="gameActiveIndex=='小组赛'">
                        <div class="group-top">
                            <ul class="group-btn">
                                <li :class="groupActiveIndex=='小组赛A组'?'active':''" @click="groupActiveIndex='小组赛A组'"><a href="javascript:void (0);">小组赛A组</a></li>
                                <li :class="groupActiveIndex=='小组赛B组'?'active':''" @click="groupActiveIndex='小组赛B组'"><a href="javascript:void (0);">小组赛B组</a></li>
                            </ul>
                        </div>
                        <div class="group-c">
                            <div class="group-l">
                                <div class="table-head">
                                   <div class="team">战队</div>
                                   <div class="team-td">胜</div>
                                   <div class="team-td">平</div>
                                   <div class="team-td">负</div>
                                   <div class="team-td">小局胜</div>
                                   <div class="team-td">积分</div>
                                </div>
                                <ul class="table-list">
                                    <li v-for="(item,index) in list1"><a href="javascript:void (0);">
                                        <div class="team"><span><img :src="item.logo" alt=""></span><div class="teamName">{{item.teamName}}</div></div>
                                        <div class="team-td">{{item.a}}</div>
                                        <div class="team-td">{{item.b}}</div>
                                        <div class="team-td">{{item.c}}</div>
                                        <div class="team-td">{{item.d}}</div>
                                        <div class="team-td">{{item.e}}</div>
                                    </a></li>
                                </ul>
                            </div>
                            <div class="group-r">
                                <div class="table-head">
                                    <div class="time">时间</div>
                                    <div class="teama">战队</div>
                                    <div class="score">比分</div>
                                    <div class="teamb">战队</div>
                                    <div class="bo"></div>
                                </div>
                                <ul class="table-list">
                                    <li v-for="(item,index) in list2"><a href="javascript:void (0);">
                                        <div class="time">{{item.time}}</div>
                                        <div class="teama"><span><img :src="item.teama.logo" alt=""></span><div class="teamName">{{item.teama.teamName}}</div></div>
                                        <div class="score">{{item.score}}</div>
                                        <div class="teamb"><span><img :src="item.teamb.logo" alt=""></span><div class="teamName">{{item.teamb.teamName}}</div></div>
                                        <div class="bo">{{item.bo}}</div>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                gameActiveIndex:'淘汰赛',
                gameActiveIndex:'小组赛',
                groupActiveIndex:'小组赛A组',
                list1:[
                    {
                        logo:require('../../assets/image/league/details/team/1.png'),
                        teamName:'Alliance',
                        a:'4',
                        b:'0',
                        c:'0',
                        d:'8',
                        e:'8',
                    },
                    {
                        logo:require('../../assets/image/league/details/team/2.png'),
                        teamName:'Alliance',
                        a:'4',
                        b:'0',
                        c:'0',
                        d:'8',
                        e:'8',
                    },
                    {
                        logo:require('../../assets/image/league/details/team/3.png'),
                        teamName:'Alliance',
                        a:'4',
                        b:'0',
                        c:'0',
                        d:'8',
                        e:'8',
                    },
                    {
                        logo:require('../../assets/image/league/details/team/4.png'),
                        teamName:'Alliance',
                        a:'4',
                        b:'0',
                        c:'0',
                        d:'8',
                        e:'8',
                    },
                    {
                        logo:require('../../assets/image/league/details/team/5.png'),
                        teamName:'Alliance',
                        a:'4',
                        b:'0',
                        c:'0',
                        d:'8',
                        e:'8',
                    },
                    {
                        logo:require('../../assets/image/league/details/team/6.png'),
                        teamName:'Alliance',
                        a:'4',
                        b:'0',
                        c:'0',
                        d:'8',
                        e:'8',
                    },
                ],
                list2:[
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                    {
                        time:'2019-12-17 10:09',
                        teama:{
                            logo:require('../../assets/image/league/details/team/1.png'),
                            teamName:'Alliance',
                        },
                        teamb:{
                            logo:require('../../assets/image/league/details/team/2.png'),
                            teamName:'TNC',
                        },
                        score:'2:0',
                        bo:'BO2',
                    },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .details{
        width: 1150px;
        margin: 0 10px;
        min-height: 726px;
        background: #1b1f2a;
        .head{
            width: 100%;
            background: #141821;
            display: flex;
            align-items: center;
            height: 44px;
            box-sizing: border-box;
            padding: 0 15px;
            .level{
                a{
                    display: flex;
                    align-items: center;
                    span{
                        display: block;
                        width: 14px;
                        height: 14px;
                        overflow: hidden;
                        margin-right: 5px;
                        position: relative;
                        top: 1px;
                        img{
                            width: 100%;
                        }
                    }
                    .name{
                        color: #999;
                        font-size: 14px;
                    }
                    .c{
                        margin: 0 6px;
                        color: #999;
                        font-size: 16px;
                        height: 44px;
                        line-height: 44px;
                    }
                }
            }
            .level:hover{
                a{
                    .name{
                        color: #f83b3b;
                    }
                }
            }
        }
        .details-info{
            width: 100%;
            padding: 20px;
            .game-details{
                width: 100%;
                height: 150px;
                margin-bottom: 15px;
                display: flex;
                .l{
                    width: 270px;
                    height: 150px;
                    margin-right: 15px;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    .r1{
                        display: flex;
                        margin-bottom: 10px;
                        height: 25px;
                        align-items: center;
                        .title{
                            font-size: 18px;
                            color: #fff;
                            font-weight: 700;
                            margin-right: 20px;
                        }
                        .time{
                            color: #aaa;
                            font-size: 14px;
                        }
                    }
                    .r2{
                        margin-bottom: 10px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        .icon-size{
                            font-size: 16px;
                            color: #ffed41;
                            margin-right: 5px;
                        }
                    }
                    .r3{
                        display: flex;
                        align-items: center;
                        height: 20px;
                        .item{
                            font-size: 14px;
                            margin-right: 40px;
                           .s1{
                               color: #c89c28;
                               font-weight: bold;
                           }
                            .s2,.s3{
                                color: #ccc;
                            }

                        }
                    }
                }
            }
            .game-teams{
                width: 100%;
                .title{
                    font-size: 24px;
                    color: #aaa;
                    text-shadow: 3px 3px 3px #000;
                    margin-bottom: 10px;
                    margin-top: 20px;
                    height: 26px;
                    line-height: 26px;
                    width: 100%;
                    text-align: center;
                }
                .teams{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    li{
                        width: 40px;
                        margin: 10px 20px 0 0;
                        img{
                            width: 100%;
                        }
                    }
                }

            }
        }
        .game-info{
            width: 100%;
            .title{
                font-size: 24px;
                color: #aaa;
                text-shadow: 3px 3px 3px #000;
                margin-bottom: 10px;
                margin-top: 20px;
                height: 26px;
                line-height: 26px;
                width: 100%;
                text-align: center;
            }
            .game-box{
                width: 100%;
                border: 1px solid #444;
                .btn-box{
                    width: 100%;
                    height: 70px;
                    border-bottom: 1px solid #444;
                    ul{
                        display: flex;
                        align-items: center;
                        height: 70px;
                        justify-content: center;
                        li{
                            a{
                                display: block;
                                width: 110px;
                                height: 28px;
                                line-height: 28px;
                                text-align: center;
                                border: 1px solid #666;
                                font-size: 14px;
                                color: #ccc;
                                border-radius: 2px;
                                margin:0 15px;
                            }
                        }
                        li:hover{
                            a{
                                color: #fff;
                                background: #f83b3b;
                                border: 1px solid #f83b3b;
                            }
                        }
                        .active{
                            a{
                                color: #fff;
                                background: #f83b3b;
                                border: 1px solid #f83b3b;
                            }
                        }
                    }
                }
                .out{
                    width:920px;
                    margin: 0 auto;
                    height: 500px;
                    display: flex;
                    align-items: center;
                    .item1{
                        width: 660px;
                        height:450px;
                        position: relative;
                        .item1-top,.item1-bot{
                            width: 660px;
                            height: 220px;
                            margin-bottom: 10px;
                            display: flex;
                            align-items: center;
                            .item-item{
                                width: 165px;
                                height: 200px;
                                display: flex;
                                align-content: center;
                                flex-wrap: wrap;
                                position: relative;
                                .team1,.team2{
                                    width: 125px;
                                    .team-title{
                                        width: 100%;
                                        height: 24px;
                                        line-height: 24px;
                                        border-bottom: 1px solid #444;
                                        color: #afb0b2;
                                        font-size: 12px;
                                    }
                                    .team-item{
                                        a{
                                            width: 100%;
                                            height: 30px;
                                            display: flex;
                                            align-items: center;
                                            background: #222122;
                                            justify-content: space-between;
                                            padding: 0 5px;
                                            border: 1px solid #444;
                                            border-top: 0;
                                            color: #6d7076;
                                            font-size: 13px;
                                            .l{
                                                display: flex;
                                                align-items: center;
                                                span{
                                                    display: block;
                                                    width: 14px;
                                                    height: 14px;
                                                    overflow: hidden;
                                                    margin-right: 5px;
                                                    flex-shrink: 0;
                                                    img{
                                                        width: 100%;
                                                    }
                                                }
                                                .team-name{

                                                }
                                            }
                                            .r{
                                                flex-shrink: 0;
                                            }
                                        }
                                    }
                                    .team-time{
                                        a{
                                            width: 100%;
                                            height: 20px;
                                            line-height: 20px;
                                            background: #3a3d48;
                                            text-align: center;
                                            border: 1px solid #444;
                                            border-top: 0;
                                            color: #6d7076;
                                            font-size: 12px;
                                            display: block;
                                        }
                                    }
                                }
                                .team1{
                                    height: 104px;
                                }
                                .team2{
                                    height: 80px;
                                    border-top: 1px solid #444;
                                    margin-top: 16px;
                                }
                            }
                            .item1-top-3::after{
                                display: block;
                                content: '';
                                position: absolute;
                                width: 20px;
                                height: 98px;
                                border: 1px solid #444;
                                top: 53px;
                                right: 20px;
                                border-left: 0;
                            }
                            .item1-top-4::after{
                                display: block;
                                content: '';
                                position: absolute;
                                width: 20px;
                                height: 48px;
                                border-bottom: 1px solid #444;
                                top: 54px;
                                left: -20px;
                                border-left: 0;
                            }
                            .item1-bot-1::after{
                                display: block;
                                content: '';
                                position: absolute;
                                width: 40px;
                                height: 98px;
                                border: 1px solid #444;
                                top: 53px;
                                right: 0;
                                border-left: 0;
                                border-right: 0;
                            }
                            .item1-bot-2::after{
                                display: block;
                                content: '';
                                position: absolute;
                                width: 20px;
                                height: 98px;
                                border: 1px solid #444;
                                top: 53px;
                                right: 20px;
                                border-left: 0;
                            }
                            .item1-bot-3::after{
                                display: block;
                                content: '';
                                position: absolute;
                                width: 20px;
                                height: 48px;
                                border-bottom: 1px solid #444;
                                top: 54px;
                                left: -20px;
                                border-left: 0;
                            }
                            .item1-bot-4::after{
                                display: block;
                                content: '';
                                position: absolute;
                                width: 40px;
                                height: 48px;
                                border-bottom: 1px solid #444;
                                top: 54px;
                                left: -40px;
                                border-left: 0;
                            }

                        }
                        .item1-bot{
                           margin-bottom: 0;
                        }
                    }
                    .item1-1::after{
                        display: block;
                        content: '';
                        position: absolute;
                        width: 20px;
                        height:232px;
                        border: 1px solid #444;
                        top: 110px;
                        right: 20px;
                        border-left: 0;

                    }
                    .item2{
                        width: 180px;
                        height:450px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        .item-item{
                            width: 165px;
                            height: 200px;
                            display: flex;
                            align-content: center;
                            flex-wrap: wrap;
                            .team1,.team2{
                                width: 125px;
                                .team-title{
                                    width: 100%;
                                    height: 24px;
                                    line-height: 24px;
                                    border-bottom: 1px solid #444;
                                    color: #afb0b2;
                                    font-size: 12px;
                                }
                                .team-item{
                                    a{
                                        width: 100%;
                                        height: 30px;
                                        display: flex;
                                        align-items: center;
                                        background: #222122;
                                        justify-content: space-between;
                                        padding: 0 5px;
                                        border: 1px solid #444;
                                        border-top: 0;
                                        color: #6d7076;
                                        font-size: 13px;
                                        .l{
                                            display: flex;
                                            align-items: center;
                                            span{
                                                display: block;
                                                width: 14px;
                                                height: 14px;
                                                overflow: hidden;
                                                margin-right: 5px;
                                                flex-shrink: 0;
                                                img{
                                                    width: 100%;
                                                }
                                            }
                                            .team-name{

                                            }
                                        }
                                        .r{
                                            flex-shrink: 0;
                                        }
                                    }
                                }
                                .team-time{
                                    a{
                                        width: 100%;
                                        height: 20px;
                                        line-height: 20px;
                                        background: #3a3d48;
                                        text-align: center;
                                        border: 1px solid #444;
                                        border-top: 0;
                                        color: #6d7076;
                                        font-size: 12px;
                                        display: block;
                                    }
                                }
                            }
                            .team1{
                                height: 104px;
                            }
                            .team2{
                                height: 80px;
                                border-top: 1px solid #444;
                                margin-top: 16px;
                            }
                        }
                    }
                    .item2-2::after{
                        display: block;
                        content: '';
                        position: absolute;
                        width: 20px;
                        height: 173px;
                        border-bottom: 1px solid #444;
                        top: 54px;
                        left: -20px;
                        border-left: 0;
                    }
                    .item2-2::before{
                        display: block;
                        content: '';
                        position: absolute;
                        width: 60px;
                        height: 173px;
                        border-bottom: 1px solid #444;
                        top: 54px;
                        right: 0px;
                        border-left: 0;
                    }
                    .item3 {
                        width: 80px;
                        height: 450px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        top: -8px;
                        .s1{
                            width: 80px;
                            height: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img{
                                width: 20px;
                                position: relative;
                                left: -2px;
                            }
                        }
                        .s2{
                            width: 80px;
                            height: 40px;
                            background: #22252a;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img{
                                width: 32px;
                            }
                        }
                    }

                }
                .group{
                    width: 100%;
                    padding: 0 15px;
                    .group-top{
                        .group-btn{
                            width: 100%;
                            height: 50px;
                            display: flex;
                            align-items: center;
                            li{
                                a{
                                    display: block;
                                    width: 140px;
                                    height: 28px;
                                    line-height: 28px;
                                    text-align: center;
                                    color: #ccc;
                                    border-radius: 2px;
                                    border: 1px solid #666;
                                    margin-right: 15px;
                                    font-size: 14px;
                                }
                            }
                            li:hover,.active{
                                a{
                                    border: 1px solid #f83b3b;
                                    background: #f83b3b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                    .group-c{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-bottom: 20px;
                        .group-l{
                            width: 440px;
                            height: 636px;
                            .table-head{
                                width: 100%;
                                height: 44px;
                                background: #141821;
                                display: flex;
                                align-items: center;
                                .team{
                                    width:100%;
                                }
                                .team-td{
                                    flex-shrink: 0;
                                    height: 44px;
                                    line-height: 44px;
                                    color: #ccc;
                                    font-size: 14px;
                                    width: 60px;
                                    text-align: center;
                                }
                            }
                            .table-list{
                                li{
                                    margin-bottom: 2px;
                                    a{
                                        width: 100%;
                                        height: 44px;
                                        background: #282e3e;
                                        display: flex;
                                        align-items: center;
                                        .team{
                                            width:100% ;
                                            display: flex;
                                            align-items: center;
                                            padding-left: 5px;
                                            span{
                                                display: block;
                                                width: 30px;
                                                height: 30px;
                                                overflow: hidden;
                                                margin-right: 5px;
                                                img{
                                                    width: 100%;
                                                }
                                            }
                                            .teamName{
                                                font-size: 14px;
                                                color: #ccc;
                                            }
                                        }
                                        .team-td{
                                            flex-shrink: 0;
                                            height: 44px;
                                            line-height: 44px;
                                            color: #ccc;
                                            font-size: 14px;
                                            width: 60px;
                                            text-align: center;
                                        }
                                    }
                                }
                                li:hover{
                                    .team{
                                        .teamName{
                                            color: #fff;
                                        }
                                    }
                                    a{
                                        .team-td{
                                            color: #fff;
                                        }
                                    }
                                }
                            }
                        }
                        .group-r{
                            width: 620px;
                            height: 636px;
                            .table-head{
                                width: 100%;
                                height: 44px;
                                background: #141821;
                                display: flex;
                                align-items: center;
                                .time{
                                    width: 150px;
                                    height: 44px;
                                    line-height: 44px;
                                    color: #999;
                                    font-size: 12px;
                                }
                                .teama,.teamb{
                                    width: 160px;
                                    height: 44px;
                                    line-height: 44px;
                                    padding-left: 30px;
                                    font-size: 12px;
                                }
                                .score{
                                    width: 100px;
                                    height: 44px;
                                    line-height: 44px;
                                    font-size: 12px;
                                }
                                .bo{
                                    width: 50px;
                                    height: 44px;
                                    line-height: 44px;
                                    font-size: 12px;
                                }

                            }
                            .table-list{
                                li{
                                    margin-bottom: 2px;
                                    a{
                                        width: 100%;
                                        height: 44px;
                                        background: #282e3e;
                                        display: flex;
                                        align-items: center;
                                        .time{
                                            width: 150px;
                                            height: 44px;
                                            line-height: 44px;
                                            color: #999;
                                            font-size: 14px;
                                        }
                                        .teama,.teamb{
                                            width: 160px;
                                            height: 44px;
                                            display: flex;
                                            align-items: center;
                                            span{
                                                display: block;
                                                width: 30px;
                                                height: 30px;
                                                overflow: hidden;
                                                margin-right: 5px;
                                                img{
                                                    width: 100%;
                                                }
                                            }
                                            .teamName{
                                                font-size: 14px;
                                                color: #ccc;
                                            }
                                        }
                                        .score{
                                            width: 100px;
                                            height: 44px;
                                            font-size: 14px;
                                            line-height: 44px;
                                            color: #ccc;
                                        }
                                        .bo{
                                            width: 50px;
                                            height: 44px;
                                            line-height: 44px;
                                            font-size: 14px;
                                            color: #ccc;
                                        }
                                    }
                                }
                                li:hover{
                                    a{
                                        .time,.score,.bo{
                                            color: #fff;
                                        }
                                        .teama,.teamb{
                                            .teamName{
                                                color: #fff;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>