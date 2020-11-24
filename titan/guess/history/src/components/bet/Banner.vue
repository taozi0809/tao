<template>
    <!--<div class="banner" @click="handleToDetails">-->
    <router-link class="banner" :to ="{name:'gameDetail',params :{id:betInfo.matchId}}">
        <div class="l">
            <span><img :src="betInfo.homeTeamLogo" alt=""></span>
            <p>{{betInfo.homeTeamName}}</p>
        </div>
        <div class="c">
            <p>{{betInfo.tournamentName}}</p>
            <p>{{betInfo.matchDate | timestampToTime}}</p>
            <p>VS</p>
        </div>
        <div class="r">
            <span><img :src="betInfo.guestTeamLogo" alt=""></span>
            <p>{{betInfo.guestTeamName}}</p>
        </div>
    </router-link>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        computed:{
            ...mapState(['betInfo']),
        },
        created:function(){
            // console.log(this.betInfo)
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .banner{
        width: 100%;
        height: 380px;
        box-sizing: border-box;
        background: url("../../assets/img/bet/banner.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        .l,.r{
            width: 33.33%;
            height: 380px;
            box-sizing: border-box;
            @include flexY(center);
            span{
                width:100px;
                height:100px;
                /*border: 1px solid red;*/
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 50%;
                img{
                    height: 100%;
                    /*width: 100%;*/
                }
            }
            p{
                color: #fff;
                font-size: 22px;
                text-align: center;
                padding-top: 20px;
            }
        }
        .c{
            width: 33.33%;
            height: 380px;
            box-sizing: border-box;
            @include flexY(center);
            p{
                color: #fff;
                text-align: center;
            }
            p:nth-child(1){font-size: 26px;}
            p:nth-child(2){font-size: 20px;padding-top: 40px;}
            p:nth-child(3){font-size: 36px;font-weight: 700;padding-top: 40px;}
        }
    }
</style>