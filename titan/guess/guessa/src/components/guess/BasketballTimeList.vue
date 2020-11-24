<template>
    <div class="time-list">
        <div class="title" :class="guessActiveBasketball==='time'?'active':''" @click="handleGuessActive">按时间</div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActiveBasketball==='time'" :class="guessActiveIndexBasketball==index?'li-active':''" >
                        <p>{{item.matchDate | dateToWeek}}{{`(${item.matchCount})`}}</p>
                        <p>{{item.matchDate}}</p>
                    </li>
                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActiveBasketball!='time'" :class="guessActiveIndexBasketball==index?'li-active':''">
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
    import {basketball_match_list_by_time,basketball_match_list_by_tournament} from "../../service/api";

    export default {
        data(){
            return{
                scroll:null,
            }
        },
        computed:{
            ...mapState(['guessActiveBasketball','guessTimeListBasketball','guessTournamentListBasketball','guessActiveIndexBasketball']),
            dataList(){
                // console.log(this.guessTournamentListBasketball)
                return this.guessActiveBasketball==='time'?this.guessTimeListBasketball:this.guessTournamentListBasketball
            }
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },

        methods:{
            ...mapMutations(['GUESSACTIVEBASKETBALL','GUESSACTIVEDATALISTBASKETBALL','GUESSACTIVEINDEXBASKETBAL']),
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
                this.GUESSACTIVEINDEXBASKETBAL('0')
                this.guessActiveBasketball==='time'?'':this.GUESSACTIVEBASKETBALL('time')
                basketball_match_list_by_time(this.guessTimeListBasketball[0].matchTime,'1','100').then(res=>{
                    // console.log('通过时间查找比赛）',res)
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALISTBASKETBALL(res.data.matchInfoCtoModels)
                    }
                })
            },
            handleChange(item,index){
                // console.log(item)
                this.GUESSACTIVEINDEXBASKETBAL(index)
                this.guessActiveBasketball==='time'?this.footballMatchListByTime(item.matchDate):this.footballMatchListByTournament(item.tournamentId)
            },
            footballMatchListByTime(date){
                basketball_match_list_by_time(date,'1','100').then(res=>{
                    console.log('通过时间查找比赛--篮球',res)
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALISTBASKETBALL(res.data.matchInfoCtoModels)
                    }
                })
            },
            footballMatchListByTournament(tournamentId){
                basketball_match_list_by_tournament(tournamentId,'1','100').then(res=>{
                    console.log('通过联赛查找比赛--篮球',res)
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALISTBASKETBALL(res.data.matchInfoCtoModels)
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
        top:80px;
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
            box-sizing: border-box;
            /*border: 1px solid red;*/
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