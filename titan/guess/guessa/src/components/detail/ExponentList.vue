<template>
    <div class="exponent-list">
        <div class="nav">
            <div class="box">
                <span :class="status==='europe'?'active':''" @click="handleStatus('europe')">欧赔</span>
                <span :class="status==='asia'?'active':''" @click="handleStatus('asia')">亚盘</span>
                <span :class="status==='size'?'active':''" @click="handleStatus('size')">大小</span>
            </div>
            <div class="bot">
                <span v-for="item in titleList">{{item}}</span>
            </div>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <div v-if="status=='europe'">
                        <li>
                            <router-link class="europe" :to="''" v-for="(item,index) in europeanOdds" :key="index">
                                <div class="item">{{item.oddsProviderName}}</div>
                                <div class="item">{{item.homeWinOdds}}</div>
                                <div class="item">{{item.drawOdds}}</div>
                                <div class="item">{{item.guestWinOdds}}</div>
                                <div class="item">
                                    <p class="time">{{item.updateTime | timestampToTime}}</p>
                                    <span><img src="../../assets/img/arrow-right.png" alt=""></span>
                                </div>
                            </router-link>
                        </li>
                    </div>

                    <div v-if="status=='asia'">
                        <li>
                            <router-link class="europe" :to="''" v-for="(item,index) in asiaList" :key="index">
                                <div class="item">{{item.companyName}}</div>
                                <div class="item">{{item.realHomeOdd}}</div>
                                <div class="item">{{item.score}}</div>
                                <div class="item">{{item.realGuestOdd}}</div>
                                <div class="item">
                                    <p class="time">{{item.date | timestampToTime}}</p>
                                    <span><img src="../../assets/img/arrow-right.png" alt=""></span>
                                </div>
                            </router-link>
                        </li>
                    </div>

                    <div v-if="status=='size'">
                        <li>
                            <router-link class="europe" :to="''" v-for="(item,index) in sizeList" :key="index">
                                <div class="item">{{item.companyName}}</div>
                                <div class="item">{{item.realOverOdd}}</div>
                                <div class="item">{{item.dparam}}</div>
                                <div class="item">{{item.realUnderOdd}}</div>
                                <div class="item">
                                    <p class="time">{{item.date | timestampToTime}}</p>
                                    <span><img src="../../assets/img/arrow-right.png" alt=""></span>
                                </div>
                            </router-link>
                        </li>
                    </div>

                </ul>
            </div>
            <div class="no-data" v-if="isNoData">
                <span><img src="../../assets/img/no-data.png" alt=""></span>
                <p>无数据</p>
            </div>
        </div>




    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {football_match_european_odds,football_match_ah_odds,football_match_ou_odds} from "../../service/api";

    export default {
        data(){
            return{
                scroll:null,
                status:'europe',
                titleList:['公司','主胜','平胜','客胜','变化时间'],
                matchId:'',
                europeanOdds:[],
                asiaList:[],
                sizeList:[],
            }
        },
        computed:{
            isNoData(){
                switch (this.status){
                    case 'europe':
                        return this.europeanOdds.length>0?false:true
                        break;
                    case 'asia':
                        return this.asiaList.length>0?false:true
                        break;
                    case 'size':
                        return this.sizeList.length>0?false:true
                        break
                }
            }
        },
        created:function(){
            this.matchId = this.$route.query.matchId
            football_match_european_odds(this.matchId).then(res=>{
                console.log('欧赔：',res)
                if(res.code==0){
                    this.europeanOdds = res.data.europeanOdds
                }
            })
            football_match_ah_odds(this.matchId).then(res=>{
                console.log('亚盘：',res)
                if(res.code==0){
                    this.asiaList = res.data
                }
            })
            football_match_ou_odds(this.matchId).then(res=>{
                console.log('大小：',res)
                if(res.code==0){
                    this.sizeList = res.data
                }
            })



        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            initScroll(){
                this.scroll = null
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleStatus(i){
                this.status = i
                switch (i){
                    case 'europe':
                        this.titleList = ['公司','主胜','平胜','客胜','变化时间']
                        break;
                    case 'asia':
                        this.titleList = ['公司','主赔','客赔','让球','变化时间']
                        break;
                    case 'size':
                        this.titleList = ['公司','大球','盘口','小球','变化时间']
                        break;
                }
                setTimeout(()=>{
                    this.scroll.refresh()
                },100)
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .exponent-list{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .nav{
            width: 100%;
            height:160px;
            padding: 15px;
            box-sizing: border-box;
            position: relative;
            @include borderBottom(#E6E6E6);
            .box{
                margin: 0 auto;
                margin-top: 20px;
                width: 480px;
                height:54px ;
                box-sizing: border-box;
                border: 1px solid #34C47C;
                @include flex;
                border-radius: 5px;
                span{
                    display: block;
                    width: 160px;
                    height: 54px;
                    line-height: 54px;
                    color: #34C47C;
                    text-align: center;
                    border-right: 1px solid #34C47C;
                    font-size: 24px;
                }
                span:last-child{
                    border-right: none;
                }
                .active{
                    color: #fff;
                    background: #34C47C;
                }
            }
            .bot{
                @include flex;
                position: absolute;
                left:0;
                bottom: 15px;
                width: 100%;
                box-sizing: border-box;
                span{
                    display: block;
                    width: 17%;
                    box-sizing: border-box;
                    text-align: center;
                    font-weight: 700;
                    color: #333;
                    font-size: 22px;
                }
                span:nth-child(1){
                    width: 25%;
                }
                span:last-child{
                    width: 24%;
                }
            }
        }
        .wrapper{
            position: absolute;
            width: 100%;
            top:160px;
            bottom: 0;
            left:0;
            box-sizing: border-box;
            overflow: hidden;
            .content{
                width: 100%;
                box-sizing: border-box;
                padding: 15px 0;
                ul{
                    li{
                        .europe{
                            width: 100%;
                            height: 120px;
                            box-sizing: border-box;
                            @include flex;
                            @include borderBottom(#E6E6E6);
                            .item{
                                width: 17%;
                                height: 120px;
                                box-sizing: border-box;
                                text-align: center;
                                color: #333;
                                font-size: 22px;
                                /*border: 1px solid red;*/
                                padding: 0 10px;

                                display: flex;
                                align-items: center;
                                justify-content: center;

                            }
                            .item:nth-child(1){
                                @include flexY(center);
                                line-height: 1.2;
                                width: 25%;
                            }
                            .item:last-child{
                                width: 24%;
                                box-sizing: border-box;
                                position: relative;
                                .time{
                                    width: 100%;
                                    box-sizing: border-box;
                                    height: 120px;
                                    padding-right: 20px;
                                    line-height: 1.2;
                                    @include flexY(center);

                                }
                                span{
                                    position: absolute;
                                    right: 15px;
                                    width: 14px;
                                    display: block;
                                    top:50%;
                                    transform: translateY(-50%);
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .no-data{
                text-align: center;
                width: 100%;
                position:absolute;
                top: 30%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction:column;
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
        }
    }
</style>