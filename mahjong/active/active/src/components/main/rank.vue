<template>
    <div class="recopyrank">
        <img src="../../assets/img/recopy-bj.png" alt="" class="recopy-bj">
        <div class="recopy-header">
            <img src="../../assets/img/close.png" alt="" class="recopy-close" @click="PRIZETYPE('-1')">
        </div>
        <div class="recopy-content">
            <div class="recopy-top">
                <div class="rank-pm">
                    <div class="rank-item rank-left">
                        <img :src="loginInfo.RankShow[1].Headimgurl" alt="">
                        <p>{{loginInfo.RankShow[1].Nickname}}</p>
                        <div class="second-box">
                            <div class="second-left"><img src="../../assets/img/majiang-rev.png" class="second-img"></div>
                            <div class="second-right"><p class="second-p">{{loginInfo.RankShow[1].CardSum | recopymjnumber}}</p></div>
                        </div>

                    </div>

                    <div class="rank-item rank-center">
                        <img :src="loginInfo.RankShow[0].Headimgurl" alt="">
                        <p>{{loginInfo.RankShow[0].Nickname}}</p>
                        <div class="second-box">
                            <div class="second-left"><img src="../../assets/img/majiang-rev.png" class="second-img"></div>
                            <div class="second-right"><p class="second-p">{{loginInfo.RankShow[0].CardSum | recopymjnumber}}</p></div>
                        </div>
                    </div>

                    <div class="rank-item rank-right">
                        <img :src="loginInfo.RankShow[2].Headimgurl" alt="">
                        <p>{{loginInfo.RankShow[2].Nickname}}</p>
                        <div class="second-box">
                            <div class="second-left"><img src="../../assets/img/majiang-rev.png" class="second-img"></div>
                            <div class="second-right"><p class="second-p">{{loginInfo.RankShow[2].CardSum | recopymjnumber}}</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="remark-txt"><p>（排名每小时更新1次）</p></div>
            <div class="user-onself">
                <div class="ranking">{{loginInfo.UserRank}}</div>
                <div class="user-hedaer">
                    <img :src="loginInfo.Headimgurl" alt="">
                </div>
                <div class="user-monick">
                    <div class="monick-top">{{loginInfo.Nickname}}</div>
                </div>
                <div class="user-mj"><img src="../../assets/img/majiang-rev.png" alt=""></div>
                <div class="user-number">{{loginInfo.UserRankSum}}</div>
            </div>
            <div class="scrollBox-t touchAdd rank-scroll">
                <div class="user-other" v-for="(item,index) in loginInfo.RankShow.slice(3, 10)" :key="index">
                    <div class="ranking">{{index+4}}</div>
                    <div class="user-hedaer">
                        <img :src="item.Headimgurl" alt="">
                    </div>
                    <div class="user-monick">{{item.Nickname}}</div>
                    <div class="user-mj">
                        <img src="../../assets/img/majiang-rev.png" alt="">
                    </div>
                    <div class="user-number">{{item.CardSum | recopymjnumber}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['loginInfo']),
        },
        methods:{
            ...mapMutations(['PRIZETYPE']),
        },
    }
</script>