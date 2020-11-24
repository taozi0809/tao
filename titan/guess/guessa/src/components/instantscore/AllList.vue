<template>
    <div class="allList">
        <div class="head">
            <ul>
                <li :class="indexActive=='0'?'active':''" @click="handleChangeType('0')">即时</li>
                <li :class="indexActive=='1'?'active':''" @click="handleChangeType('1')">完场</li>
                <li :class="indexActive=='2'?'active':''" @click="handleChangeType('2')">取消</li>
            </ul>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="wrapper" ref="wrapper1">
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in willStartMatchs" :key="item.matchId">
                                    <router-link :to ="{path:'/gameDetail',query:{matchId:item.matchId}}">
                                        <div class="t1">
                                            <span>{{item.tournamentShortName}} <i>{{item.startDate | timestampToTime1}}</i></span>
                                            <span>{{item.statusType | statusToName}}</span>
                                        </div>
                                        <div class="con">
                                            <div class="l">
                                                <span><img :src="item.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.homeTeamName}}</p>
                                            </div>
                                            <div class="c">
                                                <p v-if="item.statusType=='inprogress'">{{item.homeScore}} : {{item.guestScore}}</p>
                                                <p v-if="item.statusType!='inprogress'">vs</p>
                                            </div>
                                            <div class="r">
                                                <span><img :src="item.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.guestTeamName}}</p>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="loading" v-if="viewType1=='0'">
                        <span><img src="../../assets/img/loading2.png" alt=""></span>
                        <p>加载中</p>
                    </div>
                    <div class="no-data" v-if="viewType1=='1'">
                        <span><img src="../../assets/img/no-data.png" alt=""></span>
                        <p>无数据</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="wrapper" ref="wrapper2">
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in newFinishedMatchs" :key="item.matchId">
                                    <router-link :to ="{path:'/gameDetail',query:{matchId:item.matchId}}">
                                        <div class="t1">
                                            <span>{{item.tournamentShortName}} <i>{{item.startDate | timestampToTime1}}</i></span>
                                            <span>{{item.statusType | statusToName}}</span>
                                        </div>
                                        <div class="con">
                                            <div class="l">
                                                <span><img :src="item.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.homeTeamName}}</p>
                                            </div>
                                            <div class="c">
                                                <p>{{item.homeScore}} : {{item.guestScore}}</p>
                                            </div>
                                            <div class="r">
                                                <span><img :src="item.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.guestTeamName}}</p>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="loading" v-if="viewType2=='0'">
                        <span><img src="../../assets/img/loading2.png" alt=""></span>
                        <p>加载中</p>
                    </div>
                    <div class="no-data" v-if="viewType2=='1'">
                        <span><img src="../../assets/img/no-data.png" alt=""></span>
                        <p>无数据</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="wrapper" ref="wrapper3">
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in cancelMatchs" :key="item.matchId">
                                    <router-link :to ="{path:'/gameDetail',query:{matchId:item.matchId}}">
                                        <div class="t1">
                                            <span>{{item.tournamentShortName}} <i>{{item.startDate | timestampToTime1}}</i></span>
                                            <span>{{item.statusType | statusToName}}</span>
                                        </div>
                                        <div class="con">
                                            <div class="l">
                                                <span><img :src="item.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.homeTeamName}}</p>
                                            </div>
                                            <div class="c">
                                                <p>vs</p>
                                            </div>
                                            <div class="r">
                                                <span><img :src="item.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.guestTeamName}}</p>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="loading" v-if="viewType3=='0'">
                        <span><img src="../../assets/img/loading2.png" alt=""></span>
                        <p>加载中</p>
                    </div>
                    <div class="no-data" v-if="viewType3=='1'">
                        <span><img src="../../assets/img/no-data.png" alt=""></span>
                        <p>无数据</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import Swiper from 'swiper';
    import {mapState, mapMutations} from 'vuex'
    import {football_recent_finished_mactch,football_all_or_league_ids_start_mactch,
        football_all_match_list,football_cancel_match} from "../../service/api";

    export default {
        data(){
            return{
                errorDeImg:'this.src="' + require('../../assets/img/de-img.png') + '"',
                scroll1:null,
                scroll2:null,
                scroll3:null,
                swiper:null,
                newFinishedMatchs:[],
                willStartMatchs:[],
                cancelMatchs:[],
                page1:1,
                page2:1,
                page3:1,
                pageSize:10,
                isMore1:true,
                isMore2:true,
                isMore3:true,
                type:1,
                leagueIds:[],
                indexActive:0,
                viewType1:0,
                viewType2:0,
                viewType3:0,

            }
        },
        computed:{
            ...mapState(['competitionFiltrateIdArr']),
        },
        created:function(){
            this.get_football_all_or_league_ids_start_mactch(this.type,this.leagueIds,this.page1,this.pageSize)
            this.get_football_recent_finished_mactch(this.page2,this.pageSize)
            this.football_cancel_match(this.page3,this.pageSize)

            football_all_match_list().then(res=>{
                console.log('查询所有联赛即将开始的场数:',res)
                if(res.code==0){
                    this.COMPETITIONFILTRATE(res.data)
                }
            })
        },
        mounted:function(){
            let _this = this
            this.swiper = new Swiper ('.swiper-container', {
                threshold : 30,
                direction: 'horizontal',
                hashNavigation: {
                    watchState: true,
                },
                on:{
                    slideChangeTransitionStart:function(){
                        _this.indexActive = this.activeIndex
                    },
                }
            })
            this.$nextTick(() => {
                this.scroll1 = new BScroll(this.$refs.wrapper1, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    pullUpLoad: {
                        threshold: -30
                    },
                })
                this.scroll1.on('pullingUp', () => {
                    if(this.isMore1){
                        this.page1++
                        this.get_football_all_or_league_ids_start_mactch(this.type,this.leagueIds,this.page1,this.pageSize)
                        this.scroll1.finishPullUp();
                    }
                })
                this.scroll2 = new BScroll(this.$refs.wrapper2, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    pullUpLoad: {
                        threshold: -30
                    },
                })
                this.scroll2.on('pullingUp', () => {
                    if(this.isMore2){
                        this.page2++
                        this.this.get_football_recent_finished_mactch(this.page2,this.pageSize)
                        this.scroll2.finishPullUp();
                    }
                })
                this.scroll3 = new BScroll(this.$refs.wrapper3, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    pullUpLoad: {
                        threshold: -30
                    },
                })
                this.scroll3.on('pullingUp', () => {
                    if(this.isMore3){
                        this.page3++
                        this.football_cancel_match(this.page3,this.pageSize)
                        this.scroll3.finishPullUp();
                    }
                })
            })


        },
        methods:{
            ...mapMutations(['COMPETITIONFILTRATE']),
            handleChangeType(index){
                this.indexActive = index
                this.swiper.slideTo(index);
            },
            get_football_all_or_league_ids_start_mactch(type,leagueIds,page,pageSize){
                football_all_or_league_ids_start_mactch(type,leagueIds,page,pageSize).then(res=>{
                    console.log('查询全部列表：',res)
                    this.viewType1 = '-1'
                    if(res.code==0){
                        if(res.data.willStartMatchs.length<this.pageSize){
                            this.isMore1 = false
                        }
                        this.willStartMatchs =[...this.willStartMatchs,...res.data.willStartMatchs]
                        this.scroll1.refresh()
                    }else{
                        this.viewType1 = '1'
                    }
                })
            },
            get_football_recent_finished_mactch(page,pageSize){
                football_recent_finished_mactch(page,pageSize).then(res=>{
                    console.log('最近结束的比赛:',res)
                    this.viewType2 = '-1'
                    if(res.code==0){
                        if(res.data.newFinishedMatchs.length<this.pageSize){
                            this.isMore2 = false
                        }
                        this.newFinishedMatchs = [...this.newFinishedMatchs,...res.data.newFinishedMatchs]
                        this.scroll2.refresh()
                        if(this.newFinishedMatchs.length==0){
                            this.viewType2 = '1'
                        }
                    }else{
                        this.viewType2 = '1'
                    }
                })
            },
            football_cancel_match(page,pageSize){
                football_cancel_match(page,pageSize).then(res=>{
                    console.log('取消或中断的比赛：',res)
                    this.viewType3 = '-1'
                    if(res.code==0){
                        if(res.data.length<this.pageSize){
                            this.isMore3 = false
                        }
                        this.cancelMatchs = [...this.cancelMatchs,...res.data]
                        this.scroll3.refresh()
                        if(this.cancelMatchs.length==0){
                            this.viewType3 = '1'
                        }
                    }else{
                        this.viewType3 = '1'
                    }
                })
            }
        },
        watch:{
            competitionFiltrateIdArr(newValue,oldValue){
                if(newValue!=oldValue&&newValue.length>0){
                    this.type=2
                    this.page1 = 1
                    this.isMore1=true
                    this.leagueIds = newValue
                    this.willStartMatchs=[]
                    this.get_football_all_or_league_ids_start_mactch(this.type,this.leagueIds,this.page1,this.pageSize)
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .allList{
        width: 100%;
        height: 100%;
        .head{
            width: 100%;
            height: 80px;
            ul{
                width: 100%;
                display: flex;
                align-items: center;
                li{
                    width: 33.33%;
                    text-align: center;
                    font-size: 28px;
                    color: #333;
                    height: 80px;
                    line-height: 80px;
                    position: relative;
                }
                .active{
                    color:#34c47c;
                }
                .active:after{
                    content: "";
                    display: block;
                    position: absolute;
                    height: 4px;
                    width: 80px;
                    background: #34c47c;
                    left:50%;
                    transform: translateX(-50%);
                    bottom: 4px;
                    border-radius: 5px;
                }
            }
        }
        .swiper-container{
            width: 100%;
            position: absolute;
            top:80px;
            bottom: 0;
            overflow: hidden;
            box-sizing: border-box;
            left:0;
            .swiper-slide{
                position: relative;
                .no-data{
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    color: #333;
                    font-size: 28px;
                }
                .no-character{
                    display: block;
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    width: 140px;
                    img{
                        width: 100%;
                    }
                }
                .ball-pack{
                    margin-top: 20px;
                    display: block;
                    width:100%;
                    height:390px;
                    background: url("../../assets/img/detail/ball-pack.png") no-repeat;
                    background-size: 100% 100%;
                    @include flex;
                    p{
                        color: #fff;
                        font-size: 30px;
                        font-weight: 700;
                    }
                }

            }
        }

        .wrapper{
            width: 100%;
            position: absolute;
            top:0;
            bottom: 0;
            left:0;
            overflow: hidden;
            /*border: 1px solid red;*/
            box-sizing: border-box;
            .content{
                width: 100%;
                box-sizing: border-box;
                /*padding: 15px 0;*/
                ul{
                    li{
                        a{
                            width: 100%;
                            box-sizing: border-box;
                            padding: 18px 22px;
                            height: 250px;
                            display: block;
                            /*border: 1px solid red;*/
                            .t1{
                                width: 100%;
                                padding-bottom: 30px;
                                @include flexX(space-between);
                                span:nth-child(1){
                                    color: #34C47C;
                                    font-size: 26px;
                                    font-weight: 600;
                                    i{
                                        color: #999999;
                                        font-size: 26px;
                                        padding-left: 10px;
                                    }
                                }
                                span:nth-child(2){
                                    color: #999999;
                                    font-size: 24px;
                                }
                            }
                            .con{
                                width: 100%;
                                display: flex;
                                align-items: center;
                                .l,.r{
                                    width: 40%;
                                    justify-content: flex-end;
                                    @include flexY(center);
                                    span{
                                        width:100px;
                                        height:100px;
                                        box-sizing: border-box;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        margin: 0 auto;
                                        overflow: hidden;
                                        border-radius: 50%;
                                        img{
                                            height: 100%;
                                        }
                                    }
                                    p{
                                        color: #333;
                                        font-size: 24px;
                                        font-weight: bold;
                                        text-align: center;
                                        padding-top: 20px;
                                    }
                                }
                                .c{
                                    width: 20%;
                                    box-sizing: border-box;
                                    @include flexY(center);
                                    p{
                                        color: #333;
                                        text-align: center;
                                        font-size: 42px;
                                        font-weight: 700;
                                    }
                                }
                            }
                        }
                    }
                    .new-game{
                        width: 100%;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        background:#cc8f91 ;
                        color: #fff;
                        font-size: 24px;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }

        .loading,.no-data{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction:column;
            width: 100%;
            height: 100%;
            color: #333;
            font-size: 28px;
            span{
                display: block;
                width: 50px;
                margin-bottom: 20px;
                img{
                    width: 100%;
                }
            }
            p{
                color: #bfbfbf;
                font-size: 24px;
            }
        }
        .loading{
            img{
                -webkit-animation:haha1 1s linear infinite;
            }
        }
        @-webkit-keyframes haha1 {
            0% {
                -webkit-transform: rotate(0deg);
            }

            25% {
                -webkit-transform: rotate(90deg);
            }

            50% {
                -webkit-transform: rotate(180deg);
            }

            75% {
                -webkit-transform: rotate(270deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }
    }

</style>