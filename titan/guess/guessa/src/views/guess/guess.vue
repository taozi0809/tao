<template>
    <div class="guess">
        <div class="nav">
            <router-link to="/guess" class="active">足球</router-link>
            <router-link to="/basketballGuess">篮球</router-link>
        </div>
        <time-list/>
        <league-game/>

        <bet-related v-if="isBetRelated"/>
    </div>
</template>
<script>
    import TimeList from '../../components/guess/TimeList'
    import LeagueGame from '../../components/guess/LeagueGame'
    import betRelated from '../../views/bet/betRelated'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_list_by_time,football_match_tournament_list,football_match_list_by_tournament,
        football_match_time_list,football_match_ms_list_by_time} from "../../service/api";

    export default {
        components:{TimeList,LeagueGame,betRelated},
        computed:{
            ...mapState(['guessActiveIndex','guessActive','isBetRelated'])
        },
        created(){
            if(this.guessActiveIndex=='0'){
                this.footballMatchTimeList()
                this.football_match_tournament_list()
            }
            this.ISBETINFO(false)
        },
        mounted:function(){
            //安卓传参
            let _this = this
            window['get_android_userName'] = function(e){
                _this.USERNAME(e)
                // alert(e)
            }
            window['get_android_token'] = function(e){
                _this.TOKEN(e)
                // alert(e)
            }
        },
        methods:{
            ...mapMutations(['GUESSTIMELIST','GUESSTOURNAMENTLIST','GUESSACTIVEDATALIST','USERNAME','TOKEN','GUESSACTIVEINDEX','REQUESTED','ISBETINFO']),

            footballMatchTimeList(){
                football_match_time_list().then(res=>{
                    console.log('比赛日期列表',res)
                    if(res.code==='0'){
                        this.GUESSTIMELIST(res.data.matchTimes)
                        if(this.guessActive==='time'){
                            football_match_list_by_time(res.data.matchTimes[0].matchTime,'1','100').then(res=>{
                                console.log('通过时间查找比赛）',res)
                                if(res.code==='0'){
                                    this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                                }
                            })
                        }

                        if(this.guessActive=='related'){
                            football_match_ms_list_by_time(res.data.matchTimes[0].matchTime,'1','100').then(res=>{
                                console.log('通过时间查找串关）',res)
                                if(res.code==='0'){
                                    this.REQUESTED(true)
                                    let arr = res.data
                                    let arr1 = []
                                    for(let i in arr){
                                        arr[i].c1 = false
                                        arr[i].c2 = false
                                        arr[i].c3 = false
                                        arr1.push(arr[i])
                                    }
                                    this.GUESSACTIVEDATALIST(arr1)
                                }
                            })
                        }
                    }

                })
            },
            football_match_tournament_list(){
                football_match_tournament_list().then(res=>{
                    console.log('查询联赛列表',res)
                    if(res.code==='0'){
                        this.GUESSTOURNAMENTLIST(res.data.matchTournaments)
                        if (this.guessActive==='tournamen'){
                            football_match_list_by_tournament(res.data.matchTournaments[0].tournamentId,'1','100').then(res=>{
                                if(res.code==='0'){
                                    this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                                }
                            })
                        }

                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    .guess{
        width: 100%;
        height: 100%;
        .nav{
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #34c47c;
            a{
                display: block;
                width: 160px;
                border: 1px solid #fff;
                box-sizing: border-box;
                overflow: hidden;
                height: 56px;
                line-height: 56px;
                text-align: center;
            }
            a:nth-child(1){
                border-top-left-radius:30px;
                border-bottom-left-radius: 30px;
            }
            a:nth-child(2){
                border-top-right-radius:30px;
                border-bottom-right-radius: 30px;
            }
            .active{
                background: #fff;
                color: #34C47C;
            }
        }

    }
</style>