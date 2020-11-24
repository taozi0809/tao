<template>
    <div class="basketball">
        <Head/>
        <div class="head">
            <ul>
                <li :class="indexActive=='0'?'active':''" @click="handleChangeType('0')">即时</li>
                <li :class="indexActive=='1'?'active':''" @click="handleChangeType('1')">完场</li>
                <li :class="indexActive=='2'?'active':''" @click="handleChangeType('2')">取消</li>
            </ul>
        </div>
        <div class="swiper-container-basketball">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="wrapper" ref="wrapper1">
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in willStartMatchs" :key="item.matchId">
                                    <router-link :to ="{name:'basketballDetail',params :{id:item.matchId}}">
                                        <div class="t1">
                                            <span>{{item.tournamentFullName}} <i>{{item.matchTime | timestampToTime1}}</i></span>
                                            <span>{{item.statusType | statusToName}}</span>
                                        </div>
                                        <div class="con">
                                            <div class="team">
                                                <span><img :src="item.homeLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.homeTeam}}</p>
                                            </div>
                                            <div class="team">
                                                <span><img :src="item.guestLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.guestTeam}}</p>
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
                                    <router-link :to ="{name:'basketballDetail',params :{id:item.matchId}}">
                                        <div class="t1">
                                            <span>{{item.tournamentFullName}} <i>{{item.matchTime | timestampToTime1}}</i></span>
                                            <span>{{item.statusType | statusToName}}</span>
                                        </div>
                                        <div class="con">
                                            <div class="team">
                                                <span><img :src="item.homeLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.homeTeam}}</p>
                                            </div>
                                            <div class="team">
                                                <span><img :src="item.guestLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.guestTeam}}</p>
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
                                    <router-link :to ="{name:'basketballDetail',params :{id:item.matchId}}">
                                        <div class="t1">
                                            <span>{{item.tournamentFullName}} <i>{{item.matchTime | timestampToTime1}}</i></span>
                                            <span>{{item.statusType | statusToName}}</span>
                                        </div>
                                        <div class="con">
                                            <div class="team">
                                                <span><img :src="item.homeLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.homeTeam}}</p>
                                            </div>
                                            <div class="team">
                                                <span><img :src="item.guestLogo" alt="" :onerror="errorDeImg"></span>
                                                <p>{{item.guestTeam}}</p>
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
    import Head from '../../components/head/Head'
    import BScroll from 'better-scroll'
    import Swiper from 'swiper'
    import {mapState, mapMutations} from 'vuex'
    import {basketball_cancel_match,basketball_match_count,basketball_finished_match,basketball_all_or_leagueId_match_im} from "../../service/api";

    export default {
        components:{Head},
        data(){
            return{
                indexActive:0,
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
                viewType1:0,
                viewType2:0,
                viewType3:0,
            }
        },
        created:function(){
            this.basketball_all_or_leagueId_match_im(this.page1,this.pageSize,this.type)
            this.basketball_finished_match(this.page2,this.pageSize)
            this.basketball_cancel_match(this.page3,this.pageSize)

            basketball_match_count().then(res=>{
                console.log('篮球查询所有联赛即将开始的场数:',res)
                if(res.code==0){
                    this.COMPETITIONFILTRATE(res.data)
                }
            })
        },
        mounted:function(){
            let _this = this
            this.swiper = new Swiper ('.swiper-container-basketball', {
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
                        this.basketball_all_or_leagueId_match_im(this.page1,this.pageSize,this.type)
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
                        this.basketball_finished_match(this.page2,this.pageSize)
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
                        this.basketball_cancel_match(this.page3,this.pageSize)
                        this.scroll3.finishPullUp();
                    }
                })
            })
        },
        methods:{
            ...mapMutations(['COMPETITIONFILTRATE']),
            handleChangeType(index){
                this.indexActive = index
                this.swiper.slideTo(index)
            },
            basketball_all_or_leagueId_match_im(page,pageSize,type){
                basketball_all_or_leagueId_match_im(page,pageSize,type).then(res=>{
                    console.log('篮球即时:',res)
                    this.viewType1 = '-1'
                    if(res.code==0){
                        if(res.data.length<this.pageSize){
                            this.isMore1 = false
                        }
                        this.willStartMatchs =[...this.willStartMatchs,...res.data]
                        this.scroll1.refresh()
                    }else{
                        this.viewType1 = '1'
                    }
                })
            },
            basketball_finished_match(page,pageSize){
                basketball_finished_match(page,pageSize).then(res=>{
                    console.log('篮球完场:',res)
                    this.viewType2 = '-1'
                    if(res.code==0){
                        if(res.data.length<this.pageSize){
                            this.isMore2 = false
                        }
                        this.newFinishedMatchs = [...this.newFinishedMatchs,...res.data]
                        this.scroll2.refresh()
                        if(this.newFinishedMatchs.length==0){
                            this.viewType2 = '1'
                        }
                    }else{
                        this.viewType2 = '1'
                    }
                })
            },
            basketball_cancel_match(page,pageSize){
                basketball_cancel_match(page,pageSize).then(res=>{
                    console.log('篮球取消或中断:',res)
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
            },

        },
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    .basketball{
        position: absolute;
        box-sizing: border-box;
        /*border: 1px solid red;*/
        width: 100%;
        top:80px;
        bottom: 0;

    }
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
    .swiper-container-basketball{
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
                        height: 220px;
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
                            .team{
                                display: flex;
                                align-items: center;
                                margin-bottom: 20px;
                                span{
                                    display: block;
                                    width: 50px;
                                    height: 50px;
                                    overflow: hidden;
                                    margin-right: 15px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                p{
                                    font-weight: 600;
                                    color: #333;
                                    font-size: 24px;
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

</style>