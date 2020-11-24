<template>
    <div class="banner">
        <div class="notstarted" v-if="data.statusType=='notstarted'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{data.startDate | timestampToTime}}</p>
                <p>未开始</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
        <div class="inprogress" v-if="data.statusType=='inprogress'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{`${data.homeScore} : ${data.guestScore}`}}</p>
                <p>进行中</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
        <div class="finished" v-if="data.statusType=='finished'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{`${data.homeScore} : ${data.guestScore}`}}</p>
                <p>完场</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
        <div class="cancelled" v-if="data.statusType=='cancelled'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{data.startDate | timestampToTime}}</p>
                <p>取消</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
        <div class="interrupted" v-if="data.statusType=='interrupted'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{data.startDate | timestampToTime}}</p>
                <p>中断</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
        <div class="unknown" v-if="data.statusType=='unknown'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{`${data.homeScore} : ${data.guestScore}`}}</p>
                <p>未知</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
        <div class="deleted" v-if="data.statusType=='deleted'">
            <div class="notstarted-div l">
                <span><img :src="data.homeTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.homeTeamName}}</p>
            </div>
            <div class="notstarted-div c">
                <p>{{`${data.homeScore} : ${data.guestScore}`}}</p>
                <p>删除</p>
            </div>
            <div class="notstarted-div r">
                <span><img :src="data.guestTeamLogo" alt="" :onerror="errorDeImg"></span>
                <p>{{data.guestTeamName}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {football_match_details} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                errorDeImg:'this.src="' + require('../../assets/img/de-img.png') + '"',
                matchId:'',
                data:{},
            }
        },
        created:function(){
            this.matchId = this.$route.params.id

            football_match_details(this.matchId).then(res=>{
                if(res.code==0){
                    this.data=res.data
                    console.log('比赛详情：',this.data)
                }
            })
        },
        methods:{
            ...mapMutations(['GAMEDETAILS']),
        },
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    .banner{
        width: 100%;
        height: 240px;
        background: url("../../assets/img/detail/banner.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        .item{
            height: 240px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }
        .item:nth-child(1){
            width: 35%;
            justify-content: flex-end;
            .box{
                display: inline-block;
                box-sizing: border-box;
                span{
                    display: block;
                    width: 80px;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                p{
                    color: #fff;
                    font-size: 22px;
                    padding-top: 20px;
                }
            }

        }
        .item:nth-child(2){
            width: 30%;

            .box{
                width: 100%;
                height: 130px;
                box-sizing: border-box;
                text-align: center;
                p{
                    color: #fff;
                }
                .bf{
                    font-size: 26px;
                    padding-top: 30px;
                }
                .bf1{
                    font-size: 20px;
                    padding-top: 12px;

                }
                .time{
                    font-size: 20px;
                    padding-top: 15px;
                }
            }
        }
        .item:nth-child(3){
            width: 35%;
            justify-content: flex-start;
            .box{
                display: inline-block;
                span{
                    display: block;
                    margin: 0 auto;
                    width: 80px;
                    img{
                        width: 100%;
                    }
                }
                p{
                    color: #fff;
                    font-size: 22px;
                    padding-top: 20px;
                }
            }

        }


        .notstarted,.inprogress,.finished,.cancelled,.interrupted,.unknown,.deleted{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            .notstarted-div{
                height: 240px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
            }
            .l,.r{
                width: 35%;
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
                    color: #fff;
                    font-size: 22px;
                    text-align: center;
                    padding-top: 20px;
                    font-weight: bold;
                }
            }
            .c{
                width: 30%;
                box-sizing: border-box;
                @include flexY(center);
                p{
                    color: #fff;
                    text-align: center;
                    font-size: 26px;
                    font-weight: bold;
                }
                p:nth-child(1){font-size: 32px;padding-top: 40px;}
                p:nth-child(2){font-size: 24px;padding-top: 40px;}
            }

        }
    }
</style>