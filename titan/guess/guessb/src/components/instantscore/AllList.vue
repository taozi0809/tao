<template>
    <div class="allList">
        <div class="head">
            <!--<ul>-->
                <!--<li :class="indexActive=='1'?'active':''" @click="handleChangeType('1')">即时</li>-->
                <!--<li :class="indexActive=='2'?'active':''" @click="handleChangeType('2')">完场</li>-->
                <!--<li :class="indexActive=='3'?'active':''" @click="handleChangeType('3')">取消</li>-->
            <!--</ul>-->

            <!--<tab>-->
                <!--<tab-item @on-item-click="handler"></tab-item>-->
            <!--</tab>-->
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="(item,index) in willStartMatchs" :key="item.matchId">
                        <router-link :to ="{name:'gameDetail',params :{id:item.matchId}}">
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
                    <div class="new-game" v-if="isShow">最新赛果</div>
                    <li v-for="(item,index) in newFinishedMatchs" :key="item.matchId" v-if="isShow">
                        <router-link :to ="{name:'gameDetail',params :{id:item.matchId}}">
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
    </div>

</template>
<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'
    // import { Tab, TabItem } from 'vux'
    import {football_recent_finished_mactch,football_all_or_league_ids_start_mactch,football_all_match_list} from "../../service/api";

    export default {
        // components:{Tab, TabItem},
        data(){
            return{
                errorDeImg:'this.src="' + require('../../assets/img/de-img.png') + '"',
                scroll:null,
                newFinishedMatchs:[],
                willStartMatchs:[],
                isShow:false,
                page1:1,
                page2:1,
                pageSize:10,
                isMore1:true,
                isMore2:true,
                type:1,
                leagueIds:[],
                indexActive:1,

            }
        },
        computed:{
            ...mapState(['competitionFiltrateIdArr']),
        },
        created:function(){
            this.get_football_all_or_league_ids_start_mactch(this.type,this.leagueIds,this.page1,this.pageSize)

            football_all_match_list().then(res=>{
                console.log('查询所有联赛即将开始的场数:',res)
                if(res.code==0){
                    this.COMPETITIONFILTRATE(res.data)
                }
            })
        },
        mounted:function(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
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
                this.scroll.on('pullingUp', () => {
                    if(this.isMore1){
                        this.page1++
                        this.get_football_all_or_league_ids_start_mactch(this.type,this.leagueIds,this.page1,this.pageSize)
                        this.scroll.finishPullUp();
                    }else{
                        this.page2++
                        this.get_football_recent_finished_mactch(this.page2,this.pageSize)
                        this.scroll.finishPullUp();
                    }
                })
            })
        },
        methods:{
            ...mapMutations(['COMPETITIONFILTRATE']),
            handleChangeType(index){
                this.indexActive = index
            },
            get_football_all_or_league_ids_start_mactch(type,leagueIds,page,pageSize){
                football_all_or_league_ids_start_mactch(type,leagueIds,page,pageSize).then(res=>{
                    console.log('查询全部列表：',res)
                    if(res.code==0){
                        if(res.data.willStartMatchs.length<this.pageSize&&type==1){
                            this.isMore1 = false
                            this.isShow = true
                            this.get_football_recent_finished_mactch(this.page2,this.pageSize)
                        }else{
                            this.willStartMatchs =[...this.willStartMatchs,...res.data.willStartMatchs]
                            this.scroll.refresh()
                        }

                    }
                })
            },
            get_football_recent_finished_mactch(page,pageSize){
                football_recent_finished_mactch(page,pageSize).then(res=>{
                    console.log('最近结束的比赛:',res)
                    if(res.code==0){
                        if(res.data.newFinishedMatchs.length<this.pageSize){
                            this.isMore2 = false
                        }
                        this.newFinishedMatchs = [...this.newFinishedMatchs,...res.data.newFinishedMatchs]
                        this.scroll.refresh()
                    }
                })
            }
        },
        watch:{
            competitionFiltrateIdArr(newValue,oldValue){
                if(newValue!=oldValue&&newValue.length>0){
                    this.type=2
                    this.page1 = 1
                    this.leagueIds = newValue
                    this.isShow = false
                    this.willStartMatchs=[]
                    this.newFinishedMatchs=[]
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
                    font-size: 32px;
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
    }


    .wrapper{
        width: 100%;
        position: absolute;
        top:80px;
        bottom: 0;
        left:0;
        overflow: hidden;
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
</style>