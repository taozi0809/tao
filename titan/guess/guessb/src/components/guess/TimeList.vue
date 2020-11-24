<template>
    <div class="time-list">
        <div class="title" :class="guessActive==='time'?'active':''" @click="handleGuessActive">按时间</div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActive==='time'" :class="guessActiveIndex==index?'li-active':''" >
                        <p>{{item.matchTime | dateToWeek}}{{`(${item.matchCount})`}}</p>
                        <p>{{item.matchTime}}</p>
                    </li>
                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActive!='time'" :class="guessActiveIndex==index?'li-active':''">
                        <p>{{item.tournamentName+`(${item.matchCount})`}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_list_by_time,football_match_list_by_tournament} from "../../service/api";

    export default {
        data(){
            return{
                scroll:null,
            }
        },
        computed:{
            ...mapState(['guessActive','guessTimeList','guessTournamentList','guessActiveIndex']),
            dataList(){
                return this.guessActive==='time'?this.guessTimeList:this.guessTournamentList
            }
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },

        methods:{
            ...mapMutations(['GUESSACTIVE','GUESSACTIVEDATALIST','GUESSACTIVEINDEX']),
            initScroll(){
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleGuessActive(){
                this.GUESSACTIVEINDEX('0')
                this.guessActive==='time'?'':this.GUESSACTIVE('time')
                football_match_list_by_time(this.guessTimeList[0].matchTime,'1','100').then(res=>{
                    // console.log('通过时间查找比赛）',res)
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                    }
                })
            },
            handleChange(item,index){
                this.GUESSACTIVEINDEX(index)
                this.guessActive==='time'?this.footballMatchListByTime(item.matchTime):this.footballMatchListByTournament(item.tournamentId)
            },
            footballMatchListByTime(date){
                football_match_list_by_time(date,'1','100').then(res=>{
                    console.log('通过时间查找比赛）',res)
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                    }
                })
            },
            footballMatchListByTournament(tournamentId){
                football_match_list_by_tournament(tournamentId,'1','100').then(res=>{
                    // console.log('通过联赛查找比赛）',res)
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .time-list{
        position: absolute;
        top:0;
        width: 180px;
        bottom: 0;
        border-right: 1px solid #E6E6E6;
        box-sizing: border-box;
        .title{
            color: #7E7E7E;
            font-size: 26px;
            font-weight: 700;
            width: 100%;
            height:70px;
            text-align: center;
            line-height: 70px;
            border-bottom: 1px solid #E6E6E6;
            box-sizing: border-box;
        }
        .active{
            color: #34C47C;
            border-bottom: 1px solid #34C47C;
        }
        .wrapper{
            position: absolute;
            top:70px;
            bottom: 0;
            overflow: hidden;
            width:100%;
            .content{
                width: 100%;
                ul{
                    li{
                       width: 100%;
                        height: 120px;
                        box-sizing: border-box;
                        color: #979797;
                        font-size: 22px;
                        @include flexY(center);
                        text-align: center;
                        @include borderBottom(#E6E6E6);
                        p{
                            height: 40px;
                            line-height: 40px;
                            @include ellipsis;
                        }
                    }
                    .li-active{
                        color: red;
                    }
                }
            }
        }
    }
</style>