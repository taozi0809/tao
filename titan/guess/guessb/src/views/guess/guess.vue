<template>
    <div class="guess">
        <time-list/>
        <league-game/>
    </div>
</template>
<script>
    import TimeList from '../../components/guess/TimeList'
    import LeagueGame from '../../components/guess/LeagueGame'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_list_by_time,football_match_tournament_list,football_match_list_by_tournament,football_match_time_list} from "../../service/api";

    export default {
        components:{TimeList,LeagueGame},
        computed:{
            ...mapState(['guessActiveIndex','guessActive'])
        },
        created(){

            if(this.guessActiveIndex=='0'){
                this.footballMatchTimeList()
                this.football_match_tournament_list()
            }
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
            ...mapMutations(['GUESSTIMELIST','GUESSTOURNAMENTLIST','GUESSACTIVEDATALIST','USERNAME','TOKEN','GUESSACTIVEINDEX']),

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
    }
</style>