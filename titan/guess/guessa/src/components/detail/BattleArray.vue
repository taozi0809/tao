<template>
    <div class="BattleArray">
        <div class="map">
            <span><img src="../../assets/img/detail/ball-pack.png" alt=""></span>
            <div class="homeTeamMap" v-if="homeTeamPosition2.length>0">
                <div class="smy-box">
                    <div class="smy">
                        <span><img src="../../assets/img/detail/homeTeamNumder.png" alt=""></span>
                        <p>{{homeTeamPosition1.shirtNumber}}</p>
                    </div>
                    <ul class="hw-box">
                        <li v-for="(item,index) in homeTeamPosition2" :key="index">
                            <span><img src="../../assets/img/detail/homeTeamNumder.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </li>
                    </ul>
                    <ul class="zc-box">
                        <li v-for="(item,index) in homeTeamPosition3" :key="index">
                            <span><img src="../../assets/img/detail/homeTeamNumder.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </li>
                    </ul>
                    <ul class="qf-box">
                        <li v-for="(item,index) in homeTeamPosition4" :key="index">
                            <span><img src="../../assets/img/detail/homeTeamNumder.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="guestTeamMap" v-if="homeTeamPosition2.length>0">
                <div class="smy-box">
                    <div class="smy">
                        <span><img src="../../assets/img/detail/guestTeamNumber.png" alt=""></span>
                        <p>{{guestTeamPosition1.shirtNumber}}</p>
                    </div>
                    <ul class="hw-box">
                        <li v-for="(item,index) in guestTeamPosition2" :key="index">
                            <span><img src="../../assets/img/detail/guestTeamNumber.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </li>
                    </ul>
                    <ul class="zc-box">
                        <li v-for="(item,index) in guestTeamPosition3" :key="index">
                            <span><img src="../../assets/img/detail/guestTeamNumber.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </li>
                    </ul>
                    <ul class="qf-box">
                        <li v-for="(item,index) in guestTeamPosition4" :key="index">
                            <span><img src="../../assets/img/detail/guestTeamNumber.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="no-data" v-else>暂无比赛阵容</p>

        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul class="team1">
                    <li v-for="(item,index) in homeTeamLineup" :key="index" class="homeTeam">
                        <div class="number">
                            <span><img src="../../assets/img/detail/homeTeamNumder.png" alt=""></span>
                            <p>{{item.shirtNumber}}</p>
                        </div>
                       <div class="des">
                           <p class="name">{{item.name}}</p>
                           <p class="position">{{item.position}}</p>
                       </div>
                    </li>
                </ul>

                <ul class="team2">
                    <li v-for="(item2,index2) in guestTeamLineup" :key="index2" class="guestTeam">
                        <div class="number">
                            <span><img src="../../assets/img/detail/guestTeamNumber.png" alt=""></span>
                            <p>{{item2.shirtNumber}}</p>
                        </div>
                        <div class="des">
                            <p class="name">{{item2.name}}</p>
                            <p class="position">{{item2.position}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {football_match_lineup} from "../../service/api";
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                matchId:'',
                homeTeamLineup:[],
                guestTeamLineup:[],
                homeTeamPosition1:{},
                homeTeamPosition2:[],
                homeTeamPosition3:[],
                homeTeamPosition4:[],
                guestTeamPosition1:{},
                guestTeamPosition2:[],
                guestTeamPosition3:[],
                guestTeamPosition4:[],

            }
        },
        created:function(){
            this.matchId = this.$route.query.matchId

            football_match_lineup(this.matchId).then(res=>{
                if(res.code==0){
                    this.homeTeamLineup = res.data.homeTeamLineup
                    this.guestTeamLineup = res.data.guestTeamLineup
                    for(let i in this.homeTeamLineup){
                        if(this.homeTeamLineup[i].position=='守门员'){
                            this.homeTeamPosition1 = this.homeTeamLineup[i]
                        }else if(this.homeTeamLineup[i].position=='后卫'){
                            this.homeTeamPosition2.push(this.homeTeamLineup[i])
                        }else if(this.homeTeamLineup[i].position=='中场'){
                            this.homeTeamPosition3.push(this.homeTeamLineup[i])
                        }else if(this.homeTeamLineup[i].position=='前锋'){
                            this.homeTeamPosition4.push(this.homeTeamLineup[i])
                        }
                    }
                    for(let i in this.guestTeamLineup){
                        if(this.guestTeamLineup[i].position=='守门员'){
                            this.guestTeamPosition1 = this.guestTeamLineup[i]
                        }else if(this.guestTeamLineup[i].position=='后卫'){
                            this.guestTeamPosition2.push(this.homeTeamLineup[i])
                        }else if(this.guestTeamLineup[i].position=='中场'){
                            this.guestTeamPosition3.push(this.homeTeamLineup[i])
                        }else if(this.guestTeamLineup[i].position=='前锋'){
                            this.guestTeamPosition4.push(this.homeTeamLineup[i])
                        }
                    }
                    setTimeout(()=>{
                        this.scroll.refresh()
                    },0)
                    console.log('主队阵容：',this.homeTeamLineup)
                    console.log('客队阵容：',this.guestTeamLineup)
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
        },
    }
</script>

<style lang="scss" scoped>
    .BattleArray{
        width: 100%;
        height: 100%;
        .map{
            span{
                width: 100%;
                height: 390px;
                display: block;
                img{
                    width: 100%;
                }
            }
            .homeTeamMap,.guestTeamMap{
                width: 50%;
                box-sizing: border-box;
                height: 390px;
                position: absolute;
                top:0;
                left:0;
                .smy-box{
                    padding-left: 15px;
                    width: 80px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    position: absolute;
                    left:0;
                    .smy{
                        width: 40px;
                        height: 40px;
                        position: relative;
                        span{
                            display: block;
                            width: 100%;
                            height: 100%;
                            img{
                                width: 100%;
                            }
                        }
                        p{
                            color: #31AFFF;
                            font-size: 16px;
                            position: absolute;
                            left:50%;
                            top:50%;
                            transform: translate(-50%,-50%);
                        }
                    }
                }
                .hw-box,.zc-box,.qf-box{
                    position: absolute;
                    left:80px;
                    width: 60px;
                    height: 100%;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    li{
                        width: 40px;
                        height: 40px;
                        position: relative;
                        padding: 15px 0;
                        span{
                            display: block;
                            width: 100%;
                            height: 100%;
                            img{
                                width: 100%;
                            }
                        }
                        p{
                            color: #31AFFF;
                            font-size: 16px;
                            position: absolute;
                            left:50%;
                            top:50%;
                            transform: translate(-50%,-50%);
                        }
                    }
                }
                .zc-box{
                    left:200px;
                }
                .qf-box{
                    left:300px;
                }
            }
            .guestTeamMap{
                left: 50%;
                /*border: 1px solid red;*/
                .smy-box{
                    left:unset;
                    right: 10px;
                    padding-left: 0px;
                    .smy{
                        p{
                            color: #fff;
                        }
                    }
                }
                .hw-box,.zc-box,.qf-box{
                    li{
                        p{
                            color: #fff;
                        }
                    }
                }
                .hw-box{
                    left: unset;
                    right: 60px;
                }
                .zc-box{
                    right:180px;
                    left: unset;
                }
                .qf-box{
                    left: unset;
                    right:280px;
                }
            }
            .no-data{
                width: 100%;
                height: 390px;
                line-height: 390px;
                position: absolute;
                top:0;
                left:0;
                font-size: 36px;
                color: #fff;
                font-weight: bold;
                text-align: center;
                letter-spacing: 4px;
            }
        }

        .wrapper{
            width: 100%;
            position: absolute;
            top:390px;
            bottom: 0;
            /*box-sizing: border-box;*/
            /*border: 1px solid red;*/
            overflow: hidden;
            .content{
                width: 100%;
                display: flex;
                align-items: center;
                ul{
                    width: 50%;
                    box-sizing: border-box;
                    .homeTeam,.guestTeam{
                        width:100%;
                        /*border: 1px solid red;*/
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        padding: 20px 10px;
                        .number{
                            width: 40px;
                            height: 40px;
                            position: relative;
                            span{
                                width: 100%;
                                height: 100%;
                                display: block;
                                img{
                                    width: 100%;
                                }
                            }
                            p{
                                color: #31AFFF;
                                font-size: 16px;
                                position: absolute;
                                left:50%;
                                top:50%;
                                transform: translate(-50%,-50%);
                            }
                        }
                        .des{
                            padding-left: 10px;
                            .name{
                                font-size: 24px;
                                color: #333;
                                font-weight: bold;
                                padding-bottom: 5px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                            .position{
                                font-size: 22px;
                                color: #999;
                                padding-top: 5px;
                            }
                        }
                    }
                    .guestTeam{
                        flex-direction: row-reverse;
                        .number{
                            p{
                                color: #fff;
                            }
                        }
                        .des{
                            padding-right: 10px;
                            .position{
                                text-align: right;
                            }
                        }
                    }
                }

            }
        }
    }
</style>