<template>
    <div class="league-game">
        <div class="top">
            <div class="title" :class="guessActive==='tournament'?'active':''" @click="handleGuessActive('tournament')">按联赛</div>

            <!--<div class="title" :class="guessActive==='related'?'active':''" @click="handleGuessActive('related')" v-if="testAccount.indexOf(userName)!=-1">按串关</div>-->


            <div class="title" :class="guessActive==='related'?'active':''" @click="handleGuessActive('related')">按串关</div>
            <router-link to="/guessHistory">
                <span><img src="../../assets/img/guess/guess-history.png" alt=""></span>
            </router-link>
        </div>
        <div class="wrapper" ref="wrapper" :class="isBetRelated?'min-height':'max-height'">
            <div class="content">
                <ul v-if="guessActive!='related'">
                    <li v-for="(item ,index) in dataList" :class="guessActiveIndex==index?'li-active':''" @click="handleToBet(item)">
                        <div class="t">
                            <span>{{item.tournamentName}}</span>
                            <span>{{item.matchDate | timestampToTime}}</span>
                        </div>
                        <div class="con">
                            <div class="l">
                                <span><img :src="item.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                                <p>{{item.homeTeamName}}</p>
                            </div>
                            <div class="c">VS</div>
                            <div class="r">
                                <span><img :src="item.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                                <p>{{item.guestTeamName}}</p>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul class="related-list" v-if="guessActive=='related'&&requestEd">
                    <li v-for="(item,index) in dataList" :class="guessActiveIndex==index?'li-active':''">
                        <div class="t">
                            <span>主 {{item.homeTeamName}}VS{{item.guestTeamName}}</span>
                            <span class="time">{{item.matchDate | timestampToTime}}</span>
                        </div>
                        <div class="main">
                            <div class="l" :class="item.c1?'related-active':''" @click="selectBet(item,'c1',JSON.parse(item.oddStr).home)">
                                <p>主胜</p>
                                <p>{{JSON.parse(item.oddStr).home}}</p>
                            </div>
                            <div class="c" :class="item.c2?'related-active':''" @click="selectBet(item,'c2',JSON.parse(item.oddStr).draw)">
                                <p>平局</p>
                                <p>{{JSON.parse(item.oddStr).draw}}</p>
                            </div>
                            <div class="r" :class="item.c3?'related-active':''" @click="selectBet(item,'c3',JSON.parse(item.oddStr).guest)">
                                <p>客胜</p>
                                <p>{{JSON.parse(item.oddStr).guest}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="no-data loading" v-if="!requestEd&&guessActive=='related'">
                    <span><img src="../../assets/img/loading2.png" alt=""></span>
                    <p>加载中</p>
                </div>
                <div class="no-data" v-if="isNoData">
                    <span><img src="../../assets/img/no-data.png" alt=""></span>
                    <p>无数据</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_list_by_tournament,football_match_ms_list_by_time} from "../../service/api";
    import {randomN} from "../../assets/js/tool";
    import {testAccount} from "../../assets/js/testAccount";

    export default {
        data(){
            return{
                errorDeImg:'this.src="' + require('../../assets/img/de-img.png') + '"',
                scroll:null,
                activeIndex:'',
                testAccount:[],
                isNoData:false,
            }
        },
        computed:{
            ...mapState(['guessActive','guessActiveDataList','guessActiveIndex','guessTournamentList','guessTimeList',
                'isBetRelated','requestEd','multipleSelectionType','matchIdAndInfos','userName']),
            dataList(){
                setTimeout(()=>{
                    this.scroll.scrollTo(0, 0, 0)
                    this.scroll.refresh()
                },0)
               return this.guessActiveDataList
            },

        },
        created:function(){
            this.testAccount= testAccount
        },
        mounted:function(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    pullUpLoad: {
                        threshold: -30
                    }
                })
            })
        },
        methods:{
            ...mapMutations(['GUESSACTIVE','GUESSACTIVEINDEX','GUESSACTIVEDATALIST','BETINFO','ISBETRELATED',
                'REQUESTED','MULTIPLESELECTIONTYPE','MATCHIDANDINFOS','BETRELATEDRANDOM']),
            handleGuessActive(i){
                if(i=='tournament'){
                    if(this.guessActive==='tournament'){return}
                    this.GUESSACTIVE('tournament')
                    this.GUESSACTIVEINDEX('0')
                    football_match_list_by_tournament(this.guessTournamentList[0].tournamentId,'1','100').then(res=>{
                        console.log('串关数据',res)
                        if(res.code==='0'){
                            this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                        }
                    })
                    this.ISBETRELATED(false)
                }
                if(i=='related'){
                    if(this.guessActive==='related'){return}
                    this.GUESSACTIVE('related')
                    this.REQUESTED(false)
                    this.GUESSACTIVEINDEX('0')
                    this.GUESSACTIVEDATALIST([])
                    this.MATCHIDANDINFOS([])
                    const serialFun = async()=>{
                        for(let i =1;i<=10;i++){
                            let arrRes = await this.get_football_match_ms_list_by_time(this.guessTimeList[0].matchTime,i)
                            this.REQUESTED(true)
                            let arr = arrRes.data.listData
                            let arr1 = []
                            for(let i in arr){
                                arr[i].c1 = false
                                arr[i].c2 = false
                                arr[i].c3 = false
                                arr1.push(arr[i])
                            }
                            let arr2=[...this.guessActiveDataList,...arr1]
                            this.GUESSACTIVEDATALIST(arr2)
                            if(arrRes.data.length<10){
                                break;
                            }
                        }

                    }
                    serialFun()
                }
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

            handleToBet(item){
                this.BETINFO(item)
                this.$router.push('/bet');
            },
            selectBet(item,type,odd){
               if(odd>0){}else{return}
                let index = this.matchIdInMatchIdAndInfos(item.matchId,this.matchIdAndInfos)
                if(this.matchIdAndInfos.length>7&&index==-1){return}
                item[type]=!item[type]
                let arr = [...this.matchIdAndInfos]
                index!=-1?arr[index] = item:arr.push(item)
                arr=this.delNoSelect(arr)
                this.MATCHIDANDINFOS(arr)
                arr.length>=2?this.ISBETRELATED(true):''
                this.BETRELATEDRANDOM(randomN(8))
                // console.log(this.matchIdAndInfos)
            },
            matchIdInMatchIdAndInfos(matchId,matchIdAndInfos){
                let index = -1
                for(let i in matchIdAndInfos){
                    if(matchIdAndInfos[i].matchId==matchId){
                        index=i
                        break
                    }
                }
                return index
            },
            delNoSelect(arr){
                for(let i in arr){
                    if(!arr[i].c1&&!arr[i].c2&&!arr[i].c3){
                        arr.splice(i,1)
                    }
                }
                return arr
            }
        },
        watch:{
            guessActiveDataList(newValue,oldValue){
                if(newValue!=oldValue){
                    if(this.requestEd&&this.guessActive=='related'){
                        if(newValue.length>0){
                            this.isNoData=false
                        }else{
                            this.isNoData=true
                        }
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .league-game{
        width: 570px;
        position: absolute;
        top:80px;
        bottom: 0;
        left:180px;
        box-sizing: border-box;
        .top{
            width: 100%;
            height: 70px;
            box-sizing: border-box;
            position: relative;
            border-bottom: 1px solid #E6E6E6;
            display: flex;
            align-items: center;
            .title{
                font-size: 26px;
                font-weight: 700;
                width: 180px;
                height:70px;
                text-align: center;
                line-height: 70px;
                color: #7E7E7E;
                box-sizing: border-box;
            }
            .active{
                color: #34C47C;
                border-bottom: 1px solid #34C47C;
            }
            a{
                width: 60px;
                height: 100%;
                position: absolute;
                right: 15px;
                top:0;
                z-index: 10;
                box-sizing: border-box;
                @include flexY(center);
                span{
                    display: block;
                    width: 36px;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
            }

        }
        .wrapper{
            position: absolute;
            top:70px;
            /*bottom: 0;*/
            overflow: hidden;
            width:100%;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            .content{
                width: 100%;
                ul{
                    width: 100%;
                    li{
                        width: 100%;
                        height: 230px;
                        display: block;
                        box-sizing: border-box;
                        padding: 10px 30px;
                        @include borderBottom(#E6E6E6);
                        .t{
                            width: 100%;
                            height: 30px;
                            line-height: 30px;
                            span{
                                color: #ACACAC;
                                font-size: 22px;
                            }
                            @include flexX(space-between);
                        }
                        .con{
                            width: 100%;
                            height: 180px;
                            display: flex;
                            align-content: center;
                            box-sizing: border-box;
                            .l{
                                width: 45%;
                                height: 180px;
                                box-sizing: border-box;
                                @include flexY(center);
                                span{
                                    margin: 0 auto;
                                    width: 100px;
                                    height: 100px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    box-sizing: border-box;
                                    overflow: hidden;
                                    /*border: 1px solid red;*/
                                    img{
                                        /*width: 100%;*/
                                        height: 100%;
                                    }
                                }
                                p{
                                    font-size:22px;
                                    color: #333;
                                    text-align: center;
                                    padding-top: 20px;
                                }
                            }
                            .c{
                                width: 10%;
                                height: 180px;
                                line-height: 180px;
                                font-size:28px;
                                color: #333;
                                text-align: center;
                                box-sizing: border-box;
                            }
                            .r{
                                width: 45%;
                                height: 180px;
                                box-sizing: border-box;
                                @include flexY(center);
                                span{
                                    margin: 0 auto;
                                    width: 100px;
                                    height: 100px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    box-sizing: border-box;
                                    overflow: hidden;
                                    /*border: 1px solid red;*/
                                    img{
                                        width: 100%;
                                    }
                                }
                                p{
                                    font-size:22px;
                                    color: #333;
                                    padding-top: 20px;
                                    text-align: center;
                                }
                            }

                        }

                    }
                }


                .related-list{
                    padding: 10px 0;
                    .time{
                        white-space :nowrap;
                    }
                    li{
                        border: none;
                        height: 190px;
                        .main{
                            margin-top: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .l,.c,.r{
                                width: 160px;
                                height: 76px;
                                box-sizing: border-box;
                                border: 1px solid #CBCBCB;
                                text-align: center;
                                @include flexY(center);
                                p:nth-child(1){
                                    font-size: 22px;
                                    font-weight: bold;
                                    color: #000;
                                }
                                p:nth-child(2){
                                    font-size: 22px;
                                    color: #34C47C;
                                    margin-top: 5px;
                                }
                            }
                            .related-active{
                                background: #34C47C;
                                p:nth-child(1),p:nth-child(2){
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }

        .no-data-no{
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            margin-top: 300px;
            color: #bfbfbf;
            font-size: 24px;
        }
        .no-data{
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            margin-top: 300px;
            span{
                display: block;
                width: 60px;
                overflow: hidden;
                height: 60px;
                margin: 0 auto;
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
                -webkit-animation: spin 1s linear 1s 5 alternate;
                animation: spin 1s linear infinite;
            }
        }
        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(360deg);
            }
        }
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }

    .min-height{
        bottom: 380px ;
    }
    .max-height{
        bottom: 0;
    }
</style>