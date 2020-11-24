<template>
    <div class="scheduleMain">
        <div class="all-game-list-nav">
            <ul>
                <li :class="activeIndex=='全部游戏'?'active':''" @click="activeIndex='全部游戏'"><a href="javascript:void (0)"><div class="name">全部游戏</div></a></li>
                <li :class="activeIndex=='DOTA2'?'active':''" @click="activeIndex='DOTA2'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/dota2.png" alt=""></span><div class="name">DOTA2</div></a></li>
                <li :class="activeIndex=='CS:GO'?'active':''" @click="activeIndex='CS:GO'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/csgo.png" alt=""></span><div class="name">CS:GO</div></a></li>
                <li :class="activeIndex=='LOL'?'active':''" @click="activeIndex='LOL'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/lol_3_0.png" alt=""></span><div class="name">LOL</div></a></li>
                <li :class="activeIndex=='守望先锋'?'active':''" @click="activeIndex='守望先锋'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/overwatch.png" alt=""></span><div class="name">守望先锋</div></a></li>
                <li :class="activeIndex=='炉石传说'?'active':''" @click="activeIndex='炉石传说'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/hearthstone.png" alt=""></span><div class="name">炉石传说</div></a></li>
                <li :class="activeIndex=='星际II'?'active':''" @click="activeIndex='星际II'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/starcraft2.png" alt=""></span><div class="name">星际II</div></a></li>
                <li :class="activeIndex=='风暴英雄'?'active':''" @click="activeIndex='风暴英雄'"><a href="javascript:void (0)"><span><img src="../../assets/image/gameIcon/heroes.png" alt=""></span><div class="name">风暴英雄</div></a></li>
            </ul>
        </div>
        <div class="week">
            <ul>
                <li :class="weekActiveIndex=='3'?'active':''" @click="weekActiveIndex='3'"><a href="javascript:void (0)">12月 18日<br>星期三</a></li>
                <li :class="weekActiveIndex=='4'?'active':''" @click="weekActiveIndex='4'"><a href="javascript:void (0)">12月 19日<br>星期四</a></li>
                <li :class="weekActiveIndex=='5'?'active':''" @click="weekActiveIndex='5'"><a href="javascript:void (0)">12月 20日<br>星期五</a></li>
                <li :class="weekActiveIndex=='6'?'active':''" @click="weekActiveIndex='6'"><a href="javascript:void (0)">12月 21日<br>星期六</a></li>
                <li :class="weekActiveIndex=='0'?'active':''" @click="weekActiveIndex='0'"><a href="javascript:void (0)">12月 22日<br>星期日</a></li>
                <li :class="weekActiveIndex=='1'?'active':''" @click="weekActiveIndex='1'"><a href="javascript:void (0)">12月 23日<br>星期一</a></li>
                <li :class="weekActiveIndex=='2'?'active':''" @click="weekActiveIndex='2'"><a href="javascript:void (0)">12月 24日<br>星期二</a></li>
            </ul>
        </div>
        <div class="week-list">
            <div class="title">
                <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月18日-星期三</div>
            </div>
            <div class="item"><div class="content">暂无比赛</div></div>
            <div class="title">
                <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月19日-星期四</div></div>
            <div class="item"><div class="content">暂无比赛</div></div>
            <div class="title">
                 <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月20日-星期五</div></div>
            <div class="item"><div class="content">暂无比赛</div></div>
            <div class="title">
                 <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月21日-星期六</div></div>
            <div class="item"><div class="content">暂无比赛</div></div>
            <div class="title">
                 <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月22日-星期日</div></div>
            <div class="item"><div class="content">暂无比赛</div></div>
            <div class="title">
                 <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月23日-星期一</div></div>
            <div class="item"><div class="content">暂无比赛</div></div>
            <div class="title">
                 <span>
                    <svg class="icon icon-size" aria-hidden="true">
                        <use xlink:href="#iconrili"></use>
                    </svg>
                </span>
                <div class="name">2019年12月24日-星期二</div></div>
            <div class="item"><div class="content">暂无比赛</div></div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                activeIndex:'全部游戏',
                weekActiveIndex:'3',
            }
        }
    }
</script>

<style lang="scss" scoped>
    .scheduleMain{
        width: 1150px;
        background: #1b1f2a;
        min-height: 726px;
        padding-bottom: 100px;
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
        .week{
            width: 100%;
            height: 80px;
            ul{
                display: flex;
                align-items: center;
                height: 80px;
                width: 100%;
                justify-content: space-around;
                li{
                    a{
                        width: 120px;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 2px;
                        background: #2c3040;
                        color: #ccc;
                        font-size: 14px;
                    }
                }
                li:hover{
                    a{
                        border: 1px solid #f83b3b;
                        color: #f83b3b;
                    }
                }
                .active{
                   a{
                       border: 1px solid #f83b3b;
                       color: #f83b3b;
                   }
                }
            }
        }
        .week-list{
            width: 100%;
            padding: 0 20px;
            .title{
                margin-top: 30px;
                height: 20px;
                display: flex;
                align-items: center;
                .icon-size{
                    font-size: 14px;
                    margin-right: 4px;
                    color: #cbcccc;
                }
                .name{
                    color: #cbcccc;
                    font-size: 14px;
                }
            }
            .item{
                width: 100%;
                height: 40px;
                background: #2c3040;
                padding: 0 10px;
                margin: 10px 0;
                .content{
                    color: #cbcccc;
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                }
            }
        }
    }
</style>