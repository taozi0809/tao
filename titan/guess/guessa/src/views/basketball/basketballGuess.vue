<template>
    <div class="guess">
        <div class="nav">
            <router-link to="/guess">足球</router-link>
            <router-link to="/basketballGuess" class="active">篮球</router-link>
        </div>
        <basketball-time-list/>
        <basketball-league-game/>
    </div>
</template>
<script>
    import BasketballTimeList from '../../components/guess/BasketballTimeList'
    import BasketballLeagueGame from '../../components/guess/BasketballLeagueGame'
    import {mapState, mapMutations} from 'vuex'
    import {basketball_match_list_by_time,basketball_match_time_list,
        basketball_match_list_by_tournament,basketball_match_tournament_list} from "../../service/api";

    export default {
        components:{BasketballTimeList,BasketballLeagueGame},
        computed:{
            ...mapState(['guessActiveIndexBasketball','guessActiveBasketball'])
        },
        created(){
            if(this.guessActiveIndexBasketball=='0'){
                this.basketball_match_time_list()
                this.basketball_match_tournament_list()
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
            ...mapMutations(['GUESSTIMELISTBASKETBALL','GUESSTOURNAMENTLISTBASKETBALL',
                'GUESSACTIVEDATALISTBASKETBALL','GUESSACTIVEINDEXBASKETBAL','USERNAME','TOKEN']),

            basketball_match_time_list(){
                basketball_match_time_list().then(res=>{
                    console.log('比赛日期列表--篮球',res)
                    if(res.code==='0'){
                        this.GUESSTIMELISTBASKETBALL(res.data)
                        if(this.guessActiveBasketball==='time'){
                            basketball_match_list_by_time(res.data[0].matchDate,'1','100').then(res=>{
                                console.log('通过时间查找比赛--篮球',res)
                                if(res.code==='0'){
                                    this.GUESSACTIVEDATALISTBASKETBALL(res.data.matchInfoCtoModels)
                                }
                            })
                        }
                    }
                })
            },
            basketball_match_tournament_list(){
                basketball_match_tournament_list().then(res=>{
                    console.log('查询联赛列表--篮球',res)
                    if(res.code==='0'){
                        this.GUESSTOURNAMENTLISTBASKETBALL(res.data)
                        if (this.guessActiveBasketball==='tournamen'){
                            basketball_match_list_by_tournament(res.data[0].tournamentId,'1','100').then(res=>{
                                console.log('通过联赛查找比赛--篮球',res)
                                if(res.code==='0'){
                                    this.GUESSACTIVEDATALISTBASKETBALL(res.data.matchInfoCtoModels)
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