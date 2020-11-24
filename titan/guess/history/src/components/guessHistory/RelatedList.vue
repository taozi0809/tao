<template>
    <div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <router-link v-for="item in data" class="banner" :to ="{name:'gameDetail',params :{id:item.bets[0].matchId}}">
                        <div class="f">
                            <p class="t">
                                <span>{{item.bets[0].matchTeam}}</span>
                                <span>{{item.bets[0].date | timestampToTime}}</span>
                            </p>
                            <p class="c">
                                <span>{{item.bets[0].contentList.join(',')}}</span>
                            </p>
                            <p class="b" :class="item.over=='1'?'winning':''">
                                <span>投注：{{item.bets[0].betMoney+' '+item.coinName}}</span>
                                <span v-if="item.over=='0'">待开奖</span>
                                <span v-if="item.over=='1'&&item.winMoney>0" id="hs">＋{{item.winMoney+' '+item.coinName}}</span>
                                <span v-if="item.over=='1'&&item.winMoney<=0">未中奖</span>
                            </p>

                            <div class="open" @click.prevent="handleOpen(item)" v-if="!item.isShow">
                                <p>展开</p>
                                <span class="bot"><img src="../../assets/img/arrow-white.png" alt=""></span>
                            </div>

                            <div class="close" @click.prevent="handleClose(item)" v-if="item.isShow">
                                <p>收起</p>
                                <span class="top"><img src="../../assets/img/arrow-white.png" alt=""></span>
                            </div>
                        </div>
                        <!--<transition name="fade">-->
                        <!--<ul class="open-list" v-if="item.isShow" transiton="fade">-->
                        <ul class="open-list" v-if="item.isShow">
                            <p class="tz-info">投注信息：{{item.types | typesToPassWay}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.bets[0].betMoney+' '+item.coinName}}</p>
                            <router-link v-for="item1 in item.bets" class="banner" :to ="{name:'gameDetail',params :{id:item1.matchId}}">
                                <p class="t">
                                    <span>{{item1.matchTeam}}</span>
                                    <span>{{item1.date | timestampToTime}}</span>
                                </p>
                                <p class="c">
                                    <span>{{item1.contentList.join(',')}}</span>
                                </p>
                            </router-link>
                        </ul>
                        <!--</transition>-->
                    </router-link>
                </ul>
            </div>
        </div>
        <loadPage ref="loadPage"/>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {football_bet_ms_list} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                scroll:null,
                data:[],
                page:0,
                pageSize:10,
                isMore:true,
            }
        },
        computed:{
            ...mapState(['userName','token']),
        },

        mounted:function(){
            this.get_football_bet_win_list(this.userName,this.token)
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
                    }
                })
                this.scroll.on('pullingUp', () => {
                    this.isMore?this.get_football_bet_win_list(this.userName,this.token):''
                    this.scroll.finishPullUp();
                    this.scroll.refresh()

                })
            })
        },
        methods:{
            get_football_bet_win_list(userName,token){
                this.page = this.page+1
                this.$refs.loadPage.LoadPage('0','加载中',true)
                football_bet_ms_list(userName,token,'1','10').then(res=>{
                    console.log('串关记录',res)
                    if(res.code==='0'){
                        if(res.data.ctoModels.length<this.pageSize){
                            this.isMore = false
                        }

                        let arr = res.data.ctoModels
                        for(let i in arr){
                            arr[i].isShow=false
                        }
                        this.data = [...this.data,...arr]

                        if(this.data.length>0){
                            this.$refs.loadPage.LoadPage('','',false)
                        }else if(this.data.length==0){
                            this.$refs.loadPage.LoadPage('2','无数据',true)
                        }
                        this.scroll.refresh()
                    }else{
                        this.$refs.loadPage.LoadPage('2',res.message,true)
                    }
                })
            },
            handleOpen(item){
                item.isShow=true
            },
            handleClose(item){
                item.isShow=false
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .wrapper{
        position: absolute;
        top:0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        .content{
            width: 100%;
            ul{
                a{
                    .f{
                        display: block;
                        width: 92%;
                        margin: 0 auto;
                        height: 180px;
                        box-sizing: border-box;
                        @include borderBottom(#CCCCCC);
                        @include flexY( space-around);
                        position: relative;
                        .t,.c,.b{
                            span{
                                color: #8B8B8B;
                                font-size: 28px;
                            }
                            span:nth-child(1){
                                color: #181818;
                                font-size: 30px;
                            }
                            @include flexX(space-between);
                        }
                        .c{
                            span:nth-child(1){
                                color: #8B8B8B;
                                font-size: 28px;
                            }
                        }
                        .b{
                            span:nth-child(1){
                                color: #8B8B8B;
                                font-size: 28px;
                            }
                            span:nth-child(2){
                                color: #34c47c;
                                font-size: 36px;
                            }
                        }
                        .open{
                            position: absolute;
                            bottom: 10px;
                            left:50%;
                            transform: translateX(-50%);
                            text-align: center;
                            color: #fff;
                            font-size: 22px;
                            background: #34c47c;
                            padding: 15px 30px;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            z-index: 99;
                            span{
                                display: block;
                                width: 15px;
                                margin-left: 10px;
                                img{
                                    width: 100%;
                                }
                            }
                            .bot{
                                transform: rotate(-90deg);
                            }
                        }
                        .close{
                            position: absolute;
                            bottom: 10px;
                            left:50%;
                            transform: translateX(-50%);
                            text-align: center;
                            color: #fff;
                            font-size: 22px;
                            background: #34c47c;
                            padding: 15px 30px;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            z-index: 99;
                            span{
                                display: block;
                                width: 15px;
                                margin-left: 10px;
                                img{
                                    width: 100%;
                                }
                            }
                            .top{
                                transform: rotate(90deg);
                            }
                        }
                        .winning{
                            #hs{
                                color: #EF4E54;
                                font-size: 28px;
                            }
                        }
                    }
                    .open-list{
                        .tz-info{
                            font-size: 28px;
                            width: 92%;
                            margin:15px auto;
                            line-height: 1.5;
                            color: #EF4E54;
                        }
                        a{
                            display: block;
                            width: 92%;
                            margin: 0 auto;
                            height: 120px;
                            margin-bottom: 20px;
                            box-sizing: border-box;
                            @include flexY( space-around);
                            position: relative;
                            .t,.c,.b{
                                span{
                                    color: #8B8B8B;
                                    font-size: 28px;
                                }
                                span:nth-child(1){
                                    color: #181818;
                                    font-size: 30px;
                                }
                                @include flexX(space-between);
                            }
                            .c{
                                span:nth-child(1){
                                    color: #8B8B8B;
                                    font-size: 28px;
                                }
                            }
                            .b{
                                span:nth-child(1){
                                    color: #8B8B8B;
                                    font-size: 28px;
                                }
                                span:nth-child(2){
                                    color: #EF4E54;
                                    font-size: 36px;
                                }
                            }
                        }
                        a:last-child{
                            @include borderBottom(#CCCCCC);
                        }

                    }

                }
            }
            .no-history{
                text-align: center;
                margin-top: 100px;
                color: #181818;
            }


            .fade-enter {
                animation: fade-in .3s;
            }
            .fade-leave-active {
                animation: fade-out .3s;
            }
            @keyframes fade-in {
                0% {
                    height: 0;
                }
                100% {
                    height: 100%;
                }
            }
            @keyframes fade-out {
                0% {
                    height: 100%;
                }
                100% {
                    height: 0;
                }
            }



        }
    }
</style>