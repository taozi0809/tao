<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <ul>
                <!--<li v-for="item in data">-->
                    <router-link v-for="item in data" class="banner" :to ="{name:'gameDetail',params :{id:item.matchId}}">
                        <p class="t">
                            <span>{{item.matchTeam}}</span>
                            <span>{{item.matchTime | timestampToTime}}</span>
                        </p>
                        <p class="c">
                            <span>{{item.desc}}</span>
                        </p>
                        <p class="b" :class="item.status=='2'?'winning':''">
                            <span>投注：{{item.betMoney+' '+item.coinName}}</span>
                            <span v-if="item.status=='1'">待开奖</span>
                            <span v-if="item.status=='2'">＋{{(item.betMoney*item.odds).toFixed(2)+' '+item.coinName}}</span>
                            <span v-if="item.status=='3'">未中奖</span>
                        </p>
                    </router-link>
                <!--</li>-->
            </ul>
            <div class="no-history" v-if="data.length==0">无记录</div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {football_bet_win_list} from "../../service/api";
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
        created:function(){
            this.get_football_bet_win_list(this.userName,this.token)
        },
        mounted:function(){
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
                football_bet_win_list(this.userName,this.token,'1','10').then(res=>{
                    console.log('已中奖',res)
                    if(res.code==='0'){
                        this.data = res.data.matchBetInfos
                    }
                })
            }
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
                    display: block;
                    width: 92%;
                    margin: 0 auto;
                    height: 180px;
                    box-sizing: border-box;
                    @include borderBottom(#CCCCCC);
                    @include flexY( space-around);
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
            }
            .no-history{
                text-align: center;
                margin-top: 100px;
                color: #181818;
            }
        }
    }
</style>