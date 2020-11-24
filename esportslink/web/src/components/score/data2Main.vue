<template>
    <div class="dota2">
        <div class="dota-head">
            <div class="level">
                <a href="javascript:void (0)">
                    <span><img src="../../assets/image/gameIcon/dota2.png" alt=""></span>
                    <div class="name">DOTA2</div>
                    <div class="c">></div>
                </a>
            </div>
            <div class="level">
                <a href="javascript:void (0)">
                    <div class="name">Champions Cup Finals</div>
                    <div class="c">></div>
                </a>
            </div>
            <div class="level">
                <a href="javascript:void (0)">
                    <div class="name">ex-DreamEaters VS Spirit</div>
                </a>
            </div>
        </div>
        <div class="banner">
            <div class="banner-head">
                <div class="time">2019年12月19日 12:45</div>
                <div class="status">已结束</div>
            </div>
            <div class="head-main">
                <div class="l">
                    <div class="l-t">
                        <div class="teamName">Evil Geniuses</div>
                        <span><img src="../../assets/image/league/details/team/1.png" alt=""></span>
                    </div>
                    <div class="l-b">
                        <div class="odd">0.79</div>
                    </div>
                </div>
                <div class="c">
                    <div class="bo">BO3</div>
                    <div class="c-c">
                        <div class="score">2</div>
                        <div class="bi">:</div>
                        <div class="score">0</div>
                    </div>
                    <div class="live">视频直播</div>
                </div>
                <div class="r">
                    <div class="l-t">
                        <div class="teamName">Team Secret</div>
                        <span><img src="../../assets/image/league/details/team/3.png" alt=""></span>
                    </div>
                    <div class="l-b">
                        <div class="odd">1.14</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-head">
            <ul>
                <li :class="navActiveIndex=='对战分析'?'active':''" @click="navActiveIndex='对战分析',recentEchart()"><a href="javascript:void (0);">对战分析</a></li>
                <li :class="navActiveIndex=='指数分析'?'active':''" @click="navActiveIndex='指数分析'"><a href="javascript:void (0);">指数分析</a></li>
                <li :class="navActiveIndex=='第一局'?'active':''" @click="navActiveIndex='第一局'"><a href="javascript:void (0);">第一局</a></li>
            </ul>
            <div class="time-box">
                <div class="txt">刷新倒计时<span>{{time}}</span>秒</div>
            </div>
        </div>

        <div class="battle-analysis" v-if="navActiveIndex=='对战分析'">
            <div class="head">
                <div class="head-l">
                    <div class="item">
                        <span class="winner"><img src="../../assets/image/league/details/team/winner.png" alt="获胜方"></span>
                        <div class="t">获胜方</div>
                    </div>
                    <div class="item">
                        <span><img src="../../assets/image/index/allGameList/designation/lol/first_blood.png" alt=""></span>
                        <div class="t">左对一血</div>
                    </div>
                    <div class="item">
                        <span class="ten"><img src="../../assets/image/index/allGameList/designation/lol/ten_kills.png" alt=""></span>
                        <div class="t">左对十杀</div>
                    </div>
                </div>
                <div class="head-r">
                    <div class="item">
                        <div class="label">查询场次：</div>
                        <div class="options">
                            <a href="javascript:void (0);" class="value">{{sessionsActive}}</a>
                            <span>
                                <svg class="icon icon-size" aria-hidden="true">
                                <use xlink:href="#icontubiaozhizuo-"></use>
                            </svg>
                            </span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">时间<span>></span></div>
                        <a href="javascript:void (0);" class="options">
                            <div class="value">{{timeActive}}</div>
                            <span>
                                <svg class="icon icon-size" aria-hidden="true">
                                <use xlink:href="#icontubiaozhizuo-"></use>
                            </svg>
                            </span>
                        </a>
                    </div>
                    <div class="item">
                        <div class="label">总击杀<span>></span></div>
                        <a href="javascript:void (0);" class="options">
                            <div class="value">{{killActive}}</div>
                            <span>
                                <svg class="icon icon-size" aria-hidden="true">
                                <use xlink:href="#icontubiaozhizuo-"></use>
                            </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="history-title">交手记录</div>
            <div class="history-table">
                <div class="table1">
                    <div class="thead">
                        <div class="a">联赛</div>
                        <div class="b">时间</div>
                        <div class="c">时长</div>
                        <div class="d">战队</div>
                        <div class="e">共计10场</div>
                        <div class="f">战队</div>
                    </div>
                    <ul class="tbody">
                        <li v-for="(item,index) in historyTable1" :key="index"><a href="javascript:void 0;">
                            <div class="a"><span><img :src="item.srca" alt=""></span></div>
                            <div class="b">{{item.b}}</div>
                            <div class="c">{{item.c}} <span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconshangsheng"></use>
                                </svg>
                            </span></div>
                            <div class="d">{{item.d}}<span><img src="../../assets/image/league/details/team/winner.png" alt=""></span></div>
                            <div class="e">
                                <span><img src="../../assets/image/index/allGameList/designation/lol/first_blood.png" alt=""></span>
                                <span><img src="../../assets/image/index/allGameList/designation/lol/ten_kills.png" alt=""></span>
                                <div class="e1">{{item.e}}</div>
                                <div class="e2">{{item.e2}}<span>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#iconshangsheng"></use>
                                    </svg>
                                </span></div>
                            </div>
                            <div class="f">{{item.f}}<span><img src="../../assets/image/league/details/team/winner.png" alt=""></span></div>
                        </a></li>
                    </ul>
                </div>
                <div class="table2">
                    <div class="item-head">
                        <div class="team team1">
                            <div class="box"></div>
                            <div class="name">Vampire</div>
                        </div>
                        <div class="team team2">
                            <div class="box"></div>
                            <div class="name">ETHERL</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">胜率</div>
                        <div class="item-main">
                            <div class="team1" :style="'width:44%;'">44.00%</div>
                            <div class="team2" :style="'width:56%;'">56.00%</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">胜率</div>
                        <div class="item-main">
                            <div class="team1" :style="'width:30%;'">30.00%</div>
                            <div class="team2" :style="'width:70%;'">70.00%</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">胜率</div>
                        <div class="item-main">
                            <div class="team1" :style="'width:50%;'">50.00%</div>
                            <div class="team2" :style="'width:50%;'">50.00%</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">胜率</div>
                        <div class="item-main">
                            <div class="team1" :style="'width:60%;'">60.00%</div>
                            <div class="team2" :style="'width:40%;'">40.00%</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">胜率</div>
                        <div class="item-main">
                            <div class="team1" :style="'width:55%;'">55.00%</div>
                            <div class="team2" :style="'width:45%;'">45.00%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="recent-title">近期战绩</div>
            <div class="recent-table">
                <div class="row1">
                    <div class="table1">
                        <div id="recentEchart" style="width:720px;height:350px;"></div>
                    </div>
                    <div class="table2">
                        <div class="item-head">
                            <div class="a"></div>
                            <div class="b">SAG</div>
                            <div class="c">CDEC</div>
                        </div>
                        <div class="item">
                            <div class="a">比赛数据</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                        <div class="item">
                            <div class="a">当前统计</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                        <div class="item">
                            <div class="a">胜率</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                        <div class="item">
                            <div class="a">一血</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                        <div class="item">
                            <div class="a">十杀</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                        <div class="item">
                            <div class="a">时间>38</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                        <div class="item">
                            <div class="a">击杀>56</div>
                            <div class="b">10<span>(100%)</span></div>
                            <div class="c">10<span>(100%)</span></div>
                        </div>
                    </div>
                </div>
                <div class="row2">
                    <div class="table1">
                        <div class="thead">
                            <div class="a">联赛</div>
                            <div class="b">时间</div>
                            <div class="c">时长</div>
                            <div class="d"></div>
                            <div class="e">共计10场</div>
                            <div class="f">战队</div>
                        </div>
                        <ul class="tbody">
                            <li v-for="(item,index) in historyTable1" :key="index"><a href="javascript:void 0;">
                                <div class="a"><span><img :src="item.srca" alt=""></span></div>
                                <div class="b">{{item.b}}</div>
                                <div class="c">{{item.c}} <span>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#iconshangsheng"></use>
                                    </svg>
                                    </span>
                                </div>
                                <div class="d">{{item.d}}<span><img src="../../assets/image/league/details/team/winner.png" alt=""></span></div>
                                <div class="e">
                                    <span><img src="../../assets/image/index/allGameList/designation/lol/first_blood.png" alt=""></span>
                                    <span><img src="../../assets/image/index/allGameList/designation/lol/ten_kills.png" alt=""></span>
                                    <div class="e1">{{item.e}}</div>
                                </div>
                                <div class="f">{{item.d}}<span><img src="../../assets/image/league/details/team/winner.png" alt=""></span></div>
                            </a></li>
                        </ul>
                    </div>
                    <div class="table2">
                        <div class="thead">
                            <div class="a">联赛</div>
                            <div class="b">时间</div>
                            <div class="c">时长</div>
                            <div class="d"></div>
                            <div class="e">共计10场</div>
                            <div class="f">战队</div>
                        </div>
                        <ul class="tbody">
                            <li v-for="(item,index) in historyTable1" :key="index"><a href="javascript:void 0;">
                                <div class="a"><span><img :src="item.srca" alt=""></span></div>
                                <div class="b">{{item.b}}</div>
                                <div class="c">{{item.c}} <span>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#iconshangsheng"></use>
                                    </svg>
                                    </span>
                                </div>
                                <div class="d">{{item.d}}<span><img src="../../assets/image/league/details/team/winner.png" alt=""></span></div>
                                <div class="e">
                                    <span><img src="../../assets/image/index/allGameList/designation/lol/first_blood.png" alt=""></span>
                                    <span><img src="../../assets/image/index/allGameList/designation/lol/ten_kills.png" alt=""></span>
                                    <div class="e1">{{item.e}}</div>
                                </div>
                                <div class="f">{{item.d}}<span><img src="../../assets/image/league/details/team/winner.png" alt=""></span></div>
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-analysis" v-if="navActiveIndex=='指数分析'">
            <div>
                <span><img src="../../assets/image/score/dota2/no_odds.png" alt=""></span>
                <div class="txt">暂时没有读取到任何指数，去看看其他比赛吧！</div>
            </div>
        </div>
        <div class="first-round" v-if="navActiveIndex=='第一局'">
            <div class="team-score">
                <div class="l"></div>
                <div class="c"></div>
                <div class="r"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                time:3,
                navActiveIndex:'对战分析',
                sessionsActive:'5',
                timeActive:'35',
                killActive:'35',
                historyTable1:[
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                    {
                        srca:require('../../assets/image/score/dota2/history/1/a.jpg'),
                        b:'2019-12-20',
                        c:'30分53秒',
                        d:'Vampire',
                        e:'(6:10)',
                        e2:'50:29',
                        f:'ETHERL',
                    },
                ],
                historyTable2:[],
            }
        },
        mounted() {
            setInterval(()=>{
                this.time--
                if(this.time<0){this.time=3}
            },1000)
            this.recentEchart()
        },
        methods:{
            recentEchart(){
                setTimeout(()=>{
                    var myChart = echarts.init(document.getElementById('recentEchart'));
                    var option = {
                        color:['#38a7f0','#f83b3b','#777'],
                        backgroundColor:'#282e3e',
                        legend:{
                            type:'plain',
                            top:'10px',
                            textStyle:{
                                fontWeight:'bold',
                            },
                            data: [{
                                name:'SAG',
                                icon: 'rect',
                                textStyle: {
                                    color: '#38a7f0'
                                }
                            },{
                                name:'CDEC',
                                icon: 'rect',
                                textStyle: {
                                    color: '#f83b3b'
                                }
                            }]
                        },
                        tooltip:{
                            trigger:'axis',
                            borderColor:'rgba(255,255,255,.7)',
                            borderWidth:1,
                            backgroundColor:'#1b1f2a',
                            axisPointer:{
                                type:'line',
                                lineStyle:{
                                    type:'dashed',
                                }
                            },
                            formatter: function (seriesData, ticket, callback) {
                                var showHtm="";
                                for(var i=0;i<seriesData.length;i++){
                                    //名称
                                    var name = seriesData[i].seriesName;
                                    //x轴名称
                                    var text = seriesData[i].name;
                                    //值
                                    var value = seriesData[i].value;
                                    //小圆点
                                    var m1='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#38a7f0"></span>'
                                    var m2='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f83b3b"></span>'

                                    if(i==0){
                                        showHtm = text+ '<br>';
                                    }
                                    var m = name=='SAG'?m1:m2
                                    showHtm+= m + name + ': ' + value+'.00%'+'<br>'
                                }
                                return showHtm;
                            }

                        },
                        xAxis: {
                            type: 'category',
                            data: ['胜率', '一血', '十杀', '时间>38', '总击杀>56'],
                            axisLine:{
                                lineStyle:{
                                    color: '#777'
                                }
                            },
                        },
                        yAxis: {
                            type:'value',
                            axisLine:{
                                lineStyle:{
                                    color: '#777'
                                }
                            },
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %'
                            },
                            show: true,
                            splitLine:{
                                lineStyle:{
                                    color:'#777',
                                    type:'dashed',
                                    opacity:0.3,
                                }
                            },
                        },
                        series: [{
                            data:  [70,40,90,20,10],
                            type: 'line',
                            name:'SAG',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter:'{c}%'
                                    }
                                },
                            },
                        },{
                            data:  [50,90,60,20,10],
                            type: 'line',
                            name:'CDEC',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter:'{c}%'
                                    }
                                },
                            },
                        }]
                    };
                    myChart.setOption(option,true);
                },100)

            },
        }
    }
</script>

<style lang="scss" scoped>
    .dota2{
        width: 1150px;
        margin: 0 10px;
        min-height: 726px;
        background: #1b1f2a;
        .dota-head{
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
        .banner{
            width: 100%;
            height: 190px;
            background: url('../../assets/image/score/dota2/match_dota2_bg.png') no-repeat;
            background-size: cover;
            padding: 10px 20px;
            .banner-head{
                width: 100%;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .time{
                    margin-right: 10px;
                    color: #ddd;
                    font-size: 12px;
                    height: 20px;
                    line-height: 20px;
                }
                .status{
                    height: 20px;
                    line-height: 20px;
                    color: #777;
                    font-size: 12px;
                }
            }
            .head-main{
                width: 100%;
                display: flex;
                align-items: center;
                .l,.r{
                    width: 460px;
                    height: 130px;
                    /*border: 1px solid red;*/
                    padding: 10px;
                    .l-t{
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        height: 100px;
                        width: 100%;
                        .teamName{
                            width: 180px;
                            height: 100px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #ddd;
                            font-size: 16px;
                        }
                        span{
                            display: block;
                            width: 65px;
                            height: 65px;
                            overflow: hidden;
                            img{
                                width: 100%;
                            }
                        }
                    }
                    .l-b{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        .odd{
                            width: 65px;
                            height: 20px;
                            line-height: 20px;
                            color: #83cf39;
                            font-size: 13px;
                            text-align: center;
                        }
                    }
                }
                .r{
                    .l-t{
                        flex-direction: row-reverse;
                    }
                    .l-b{
                        justify-content: flex-start;
                    }
                }
                .c{
                    width: 190px;
                    height: 110px;
                    /*border: 1px solid red;*/
                    display: flex;
                    align-items: center;
                    position: relative;
                    .bo{
                        text-align: center;
                        color: #ddd;
                        font-size: 14px;
                        height: 20px;
                        line-height: 20px;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 0;
                    }
                    .c-c{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .score{
                            width: 80px;
                            height: 30px;
                            line-height: 30px;
                            color: #ddd;
                            font-size: 20px;
                            text-align: center;
                        }
                        .bi{
                            width: 30px;
                            height: 30px;
                            color: #ddd;
                            font-size: 20px;
                            line-height: 30px;
                            text-align: center;
                        }
                    }
                    .live{
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 0;
                        padding: 6px 15px;
                        color: #f83b3b;
                        cursor: pointer;
                        background: transparent;
                        border: 1px solid #f83b3b;
                    }
                    .live:hover{
                        border: 1px solid #f83b3b;
                        box-shadow: 0 0 8px #f83b3b;
                        -webkit-transition: all .5s ease;
                        -moz-transition: all .5s ease;
                        transition: all .5s ease;
                        color: #f83b3b;
                    }

                }

            }
        }
        .nav-head{
            width: 100%;
            height: 42px;
            background: #141821;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: 5px;
            ul{
                display: flex;
                align-items: center;
                li{
                    border-top: 2px solid #141821;
                    a{
                        color: #afb0b2;
                        font-size: 14px;
                        display: block;
                        width: 120px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                    }
                }
                .active{
                    border-top: 2px solid #f83b3b;
                    color: #ddd;
                }
                li:hover{
                    a{
                        color: #ddd;
                    }
                }
            }
            .time-box{
                .txt{
                    color: #9f9f9f;
                    span{
                        color: #f83b3b;
                    }
                }
            }
        }
        .battle-analysis{
            padding: 20px 30px;
            .head{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .head-l{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .item{
                        display: flex;
                        align-items: center;
                        margin-right: 20px;
                        span{
                            display: block;
                            width: 14px;
                            height: 14px;
                            overflow: hidden;
                            margin-right: 5px;
                        }
                        .winner{
                            width: 18px;
                            height: 18px;
                            position: relative;
                            top: 2px;
                        }
                        .ten{
                            width: 12px;
                            height: 12px;
                        }
                        .t{
                            line-height: 24px;
                            color: #999;
                        }
                    }
                }
                .head-r{
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    .item{
                        height: 24px;
                        display: flex;
                        align-items: center;
                        margin-left: 15px;
                        .label{
                            line-height: 24px;
                            color: #999;
                            height: 24px;
                            span{
                                margin:0 3px;
                            }
                        }
                        .options{
                            width: 60px;
                            height: 24px;
                            border: 1px solid #667485;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding-left: 10px;
                            padding-right: 3px;
                            .value{
                                width: 100%;
                                color: #ccc;
                                font-size: 12px;
                            }
                            span{
                                width: 14px;
                                height: 14px;
                                overflow: hidden;
                                display: block;
                                flex-shrink: 0;
                                position: relative;
                                top: -1px;
                                .icon-size{
                                    font-size: 12px;
                                    color: #666;
                                }
                            }
                        }
                    }
                }
            }
            .history-title,.recent-title{
                width: 100%;
                font-size: 24px;
                color: #aaa;
                text-shadow: 3px 3px 3px #000;
                margin: 20px 10px;
                text-align: center;
            }
            .history-table{
                display: flex;
                justify-content: space-between;
                .table1{
                    width: 720px;
                    height: 360px;
                    .thead{
                        display: flex;
                        align-items: center;
                        background: #141821;
                        .a{
                            width: 70px;
                            height: 34px;
                            line-height: 34px;
                            color: #999;
                            font-size: 12px;
                            text-align: center;
                        }
                        .b{
                            text-align: center;
                        }
                        .b,.c,.d,.f{
                            width: 100px;
                            height: 34px;
                            line-height: 34px;
                            color: #999;
                            font-size: 12px;
                        }
                        .e{
                            width: 240px;
                            height: 34px;
                            line-height: 34px;
                            color: #999;
                            font-size: 12px;
                        }

                    }
                    .tbody{
                        overflow-y: scroll;
                        height: 326px;
                        li{
                            a{
                                display: flex;
                                align-items: center;
                                background: #282e3e;
                                margin-bottom: 2px;
                                .a{
                                    width: 70px;
                                    height: 46px;
                                    padding: 4px 2px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    span{
                                        display: block;
                                        width: 40px;
                                        height: 24px;
                                        overflow: hidden;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                                .b,.c,.d,.f{
                                    width: 100px;
                                }
                                .b{
                                    text-align: center;
                                    color: #777;
                                    font-size: 12px;
                                    width: 100px;
                                }
                                .c{
                                    color: #ccc;
                                    font-size: 12px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        display: block;
                                        width: 14px;
                                        height: 14px;
                                        margin-left: 3px;
                                        position: relative;
                                        top: -2px;
                                        .icon{
                                            color: #83cf39;
                                            font-size: 12px;
                                        }
                                    }
                                }
                                .d{
                                    color: #ccc;
                                    font-size: 13px;
                                    position: relative;
                                    span{
                                        display: block;
                                        width: 16px;
                                        height: 16px;
                                        position: absolute;
                                        top: -8px;
                                        left: -7px;
                                        z-index: 1;
                                        transform:rotate(-45deg);
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                                .e{
                                    width: 240px;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        width: 14px;
                                        height: 14px;
                                        display: block;
                                        margin-right: 3px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    .e1{
                                        color: #ccc;
                                        font-size: 12px;
                                        margin-right: 30px;
                                        margin-left: 5px;
                                    }
                                    .e2{
                                        color: #ccc;
                                        font-size: 14px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            display: block;
                                            width: 14px;
                                            height: 14px;
                                            margin-left: 3px;
                                            position: relative;
                                            top: -5px;
                                            .icon{
                                                color: #83cf39;
                                                font-size: 12px;
                                            }
                                        }
                                    }
                                }
                                .f{
                                    color: #ccc;
                                    font-size: 13px;
                                    position: relative;
                                    span{
                                        display: block;
                                        width: 16px;
                                        height: 16px;
                                        position: absolute;
                                        top: -8px;
                                        left: -7px;
                                        z-index: 1;
                                        transform:rotate(-45deg);
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                        li:hover{
                            a{
                                .c,.d,.f{
                                    color: #fff;
                                }
                                .e{
                                    .e1,.e2{
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                    .tbody::-webkit-scrollbar {// 滚动背景
                        width: 10px;
                        background: #282e3e;
                    }
                    .tbody::-webkit-scrollbar-track {
                        border-radius: 0;
                    }
                    .tbody::-webkit-scrollbar-thumb {// 滚动条
                        transition: all .2s;
                        background: #393d42;
                    }
                }
                .table2{
                    width: 350px;
                    height: 360px;
                    background: #282e3e;
                    .item-head{
                        width: 190px;
                        height: 32px;
                        display: flex;
                        align-items:flex-end;
                        margin: 0 auto;
                        .team{
                            display: flex;
                            align-items: center;
                            margin:0 10px;
                            .box{
                                width:24px;
                                height: 14px;
                                margin-right: 5px;
                            }
                            .name{
                                 font-size: 12px;
                            }
                        }
                        .team1{
                            .box{
                               background: #3398db;
                            }
                            .name{
                                color: #3398db;
                            }
                        }
                        .team2{
                            .box{
                                background:  #f83b3b;
                            }
                            .name{
                                color:  #f83b3b;
                            }
                        }
                    }
                    .item{
                        width: 100%;
                        height: 60px;
                        padding: 0 20px;
                        margin-top: 6px;
                        .item-title{
                            height: 34px;
                            line-height: 34px;
                            width: 100%;
                            display: flex;
                            align-items: flex-end;
                            color: #cbcccc;
                            font-size: 14px;
                            justify-content: center;
                        }
                        .item-main{
                            width: 100%;
                            height: 18px;
                            display: flex;
                            align-items: center;
                            .team1{
                                background:#3398db ;
                                height: 14px;
                                line-height: 14px;
                                color: #fff;
                                text-align: center;
                            }
                            .team2{
                                background:#f83b3b ;
                                height: 14px;
                                line-height: 14px;
                                text-align: center;
                                color: #fff;
                            }
                        }
                    }
                }
            }
            .recent-table{
                .row1{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    .table1{
                        width: 720px;
                        height: 350px;
                        /*border: 1px solid red;*/
                    }
                    .table2{
                        width: 350px;
                        height: 350px;
                        .item-head,.item{
                            display: flex;
                            align-items: center;
                            background: #141821;
                            .a{
                                width:116px;
                                color:#ccc;
                                font-size: 14px;
                                text-align: center;
                            }
                            .b,.c{
                                width: 116px;
                                height: 35px;
                                line-height: 35px;
                                color: #999;
                                font-size: 12px;
                                font-weight: bold;
                                text-align: center;
                            }
                        }
                        .item{
                            background: #282e3e;
                            margin-bottom: 2px;
                            height: 43px;
                            .b,.c{
                                color:#ccc;
                                font-size: 14px;
                                font-weight: normal;
                                span{
                                    color: #777;
                                    padding-left: 5px;
                                }
                            }
                        }
                    }
                }
                .row2{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    .table1,.table2{
                        width: 535px;
                        .thead{
                            display: flex;
                            align-items: center;
                            background: #141821;
                            .a{
                                width: 50px;
                                height: 34px;
                                line-height: 34px;
                                color: #999;
                                font-size: 12px;
                                text-align: center;
                            }
                            .b,.c{
                                text-align: center;
                            }
                            .b,.c,.d,.f{
                                width: 80px;
                                height: 34px;
                                line-height: 34px;
                                color: #999;
                                font-size: 12px;
                            }
                            .f{
                                width: 85px;
                            }
                            .e{
                                width: 160px;
                                height: 34px;
                                line-height: 34px;
                                color: #999;
                                font-size: 12px;
                            }

                        }
                        .tbody{
                            li{
                                a{
                                    display: flex;
                                    align-items: center;
                                    background: #282e3e;
                                    margin-bottom: 2px;
                                    .a{
                                        width: 50px;
                                        height: 46px;
                                        padding: 4px 2px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        span{
                                            display: block;
                                            width: 40px;
                                            height: 24px;
                                            overflow: hidden;
                                            img{
                                                width: 100%;
                                            }
                                        }
                                    }
                                    .b,.c,.d,.f{
                                        width: 80px;
                                    }
                                    .b{
                                        text-align: center;
                                        color: #777;
                                        font-size: 12px;
                                    }
                                    .c{
                                        color: #ccc;
                                        font-size: 12px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            display: block;
                                            width: 14px;
                                            height: 14px;
                                            margin-left: 3px;
                                            position: relative;
                                            top: -2px;
                                            .icon{
                                                color: #83cf39;
                                                font-size: 12px;
                                            }
                                        }
                                    }
                                    .d{
                                        color: #ccc;
                                        font-size: 13px;
                                        position: relative;
                                        span{
                                            display: block;
                                            width: 16px;
                                            height: 16px;
                                            position: absolute;
                                            top: -8px;
                                            left: -7px;
                                            z-index: 1;
                                            transform:rotate(-45deg);
                                            img{
                                                width: 100%;
                                            }
                                        }
                                    }
                                    .e{
                                        width: 160px;
                                        display: flex;
                                        align-items: center;
                                        span{
                                            width: 14px;
                                            height: 14px;
                                            display: block;
                                            margin-right: 3px;
                                            img{
                                                width: 100%;
                                            }
                                        }
                                        .e1{
                                            color: #ccc;
                                            font-size: 12px;
                                            margin-right: 30px;
                                            margin-left: 5px;
                                        }
                                        .e2{
                                            color: #ccc;
                                            font-size: 14px;
                                            display: flex;
                                            align-items: center;
                                            span{
                                                display: block;
                                                width: 14px;
                                                height: 14px;
                                                margin-left: 3px;
                                                position: relative;
                                                top: -5px;
                                                .icon{
                                                    color: #83cf39;
                                                    font-size: 12px;
                                                }
                                            }
                                        }
                                    }
                                    .f{
                                        color: #ccc;
                                        font-size: 13px;
                                        position: relative;
                                        width: 85px;
                                        span{
                                            display: block;
                                            width: 16px;
                                            height: 16px;
                                            position: absolute;
                                            top: -8px;
                                            left: -7px;
                                            z-index: 1;
                                            transform:rotate(-45deg);
                                            img{
                                                width: 100%;
                                            }
                                        }
                                    }
                                }
                            }
                            li:hover{
                                a{
                                    .c,.d,.f{
                                        color: #fff;
                                    }
                                    .e{
                                        .e1,.e2{
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
        .index-analysis{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 280px;
            flex-wrap: wrap;
            span{
                margin: 0 auto;
                display: block;
                margin-bottom: 20px;
                width: 188px;
                img{
                    width: 100%;
                }
            }
            .txt{
                text-align: center;
                color: #cbcccc;
                font-size: 14px;
            }
        }
        .first-round{
            padding: 20px 30px;
            .team-score{
                width: 100%;
                height: 40px;

            }
        }
    }
</style>