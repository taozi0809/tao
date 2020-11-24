<template>
    <div class="bet">
        <div class="wrapper" ref="wrapper" :class="isBetInputBasketball?'is-bet-input-active':'is-bet-input'">
            <div class="content">
                <Banner/>
                <div class="card">
                    <div class="title">让分胜负</div>
                    <ul>
                        <li v-for="item in ah">
                            <div class="item" :class="activeIndex==item.index+'l'?'active':''" @click="handlePour('ah',item.type=='1'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score,'home',item.index+'l',item.odd,item.score,item.pid)">
                                <p>主队{{item.type=='1'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score}}</p>
                                <p>{{item.odd}}</p>
                            </div>
                            <div class="item" :class="activeIndex==item.index+'r'?'active':''" @click="handlePour('ah',item.type=='2'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score,'guest',item.index+'r',item.odd,item.score,item.pid)">
                                <p>客队{{item.type=='2'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score}}</p>
                                <p>{{item.guestOdd}}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="card">
                    <div class="title">大小分</div>
                    <ul>
                        <li v-for="item in ou">
                            <div class="item" :class="activeIndex==item.index+'l'?'active':''" @click="handlePour('ou',null,'over',item.index+'l',item.overOdd,item.dparam,item.pid)">
                                <p>大于{{item.dparam}}</p>
                                <p>{{item.overOdd}}</p>
                            </div>
                            <div class="item" :class="activeIndex==item.index+'r'?'active':''" @click="handlePour('ou',null,'under',item.index+'r',item.underOdd,item.dparam,item.pid)">
                                <p>小于{{item.dparam}}</p>
                                <p>{{item.underOdd}}</p>
                            </div>
                        </li>
                    </ul>
                </div>


            </div>
        </div>
        <!--<betInputBasketball />-->
        <betInputBasketball v-if="isBetInputBasketball"/>
    </div>
</template>

<script>
    import Banner from '../../components/bet/Banner'
    import BScroll from 'better-scroll'
    import BetInputBasketball from '../../components/bet/BetInputBasketball'
    import {mapState, mapMutations} from 'vuex'
    import {basketball_match_odds} from "../../service/api";
    export default {
        components:{Banner,BetInputBasketball},
        data(){
            return{
                scroll:null,
                matchId:'',
                ah:[],
                ou:[],
                activeIndex:'',
            }
        },
        computed:{
            ...mapState(['isBetInputBasketball','betInfo']),
        },
        created:function(){
            this.matchId = this.betInfo.matchId


            // console.log(this.matchId)
            basketball_match_odds(this.matchId).then(res=>{
            // basketball_match_odds('2838206').then(res=>{
                console.log('比赛赔率信息',res)
                if(res.code==0){
                    // this.ah = JSON.parse(res.data.oddAH.ah)
                    // this.ou = res.data.oddOU.ou
                    let arr1 = JSON.parse(res.data.oddAH.ah)
                    let arr2 = res.data.oddOU.ou
                    let arr3 = []
                    let arr4 = []

                    for(let i in arr1){
                        arr1[i].index ='ah'+i
                           arr3.push(arr1[i])
                    }
                    // console.log(arr3)
                    for(let i in arr2){
                        arr2[i].index ='ou'+i
                        arr4.push(arr2[i])
                    }
                    // console.log(arr4)

                    this.ah = arr3
                    this.ou = arr4
                }
            })
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            ...mapMutations(['ISBETINPUTBASKETBALL','BETINFOBASKETBALL','GUESSINPUTDATABASKETBALL']),
            initScroll(){
                this.scroll = null
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },

            handlePour(type,dparam,info,index,number,numberH,pid){
                // console.log(type,dparam,info,index,number,numberH,pid)
                this.activeIndex=index
                this.GUESSINPUTDATABASKETBALL({
                    type:type,
                    dparam:dparam,
                    info:info,
                    number:number,
                    numberH:numberH,
                    pid:pid
                })
                this.isBetInputBasketball?'':this.ISBETINPUTBASKETBALL(true)
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .bet{
        width: 100%;
        height: 100%;
        .wrapper{
            position: absolute;
            top:0;
            width: 100%;
            bottom: 0;
            box-sizing: border-box;
            overflow: hidden;
            .content{
                .card{
                    width: 100%;
                    padding-bottom: 40px;
                    box-sizing: border-box;
                    .title{
                        color: #333;
                        font-size: 26px;
                        width: 100%;
                        height: 60px;
                        line-height: 40px;
                        padding: 10px 40px;
                        box-sizing: border-box;
                        font-weight: 700;
                        position: relative;
                        margin-top: 20px;
                    }
                    .title:before{
                        position: absolute;
                        top:50%;
                        transform: translateY(-50%);
                        left: 18.75px;
                        content: '';
                        height: 40px;
                        width: 5px;
                        background: #34C47C;
                        border-radius: 3px;
                    }
                    ul{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        box-sizing: border-box;
                        li{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            .item{
                                width: 352.5px;
                                height: 76px;
                                box-sizing: border-box;
                                border: 1px solid #CBCBCB;
                                border-radius: 3px;
                                //@include flexY(space-around);
                                @include flexY(center);
                                margin-top: 20px;
                                margin-left: 15px;
                                p:nth-child(1){
                                    text-align: center;
                                    font-size: 24px;
                                    color: #000;
                                    font-weight: bold;
                                }
                                p:nth-child(2){
                                    text-align: center;
                                    font-size: 22px;
                                    color: #34C47C;
                                    font-weight: bold;
                                }
                            }
                            .active{
                                background: #34C47C;
                                color: #fff;
                                p{
                                    color: #fff !important;
                                }
                            }

                        }
                    }
                }
            }
        }
        .is-bet-input-active{
            bottom: 380px;
        }
        .is-bet-input{
            bottom:0;
        }
    }
</style>
