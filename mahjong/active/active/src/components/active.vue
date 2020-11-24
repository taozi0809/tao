<template>
    <div class="active">
        <div class="activity">
            <div class="header-activity">
                <div class="header-left">
                    <img src="../assets/img/act/back.png" alt="" @click="START('1')">
                </div>
                <div class="header-right">
                    <img src="../assets/img/act/act-logo.png" alt="">
                </div>
            </div>
            <div class="row">
                <div class="col act-h2">
                    收集麻将，兑换豪礼，还送银滩旅游！！！
                </div>
            </div>
            <div class="row">
                <div class="col act-time">
                    <p>活动时间：2020年1月1日--2020年2月1日</p>
                </div>
            </div>
            <div class="activity-btn">
                <div class="activity-btn-left" :class="actcon?'active':''" @click="actcon=true">
                    <p>活动介绍</p>
                </div>
                <div class="activity-btn-right" :class="actcon?'':'active'" @click="actcon=false">
                    <p>奖项说明</p>
                </div>
            </div>
            <div class="scrollBox-t touchAdd activity-scroll">
                <div class="act-content-left" v-if="actcon">
                    <div class="act-content-item act-item1">
                        <div class="act-item-box">
                            <p>1.首次参加游戏即可获得两次翻牌机会,点击翻牌按钮得随机麻将:</p>
                            <img src="../assets/img/act/act-content-img1.png" alt="" class="act-content-img1">
                        </div>
                    </div>
                    <div class="act-content-item act-item2">
                        <div class="act-item-box">
                            <p>2.在财神麻将游戏中也会定期发放取牌码,用来兑换翻牌次数。</p>
                            <img src="../assets/img/act/act-content-img2.png" alt="" class="act-content-img2">
                        </div>


                    </div>
                    <div class="act-content-item act-item3">
                        <div class="act-item-box">
                            <p>* 本次活动“麻将”种类共有万、筒、条3类共27种，每种牌可以拥有多张。</p>
                            <p>* 活动中每一种奖项仅可领取一次。</p>
                            <p>* 每天最多翻3次牌。</p>
                        </div>
                    </div>
                </div>
                <div class="act-content-right" v-if="!actcon">
                    <div class="act-content-item act-item11">
                        <div class="act-item-box">
                            <div class="item-img-left">
                                <img src="../assets/img/claim/special.png" alt="">
                            </div>
                            <div class="item-p-right">
                                <p>特等奖：集齐万、筒、条三类花色各9种共27张，即可获得惠州十里银滩三天两晚海滨度假游和iPhone 8 Plus一台。</p>
                            </div>
                            <img src="../assets/img/act/act-set-img1.png" class="act-set">
                        </div>
                    </div>
                    <div class="act-content-item act-item22">
                        <div class="act-item-box">
                            <div class="item-img-left">
                                <img src="../assets/img/claim/gold.png" alt="">
                            </div>
                            <div class="item-p-right">
                                <p>金牌奖：集齐任意两类花色，各9种共18张，即可获得惠州十里银滩三天两晚海滨度假游和小米MIX 2一台。</p>
                            </div>
                            <img src="../assets/img/act/act-set-img2.png" class="act-set">
                        </div>

                    </div>
                    <div class="act-content-item act-item33">
                        <div class="act-item-box">
                            <div class="item-img-left">
                                <img src="../assets/img/claim/silver.png" alt="">
                            </div>
                            <div class="item-p-right">
                                <p>银牌奖：集齐任意一类花色，9种共9张，即可获得小米MAX2一台。</p>
                            </div>
                            <img src="../assets/img/act/act-set-img3.png" class="act-set">
                        </div>
                    </div>
                    <div class="act-content-item act-item44">
                        <div class="act-item-box">
                            <div class="item-img-left">
                                <img src="../assets/img/claim/bronze.png" alt="">
                            </div>
                            <div class="item-p-right">
                                <p>铜牌奖：集齐任意一种胡牌牌型（需同时包含万，条，筒的顺子），即可获得100元话费卡。</p>
                            </div>
                            <img src="../assets/img/act/act-set-img4.png" class="act-set">
                        </div>
                    </div>
                    <div class="act-content-item act-item55">
                        <div class="act-item-box">
                            <div class="item-img-left">
                                <img src="../assets/img/claim/participation.png" alt="">
                            </div>
                            <div class="item-p-right">
                                <p>参与奖：集齐任意10张麻将，即可获得5元现金红包。</p>
                            </div>
                            <img src="../assets/img/act/act-set-img5.png" class="act-set act-set-marginTop">
                        </div>
                    </div>
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
                actcon:true
            }
        },
        methods:{
            ...mapMutations(['START']),
        },
    }
</script>

<style lang="scss" scope>
    .active{
        background:url("../assets/img/act/btn-active.png") no-repeat center !important;
        background-size: 100% !important;
    }
</style>