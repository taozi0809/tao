<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <ul>
                <li v-for="(item,index) in willStartMatchs" :key="item.matchId">
                    <router-link :to ="{name:'gameDetail',params :{id:item.matchId}}">
                        <div class="t1">
                            <span>{{item.tournamentShortName}} <i>{{item.startDate | timestampToTime1}}</i></span>
                            <span>{{item.statusType | statusToName}}</span>
                        </div>
                        <div class="con">
                            <div class="l">
                                <span><img :src="item.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                                <p>{{item.homeTeamName}}</p>
                            </div>
                            <div class="c">
                                <p>vs</p>
                            </div>
                            <div class="r">
                                <span><img :src="item.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                                <p>{{item.guestTeamName}}</p>
                            </div>
                        </div>
                    </router-link>
                </li>
                <div class="new-game" v-if="isShow">最新赛果</div>
                <li v-for="(item,index) in newFinishedMatchs" :key="item.matchId">
                    <router-link :to ="{name:'gameDetail',params :{id:item.matchId}}">
                        <div class="t1">
                            <span>{{item.tournamentShortName}} <i>{{item.startDate | timestampToTime1}}</i></span>
                            <span>{{item.statusType | statusToName}}</span>
                        </div>
                        <div class="con">
                            <div class="l">
                                <span><img :src="item.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                                <p>{{item.homeTeamName}}</p>
                            </div>
                            <div class="c">
                                <p>vs</p>
                            </div>
                            <div class="r">
                                <span><img :src="item.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                                <p>{{item.guestTeamName}}</p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {football_all_match} from "../../service/api";

    export default {
        data(){
            return{
                errorDeImg:'this.src="' + require('../../assets/img/de-img.png') + '"',
                scroll:null,
                newFinishedMatchs:[],
                willStartMatchs:[],
                isShow:false
            }
        },

        created:function(){
            football_all_match().then(res=>{
                if(res.code==0){
                    this.isShow = true
                    this.willStartMatchs = res.data.willStartMatchs
                    this.newFinishedMatchs = res.data.newFinishedMatchs
                    console.log('已完成：',this.newFinishedMatchs)
                    console.log('未开始：',this.willStartMatchs)
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



        },
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .wrapper{
        width: 100%;
        position: absolute;
        top:0;
        bottom: 0;
        left:0;
        overflow: hidden;
        .content{
            width: 100%;
            box-sizing: border-box;
            padding: 15px 0;
            ul{
                li{
                    a{
                        width: 100%;
                        box-sizing: border-box;
                        padding: 18px 22px;
                        height: 250px;
                        display: block;
                        /*border: 1px solid red;*/
                        .t1{
                            width: 100%;
                            padding-bottom: 30px;
                            @include flexX(space-between);
                            span:nth-child(1){
                                color: #34C47C;
                                font-size: 26px;
                                font-weight: 600;
                                i{
                                    color: #999999;
                                    font-size: 26px;
                                    padding-left: 10px;
                                }
                            }
                            span:nth-child(2){
                                color: #999999;
                                font-size: 24px;
                            }
                        }
                        .con{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            .l,.r{
                                width: 40%;
                                justify-content: flex-end;
                                @include flexY(center);
                                span{
                                    width:100px;
                                    height:100px;
                                    box-sizing: border-box;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin: 0 auto;
                                    overflow: hidden;
                                    border-radius: 50%;
                                    img{
                                        height: 100%;
                                    }
                                }
                                p{
                                    color: #333;
                                    font-size: 24px;
                                    font-weight: bold;
                                    text-align: center;
                                    padding-top: 20px;
                                }
                            }
                            .c{
                                width: 20%;
                                box-sizing: border-box;
                                @include flexY(center);
                                p{
                                    color: #333;
                                    text-align: center;
                                    font-size: 42px;
                                    font-weight: 700;
                                }
                            }
                        }
                    }
                }
                .new-game{
                    width: 100%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background:#cc8f91 ;
                    color: #fff;
                    font-size: 16px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>