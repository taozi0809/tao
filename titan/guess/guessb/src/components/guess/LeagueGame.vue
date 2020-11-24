<template>
    <div class="league-game">
        <div class="top">
            <div class="title" :class="guessActive==='tournament'?'active':''" @click="handleGuessActive">按联赛</div>
            <router-link to="/guessHistory">
                <!--<a href="http://api.resource.titan.shenzhouxing.com/web/guess/history/">-->
                    <span><img src="../../assets/img/guess/guess-history.png" alt=""></span>
                <!--</a>-->
            </router-link>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
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
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_list_by_tournament} from "../../service/api";

    export default {
        data(){
            return{
                errorDeImg:'this.src="' + require('../../assets/img/de-img.png') + '"',
                scroll:null,
            }
        },
        computed:{
            ...mapState(['guessActive','guessActiveDataList','guessActiveIndex','guessTournamentList']),
            dataList(){
                setTimeout(()=>{
                    this.scroll.scrollTo(0, 0, 0)
                    this.scroll.refresh()
                },0)
               return this.guessActiveDataList
            }

        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            ...mapMutations(['GUESSACTIVE','GUESSACTIVEINDEX','GUESSACTIVEDATALIST','BETINFO']),
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
                this.guessActive==='tournament'?'':this.GUESSACTIVE('tournament')
                football_match_list_by_tournament(this.guessTournamentList[0].tournamentId,'1','100').then(res=>{
                    if(res.code==='0'){
                        this.GUESSACTIVEDATALIST(res.data.matchInfoCtoModels)
                    }
                })
            },
            handleToBet(item){
                this.BETINFO(item)
                this.$router.push('/bet');
            }


        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .league-game{
        width: 570px;
        position: absolute;
        top:0;
        bottom: 0;
        left:180px;
        box-sizing: border-box;
        .top{
            width: 100%;
            height: 70px;
            box-sizing: border-box;
            position: relative;
            border-bottom: 1px solid #E6E6E6;
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
            bottom: 0;
            overflow: hidden;
            width:100%;
            box-sizing: border-box;
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
            }
        }
    }
</style>