<template>
    <div class="bet">
        <div class="wrapper" ref="wrapper" :class="isBetInput?'is-bet-input-active':'is-bet-input'">
            <div class="content">
                <Banner/>
                <div class="card">
                    <div class="title">胜平负</div>
                    <ul>
                        <li v-for="item in results" @click="handleClick(item,item.index)" :class="activeIndex==item.index?'active':''">
                            <p>{{item.name | toName}}</p>
                            <p>{{item.number}}</p>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <div class="title">比分</div>
                    <ul>
                        <li v-for="item in scoreData.list" @click="handleClick(item,item.index)" :class="activeIndex==item.index?'active':''">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                        <div class="more" @click="handleMore(scoreData.isMore)" v-if="scoreData.isMore==='open'">
                            <p>展开</p>
                            <span><img src="../../assets/img/arrow-bot.png" alt=""></span>
                        </div>
                        <div class="more" @click="handleLess(scoreData.isMore)" v-if="scoreData.isMore==='close'">
                            <p>收起</p>
                            <span><img src="../../assets/img/arrow-top.png" alt=""></span>
                        </div>
                    </ul>
                </div>
                <div class="card">
                    <div class="title">总进球</div>
                    <ul>
                        <li v-for="item in totalGoal" @click="handleClick(item,item.index)" :class="activeIndex==item.index?'active':''">
                            <p>{{item.name | toName}}</p>
                            <p>{{item.number}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <betInput v-if="isBetInput"/>
    </div>
</template>

<script>
    import Banner from '../../components/bet/Banner'
    import BScroll from 'better-scroll'
    import BetInput from '../../components/bet/BetInput'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_odds} from "../../service/api";
    export default {
        components:{Banner,BetInput},
        data(){
            return{
                scroll:null,
                activeIndex:'',
                results:[],
                score:[],
                totalGoal:[],
                scoreData:{},
            }
        },
        computed:{
            ...mapState(['isBetInput','betInfo']),
        },
        created:function(){
            football_match_odds(this.betInfo.matchId).then(res=>{
                // console.log(res)
                if(res.code==='0'){
                    this.results = JSON.parse(res.data.results)
                    let obj1 = JSON.parse(res.data.results)
                    let obj2 = JSON.parse(res.data.score)
                    let obj3 = JSON.parse(res.data.totalGoal)
                    let arr1=[],arr2=[],arr3=[]
                    for(let i in obj1){
                        arr1.push({name:i,number:obj1[i],index:'a'+i})
                    }
                    for(let i in obj2){
                        arr2.push({name:i,number:obj2[i],index:'b'+i})
                    }
                    for(let i in obj3){
                        arr3.push({name:i,number:obj3[i],index:'c'+i})
                    }
                    // console.log(arr1)
                    let arr11 = []
                    for(let i in arr1){
                        if(arr1[i].name=='draw'){
                            arr11[1] = arr1[i]
                        }
                        if(arr1[i].name=='guest'){
                            arr11[2] = arr1[i]
                        }
                        if(arr1[i].name=='home'){
                            arr11[0] = arr1[i]
                        }
                    }
                    this.results = arr11
                    this.score = arr2
                    this.totalGoal = arr3
                    this.scoreData = this.dispose(this.score)
                    setTimeout(()=>{
                        this.scroll.refresh()
                    },0)
                }
            })
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            ...mapMutations(['ISBETINFO','GUESSINPUTDATA']),
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
            dispose(arr){
                if(arr.length>6){
                    return {
                        list:arr.slice(0,6),
                        isMore:'open'
                    }
                }
            },
            handleMore(){
                this.scoreData={
                    list:this.score,
                    isMore:'close'
                }
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleLess(){
                this.scoreData={
                    list:this.score.slice(0,6),
                    isMore:'open'
                }
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleClick(item,index){
                this.activeIndex=index
                this.GUESSINPUTDATA({
                    name:item.name,
                    number:item.number,
                    index:index,
                })
                this.isBetInput?'':this.ISBETINFO(true)
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
                            width: 225px;
                            height: 76px;
                            box-sizing: border-box;
                            border: 1px solid #CBCBCB;
                            border-radius: 3px;
                            @include flexY(center);
                            margin-top: 20px;
                            margin-left: 18.75px;
                            p{
                                text-align: center;
                            }
                            p:nth-child(1){
                                color: #333;
                                font-size: 24px;
                                font-weight: 700;
                            }
                            p:nth-child(2){
                                font-size: 22px;
                                color: #34C47C;
                                padding-top: 6px;
                            }
                        }
                        .active{
                            background: #34C47C;
                            color: #fff;
                            p{
                                color: #fff !important;
                            }
                        }
                        .more{
                            width: 100%;
                            height: 40px;
                            margin-top: 20px;
                            @include flex;
                            p{
                                color: #989898;
                                font-size: 22px;
                                height: 40px;
                                line-height: 40px;
                                padding-right: 6px;
                            }
                            span{
                                display: block;
                                width: 14px;
                                height: 40px;
                                @include flexY(center);
                                img{
                                    width: 100%;
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
        .guess{
            width: 100%;
            height: 380px;
            box-sizing: border-box;
            border: 1px solid red;
            position: fixed;
            bottom: 0;
            left:0;
            background: #fff;
        }
    }
</style>
