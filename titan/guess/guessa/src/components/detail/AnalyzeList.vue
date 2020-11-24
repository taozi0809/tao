<template>
    <div class="analyze-list">
        <div class="nav">
            <div class="box">
                <span :class="status==='history'?'active':''" @click="handleStatus('history')">交战历史</span>
                <span :class="status==='lately'?'active':''" @click="handleStatus('lately')">近期战绩</span>
                <span :class="status==='before'?'active':''" @click="handleStatus('before')">赛前积分</span>
            </div>
            <div class="bot" v-if="status!='before'">
               <!--<p>-->
                   <!--<span>西悉尼流浪者</span>-->
                   <!--<span class="s">1胜</span>-->
                   <!--<span class="p">0平</span>-->
                   <!--<span class="f">3负</span>-->
               <!--</p>-->
               <!--<p>-->
                   <!--<span :class="select==='all'?'active':''" @click="handleSelect('all')">全部</span>-->
                   <!--<span class="c">|</span>-->
                   <!--<span :class="select==='competing'?'active':''" @click="handleSelect('competing')">{{status==='lately'?'主场':'主客同场'}}</span>-->
               <!--</p>-->
            </div>
        </div>
        <div class="title" v-if="status!='before'">
            <span>赛事</span>
            <span>时间</span>
            <span>主队</span>
            <span>比分</span>
            <span>客队</span>
            <span>赛果</span>
        </div>
        <div class="title2" v-if="status==='before'">
            <span>排名</span>
            <span>球队</span>
            <span>胜</span>
            <span>平</span>
            <span>负</span>
            <span>得</span>
            <span>失</span>
            <span>净</span>
            <span>积分</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <div v-if="status=='history'">
                        <li class="item" v-for="(item,index) in twoTeamMatchList" :key="index">
                            <span>{{item.tournamentShortName}}</span>
                            <span>{{item.startDate | timestampToTime2}}</span>
                            <span>{{item.homeTeamName}}</span>
                            <span>{{item.homeScore}}:{{item.guestScore}}</span>
                            <span>{{item.guestTeamName}}</span>
                            <span>{{parseInt(item.homeScore)-parseInt(item.guestScore) | scoreToResult}}</span>
                        </li>
                        <div class="no-data" v-if="twoTeamMatchList.length>0?false:true">无数据</div>
                    </div>
                    <div v-if="status=='lately'">
                        <li class="item" v-for="(item,index) in teamMatchList" :key="index" >
                            <span>{{item.tournamentShortName}}</span>
                            <span>{{item.startDate | timestampToTime2}}</span>
                            <span>{{item.homeTeamName}}</span>
                            <span>{{item.homeScore}}:{{item.guestScore}}</span>
                            <span>{{item.guestTeamName}}</span>
                            <span>{{parseInt(item.homeScore)-parseInt(item.guestScore) | scoreToResult}}</span>
                        </li>
                        <div class="no-data" v-if="teamMatchList.length>0?false:true">无数据</div>
                    </div>


                    <!--<li class="item-before" v-if="status==='before'" v-for="(item,index) in data1">-->
                        <!--<span><i>{{index+1}}</i></span>-->
                        <!--<span>{{item.name}}</span>-->
                        <!--<span>{{item.s}}</span>-->
                        <!--<span>{{item.p}}</span>-->
                        <!--<span>{{item.f}}</span>-->
                        <!--<span>{{item.d}}</span>-->
                        <!--<span>{{item.sq}}</span>-->
                        <!--<span>{{item.j}}</span>-->
                        <!--<span>{{item.jf}}</span>-->
                    <!--</li>-->
                    <li v-if="status=='before'">
                        <div class="no-data">无数据</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {team_match_history,two_team_match_history,football_match_details} from "../../service/api";

    export default {
        data(){
            return{
                status:'history',
                select:'all',
                scroll : null,
                teamMatchList:[],
                twoTeamMatchList:[],
                currentMatchId:'',
                teamId1:'',
                teamId2:'',
            }
        },
        created:function(){
            this.matchId = this.$route.query.matchId

            football_match_details(this.matchId).then(res=>{
                if(res.code==0){
                    this.teamId1 = res.data.homeTeamId
                    this.teamId2 = res.data.guestTeamId
                    this.currentMatchId = res.data.matchId

                    team_match_history(this.currentMatchId,this.teamId1,0).then(res=>{
                        if(res.code=='0'){
                            this.teamMatchList = res.data.teamMatchHistorys
                            console.log('队伍最近的比赛',this.teamMatchList)
                        }
                    })
                    two_team_match_history(this.currentMatchId,this.teamId1,this.teamId2,1).then(res=>{
                        if(res.code=='0'){
                            this.twoTeamMatchList = res.data.teamMatchHistorys
                            console.log('两支队伍最近的比赛:',this.twoTeamMatchList)
                        }
                    })
                }
            })


        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            initScroll(){
                this.scroll = null
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleStatus(i){
                this.status = i
                setTimeout(()=>{
                    this.scroll.refresh()
                },100)
            },
            handleSelect(i){
                this.select = i
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .analyze-list{
        width: 100%;
        height: 100%;
        .nav{
            width: 100%;
            height:160px;
            padding: 15px;
            box-sizing: border-box;
            position: relative;
            @include borderBottom(#E6E6E6);
            .box{
                margin: 0 auto;
                margin-top: 20px;
                width: 480px;
                height:54px ;
                box-sizing: border-box;
                border: 1px solid #34C47C;
                @include flex;
                border-radius: 5px;
                span{
                    display: block;
                    width: 160px;
                    height: 54px;
                    line-height: 54px;
                    color: #34C47C;
                    text-align: center;
                    border-right: 1px solid #34C47C;
                    font-size: 24px;
                }
                span:last-child{
                    border-right: none;
                }
                .active{
                    color: #fff;
                    background: #34C47C;
                }
            }
            .bot{
                @include flexX(space-between);
                padding: 0 20px;
                position: absolute;
                left:0;
                bottom: 15px;
                width: 100%;
                box-sizing: border-box;
                height: 40px;
                p:first-child{
                    span{
                        color: #333;
                        font-size: 20px;
                        height: 50px;
                        line-height: 50px;
                        box-sizing: border-box;
                    }
                    .s{color: #FF4E4E;}
                    .p{color: #5DA2FF;}
                    .f{color: #34C47C;}
                }

                p:last-child{
                    display: flex;
                    align-content: center;
                    font-size: 24px;
                    span{
                        display: block;
                        position: relative;
                        height: 50px;
                        line-height: 50px;
                        box-sizing: border-box;
                    }
                    .c{
                        padding: 0 15px;
                    }
                    .active{
                        color: #FF4E4E;
                    }
                    .active:after{
                        display: block;
                        content: '';
                        width: 100%;
                        height: 3px;
                        border-radius: 5px;
                        background: #FF4E4E;
                        position: absolute;
                        bottom: 0;
                        left:50%;
                        transform: translateX(-50%);
                    }

                }
            }
        }
        .title{
            width: 100%;
            height: 60px;
            display: flex;
            align-content: center;
            @include borderBottom(#E6E6E6);
            span{
                display: block;
                box-sizing: border-box;
                width: 12.5%;
                height: 60px;
                line-height: 60px;
                text-align: center;
                @include ellipsis;
                font-size: 22px;
                color: #333;
                font-weight: 700;
            }
            span:nth-child(3),span:nth-child(5){
                width: 25%;
            }

        }
        .title2{
            width: 100%;
            height: 60px;
            display: flex;
            align-content: center;
            @include borderBottom(#E6E6E6);
            padding: 0 10px;
            box-sizing: border-box;
            span{
                color: #333;
                font-size: 22px;
                font-weight: 700;
                display: block;
                width: 9%;
                height: 60px;
                line-height: 60px;
                text-align: center;
                box-sizing: border-box;
            }
            span:nth-child(2){
                width:28% ;
            }
        }
        .wrapper{
            position: absolute;
            width: 100%;
            top:220px;
            bottom: 0;
            left:0;
            box-sizing: border-box;
            overflow: hidden;
            .content{
                width: 100%;
                box-sizing: border-box;
                padding: 15px 0;
                ul{
                    .item{
                        width: 100%;
                        height: 90px;
                        display: flex;
                        align-content: center;
                        @include borderBottom(#E6E6E6);
                        span{
                            display: block;
                            box-sizing: border-box;
                            width: 12.5%;
                            height: 90px;
                            line-height: 90px;
                            text-align: center;
                            @include ellipsis;
                            font-size: 22px;
                            color: #333;
                        }
                        span:nth-child(3),span:nth-child(5){
                            width: 25%;
                        }
                    }
                    .item-before{
                        width: 100%;
                        height: 60px;
                        display: flex;
                        align-content: center;
                        @include borderBottom(#E6E6E6);
                        padding: 0 10px;
                        box-sizing: border-box;
                        span{
                            color: #333;
                            font-size: 22px;
                            display: block;
                            width: 9%;
                            height: 70px;
                            line-height: 70px;
                            text-align: center;
                            box-sizing: border-box;
                        }
                        span:nth-child(1){
                            @include flex;
                            box-sizing: border-box;
                            i{
                                display: block;
                                width: 30px;
                                height: 30px;
                                border-radius: 3px;
                                text-align: center;
                                line-height: 30px;
                                background: #aaa;
                                color: #fff;
                            }
                        }
                        span:nth-child(2){
                            width:28% ;
                        }
                    }
                }
            }
        }
    }
    .no-data{
        text-align: center;
        margin-top: 100px;
        color: #333;
        font-size: 24px;
    }
</style>