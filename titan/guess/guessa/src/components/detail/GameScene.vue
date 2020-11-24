<template>
    <div class="GameScene" ref="wrapper">
        <div class="content">
            <ul v-if="isShow">
                <li class="first">
                    <span><img src="../../assets/img/detail/scene-end.png.png" alt=""></span>
                </li>
                <li v-for="(item,index) in matchIncidents" :key="index">
                    <div class="team1" v-if="item.team=='1'">
                        <div class="box">
                            <span><img src="../../assets/img/detail/scene-ing.png" alt=""></span>
                            <p class="time">{{item.elapsed}}'</p>
                            <p class="name">{{item.name}}</p>
                        </div>
                        <p class="action">{{item.action}}</p>
                    </div>
                    <div class="team2" v-if="item.team=='2'">
                        <div class="box">
                            <span><img src="../../assets/img/detail/scene-ing.png" alt=""></span>
                            <p class="time">{{item.elapsed}}'</p>
                            <p class="name">{{item.name}}</p>
                        </div>
                        <p class="action">{{item.action}}</p>
                    </div>
                </li>
                <li class="last">
                    <span><img src="../../assets/img/detail/scene-start.png" alt=""></span>
                </li>
            </ul>
            <div class="no-data" v-else>
                <span><img src="../../assets/img/detail/no-character.png" alt=""></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {football_match_incident} from "../../service/api";
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                matchId:'',
                matchIncidents:[],
                isShow:false,
            }
        },
        created:function(){
            this.matchId = this.$route.query.matchId

            football_match_incident(this.matchId).then(res=>{
                if(res.code==0){
                    this.matchIncidents = res.data.matchIncidents
                    if(this.matchIncidents.length>0){
                        this.isShow = true
                    }
                    console.log('比赛实况：',this.matchIncidents )
                }

            })
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
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    .GameScene{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        .content{
            width: 100%;
            ul{
                li{
                    width: 100%;
                    height: 140px;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    .team1,.team2{
                        width: 52.667%;
                        .box{
                            display: flex;
                            flex-direction: row-reverse;
                            span{
                                width: 40px;
                                height: 40px;
                                overflow: hidden;
                                display: block;
                                img{
                                    width: 100%;
                                }
                            }
                            .time{
                                font-style: italic;
                                font-weight: bold;
                                font-size: 26px;
                                color: #333;
                                padding-right: 10px;
                            }
                            .name{
                                font-weight: bold;
                                font-size: 26px;
                                color: #333;
                                padding-right: 10px;
                            }
                        }
                        .action{
                            font-size: 24px;
                            padding-right: 95px;
                            color: #999;
                            text-align: right;
                        }
                    }
                    .team2{
                        margin-left: 48%;
                        .box{
                            flex-direction: row;
                            .time{
                                padding-left: 10px;
                                padding-right: 0;
                            }
                            .name{
                                padding-left: 10px;
                                padding-right: 0;
                            }
                        }
                        .action{
                            text-align: left;
                            padding-left: 95px;
                            padding-right: 0;
                        }
                    }
                    .team1:after,.team2:after{
                        content: "";
                        display: block;
                        width: 2px;
                        background:#999;
                        height: 80px;
                        position: absolute;
                        left:50%;
                        margin-top: -14px;
                    }
                }
                .first,.last{
                    span{
                        width: 40px;
                        height: 40px;
                        overflow: hidden;
                        display: block;
                        margin: 0 auto;
                        img{
                            width: 100%;
                        }
                    }
                }
                .first{
                    height: 190px;
                    padding-top: 50px;
                }
                .first:after{
                    content: "";
                    display: block;
                    width: 2px;
                    background:#999;
                    height: 80px;
                    position: absolute;
                    left:50%;
                    margin-top: 10px;
                }
            }
        }
        .no-data{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 800px;
            span{
                width: 140px;
                display: block;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>