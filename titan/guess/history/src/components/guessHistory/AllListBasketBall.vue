<template>
    <div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
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
                </ul>
            </div>
        </div>
        <loadPage ref="loadPage"/>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {basketball_bet_list} from "../../service/api";
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
                    this.isMore?this.get_football_bet_list(this.userName,this.token):''
                    this.scroll.finishPullUp();
                    this.scroll.refresh()

                })
            })

            var asyncFun = ()=>{
                if(this.userName==''||this.userName===null||this.userName==null){
                    setTimeout(()=>{
                        asyncFun()
                    },300)
                }else{
                    this.get_football_bet_list(this.userName,this.token)
                }
            }
            asyncFun()
        },
        methods:{
            get_football_bet_list(userName,token){
                this.page = this.page+1
                this.$refs.loadPage.LoadPage('0','加载中',true)
                basketball_bet_list(userName,token,this.page,this.pageSize).then(res=>{
                    console.log('全部',res)
                    if(res.code==='0'){
                        if(res.data.matchBetInfos.length<this.pageSize){
                            this.isMore = false
                        }
                        this.data = [...this.data,...res.data.matchBetInfos]

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
                            color: #34C47C;
                        }
                    }
                    .winning{
                        span:nth-child(2){
                            color: #EF4E54;
                            font-size: 36px;
                        }
                    }
                }
                .no-data{
                    text-align: center;
                    margin-top: 100px;
                    color: #181818;
                }
            }
        }
    }
</style>