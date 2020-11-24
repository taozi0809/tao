<template>
    <div class="time-list">
        <div class="title" :class="guessActive==='time'?'active':''" @click="handleGuessActive">按时间</div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActive=='time'" :class="guessActiveIndex==index?'li-active':''" >
                        <p>{{item.matchTime | dateToWeek}}{{`(${item.matchCount})`}}</p>
                        <p>{{item.matchTime}}</p>
                    </li>
                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActive=='tournament'" :class="guessActiveIndex==index?'li-active':''">
                        <p>{{item.tournamentName+`(${item.matchCount})`}}</p>
                    </li>

                    <li v-for="(item,index) in dataList" @click="handleChange(item,index)" v-if="guessActive=='related'" :class="guessActiveIndex==index?'li-active':''">
                        <!--<p>{{item.tournamentName+`(${item.matchCount})`}}</p>-->
                        <p>{{item.matchTime | dateToWeek}}{{`(${item.matchCount})`}}</p>
                        <p>{{item.matchTime}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_list_by_time,football_match_list_by_tournament,football_match_ms_list_by_time} from "../../service/api";

    export default {
        data(){
            return{
                scroll:null,
            }
        },
        computed:{
            ...mapState(['guessActive','guessTimeList','guessTournamentList','guessActiveIndex','guessActiveDataList','matchIdAndInfos']),
            dataList(){
                switch (this.guessActive) {
                    case 'time':
                        return this.guessTimeList
                        break;
                    case 'tournament':
                        return this.guessTournamentList
                        break;
                    case 'related':
                        return this.guessTimeList
                        break;
                }
            }
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },

        methods:{
            ...mapMutations(['GUESSACTIVE','GUESSACTIVEDATALIST','GUESSACTIVEINDEX','ISBETRELATED','REQUESTED']),
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
                this.ISBETRELATED(false)
            },
            handleChange(item,index){
                this.GUESSACTIVEINDEX(index)
                switch (this.guessActive) {
                    case 'time':
                        this.footballMatchListByTime(item.matchTime)
                        break;
                    case 'tournament':
                        this.footballMatchListByTournament(item.tournamentId)
                        break;
                    case 'related':
                        this.REQUESTED(false)
                        this.GUESSACTIVEDATALIST([])
                        const serialFun = async()=>{
                            for(let i =1;i<=10;i++){
                                let arrRes = await this.get_football_match_ms_list_by_time(item.matchTime,i)
                                this.REQUESTED(true)
                                let arr = arrRes.data.listData
                                let arr1 = []
                                for(let i in arr){
                                    arr[i].c1 = false
                                    arr[i].c2 = false
                                    arr[i].c3 = false
                                    arr1.push(arr[i])
                                }
                                let arr2= [...this.guessActiveDataList,...arr1]
                                arr2 = this.haveSelect(this.matchIdAndInfos,arr2)
                                this.GUESSACTIVEDATALIST(arr2)
                                if(arrRes.data.length<10){
                                    break;
                                }
                            }
                        }
                        serialFun()
                        break;
                }
            },
            async get_football_match_ms_list_by_time(date,page) {
                return await new Promise((resolve, reject) => {
                    football_match_ms_list_by_time(date,page,'10').then(res=>{
                        console.log('通过时间查找串关）',res)
                        if(res.code==='0'){
                            resolve(res)
                        }
                    })
                })
            },

            haveSelect(arr1,arr2){
                for(let i in arr2){
                    for(let j in arr1){
                        if(arr2[i].matchId==arr1[j].matchId){
                            arr2[i]=arr1[j]
                        }
                    }
                }
                return arr2
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