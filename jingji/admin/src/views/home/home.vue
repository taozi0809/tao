<template>
    <div class="home">
        <Head/>
        <Aside/>
        <div class="main" :class="isCollapse?'main-pack-up':'main-unfold'">
            <Analysis v-if="$route.path=='/home'"/>
<!--            <div class="home-con" v-if="$route.path=='/home'">-->
<!--                <div class="item item0">-->
<!--                    <div class="item-box">-->
<!--                        <div class="data">{{data.TotalUser>0?data.TotalUser:0}}</div>-->
<!--                        <div class="name">总用户数量</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="item item1">-->
<!--                    <div class="item-box">-->
<!--                        <div class="data">{{data.TotalCharge>0?data.TotalCharge/100:0}}</div>-->
<!--                        <div class="name">总充值金额</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="item item3">-->
<!--                    <div class="item-box">-->
<!--                        <div class="data">{{data.TotalSignFee>0?data.TotalSignFee:0}}</div>-->
<!--                        <div class="name">总报名金额</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="item item4">-->
<!--                    <div class="item-box">-->
<!--                        <div class="data">{{data.TotalAward>0?data.TotalAward:0}}</div>-->
<!--                        <div class="name">总奖励金额</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="item item5">-->
<!--                    <div class="item-box">-->
<!--                        <div class="data">{{data.TotalLast>0?data.TotalLast:0}}</div>-->
<!--                        <div class="name">总剩余金额</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/head/Head'
    import Aside from '../../components/aside/Aside'
    import {mapState, mapMutations} from 'vuex'
    import {getFirstViewData} from "../../service/api/api";
    import Analysis from "../data/analysis"
    export default {
        components:{Head,Aside,Analysis},
        data(){
            return{
                data:{},
            }
        },
        computed:{
            ...mapState(['isCollapse']),
        },
        created() {
            this.getFirstViewData()
        },
        methods:{
            getFirstViewData(){
                getFirstViewData().then(res=>{
                    console.log("获取首页",res)
                    if(res.code==0){
                        this.data=res.data
                    }
                })
            },
        }
    }

</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        .main{
            position: fixed;
            right: 0;
            top:60px;
            left:180px;
            bottom: 0;
            min-width: 1020px;
            background: #f0f2f5;
            box-sizing: border-box;
            transition:left 0.3s;
            overflow-x: hidden;
            overflow-y: auto;
            z-index: 2001;
        }
        .main-pack-up{
            left:60px;
        }
        .main-unfold{
            left:180px;
        }
        .home-con{
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-wrap:wrap;
            align-items: center;
            margin-bottom: 20px;
            margin-top: 20px;
            padding: 0 20px;
            .item{
                width: 230px;
                height: 130px;
                position: relative;
                margin-bottom: 20px;
                margin-right: 20px;
                overflow: hidden;
                .data{
                    font-size: 40px;
                    color: #fff;
                    position: relative;
                    display: block;
                    margin-top:30px;
                    box-sizing: border-box;
                    padding: 0 10px;
                }
                .name{
                    color: #fff;
                    font-size: 20px;
                    position: relative;
                    box-sizing: border-box;
                    padding: 0 10px;
                    margin-top: 10px;
                }
            }
            .item0{
                background: url("../../assets/images/home/5.png");
                background-size: 100% 100%;

            }
            .item1{
                background: url("../../assets/images/home/1.png");
                background-size: 100% 100%;
            }
            .item2{
                background: url("../../assets/images/home/2.png");
                background-size: 100% 100%;
            }
            .item3{
                background: url("../../assets/images/home/3.png");
                background-size: 100% 100%;

            }
            .item4{
                background: url("../../assets/images/home/4.png");
                background-size: 100% 100%;
            }
            .item5{
                background: url("../../assets/images/home/5.png");
                background-size: 100% 100%;
            }
            .item6{
                background: url("../../assets/images/home/6.png");
                background-size: 100% 100%;
            }
            .item7{
                background: url("../../assets/images/home/5.png");
                background-size: 100% 100%;
            }
            .item8{
                background: url("../../assets/images/home/4.png");
                background-size: 100% 100%;
            }
            .item9{
                background: url("../../assets/images/home/1.png");
                background-size: 100% 100%;
            }
            .item10{
                background: url("../../assets/images/home/2.png");
                background-size: 100% 100%;
            }
            .item11{
                background: url("../../assets/images/home/3.png");
                background-size: 100% 100%;

            }

        }
    }
</style>
