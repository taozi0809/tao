<template>
    <div class="financial">
        <div class="top">
            <div class="l">
                <div class="t">财务统计</div>
            </div>
        </div>
        <el-card shadow="always" class="des">
            <div class="t">结算规则: </div>
            <div class="d">1、每周一上午10时结算上周预估返利收入，结算后返利将汇入TITAN账户。由于结算订单量大，结算时间会比较长，建议代理们耐心等待。</div>
            <div class="d">2、预估返利收入显示本周结束并已结算投注比赛的收入，未结束的比赛和串关订单投注不计入预估返利。</div>
        </el-card>


        <el-card shadow="always" class="row">
            <div class="top">
                <div class="t">本周预估返利收入</div>
                <!--<div class="r">查看流水报表</div>-->
                <el-button type="primary" class="r" @click="billflow">查看流水报表</el-button>
            </div>
            <ul class="bot">
                <li class="item" v-for="(item,index) in agencyPredictProfit" :key="index">
                    <div class="name">{{item.coinName}}</div>
                    <div class="value">{{item.money}}</div>
                </li>
            </ul>
        </el-card>

        <el-card shadow="always" class="row">
            <div class="top">
                <div class="t">账户余额</div>
                <!--<div class="r">查看流水报表</div>-->
            </div>
            <ul class="bot">
                <li class="item" v-for="(item,index) in agencyAccountBalance" :key="index">
                    <div class="name">{{item.coinName}}</div>
                    <div class="value">{{item.money}}</div>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
    import {financeInfo} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                agencyAccountBalance:[],
                agencyPredictProfit:[],
            }
        },
        computed:{
            ...mapState(['token']),
        },
        created:function(){
            this.financeInfo()

        },
        methods:{
            billflow(){
                this.$router.push({path:'/a_billflow_f'});
            },
            financeInfo(){
                financeInfo(this.token).then(res=>{
                    console.log('代理的财务统计',res)
                    if(res.code==0){
                        this.agencyAccountBalance=res.data.agencyAccountBalance
                        this.agencyPredictProfit=res.data.agencyPredictProfit
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .financial{
        width: 100%;
        box-sizing: border-box;
        padding:20px 20px;
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 20px;
            .l{
                display: flex;
                align-items: center;
                .item{
                    margin-right: 20px;
                    width: 150px;
                }
                .t{
                    margin-right: 20px;
                    color: #455A64;
                    font-size: 21px;
                }
            }
        }
        .des{
            width: 100%;
            margin-bottom: 20px;
            .t{
                font-size: 18px;
                margin-bottom: 20px;
                font-weight: bold;
            }
            .d{
                font-size: 14px;
                line-height: 1.5;
            }
        }
        .row{
            width: 100%;
            margin-bottom: 20px;
            .top{
                display: flex;
                align-items: center;
                .t{
                    font-size: 18px;
                    font-weight: bold;
                }
                .r{

                }
            }
            .bot{
                display: flex;
                align-items: center;
                .item{
                    width: 300px;
                    display: flex;
                    align-items: center;
                    .name{
                        margin-right: 20px;
                        font-size: 26px;
                        font-family: "Microsoft JhengHei UI Light";
                    }
                    .value{
                        font-size: 26px;
                        font-weight: 300;
                    }
                }
            }


        }
    }
</style>