<template>
    <div class="overview">
        <div class="top">
            <div class="t">数据总览</div>
            <div class="time">
                <Time @selectTime="onSelectTime" @loading="onLoading"/>
            </div>
        </div>
        <div class="row">
            <div class="item">
                <span><img src="../../assets/images/overview/1.png" alt=""></span>
                <div class="data">{{user.newUserAmount}}</div>
                <div class="name">新增用户</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/2.png" alt=""></span>
                <div class="data">{{user.activeUserAmount}}</div>
                <div class="name">总活跃用户</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/3.png" alt=""></span>
                <div class="data">{{otc}}</div>
                <div class="name">参与竞猜人数</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/4.png" alt=""></span>
                <div class="data">{{totalNum}}</div>
                <div class="name">总投注笔数</div>
            </div>
        </div>
        <div class="coin"
             v-loading="loading"
             element-loading-text="加载中"
             element-loading-background="rgba(255, 255, 255, .5)">
            <div class="title">各币种投注详情</div>
            <div class="coin-t">
                <div class="p f">币种</div>
                <div class="p">投注总金额</div>
                <div class="p">派奖总金额</div>
                <div class="p">总盈利</div>
            </div>
            <div class="coin-t coin-i titan">
                <div class="p i f">TITAN</div>
                <div class="p i">{{titanCoin.betMoney}}</div>
                <div class="p i">{{titanCoin.awardMoney}}</div>
                <div class="p i">{{titanCoin.incomeMoney}}</div>
            </div>
            <div class="coin-t coin-i usdt">
                <div class="p i f">USDT</div>
                <div class="p i">{{usdtCoin.betMoney}}</div>
                <div class="p i">{{usdtCoin.awardMoney}}</div>
                <div class="p i">{{usdtCoin.incomeMoney}}</div>
            </div>
            <div class="coin-t coin-i eth">
                <div class="p i f">ETH</div>
                <div class="p i">{{ethCoin.betMoney}}</div>
                <div class="p i">{{ethCoin.awardMoney}}</div>
                <div class="p i">{{ethCoin.incomeMoney}}</div>
            </div>
        </div>
        <div class="chart">
            <div class="user">
                <UserChart/>
            </div>
        </div>


    </div>
</template>


<script>
    import Time from '../../components/time/Time'
    import UserChart from '../../components/chart/UserChart'

    export default {
        components:{Time,UserChart},
        data(){
            return{
                otc:0,
                user:{},
                totalNum:0,
                titanCoin:{},
                ethCoin:{},
                usdtCoin:{},
                loading:true,

            }
        },
        computed:{

        },
        created:function(){

        },
        methods:{
            onSelectTime(res){
                this.user=res.user
                this.otc=res.otc
                this.totalNum=res.totalNum
                this.titanCoin=res.titanCoin
                this.ethCoin=res.ethCoin
                this.usdtCoin=res.usdtCoin
                if(this.usdtCoin.hasOwnProperty('data')){
                    this.titanCoin=res.titanCoin.data
                    this.ethCoin=res.ethCoin.data
                    this.usdtCoin=res.usdtCoin.data
                }
            },
            onLoading(loading){
                if(loading){
                    this.loading=true
                }else{
                    this.loading=false
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .overview{
        width: 100%;
        min-width: 1200px;
        box-sizing: border-box;
        padding: 0 20px;

        padding-bottom: 200px;

    }
    .top{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        margin:20px 0;
        .t{
            display: flex;
            align-items: center;
            font-size: 22px;
            color: #455A64;
            margin-right: 20px;
        }
    }
    .row{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap:wrap;
        align-items: center;
        min-width: 900px;
        .item{
            width: 230px;
            height: 130px;
            position: relative;
            margin-bottom: 20px;
            margin-right: 20px;
            span{
                position: absolute;
                top: 0;
                left: 0;
                width: 230px;
                height: 130px;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 100%;
                }
            }
            .data{
                font-size: 40px;
                color: #fff;
                position: relative;
                display: block;
                margin-top: 40px;
                box-sizing: border-box;
                padding: 0 10px;
            }
            .name{
                color: #fff;
                font-size: 18px;
                position: relative;
                box-sizing: border-box;
                padding: 0 10px;
            }
        }
    }
    .coin{
        width: 100%;
        padding:20px;
        box-sizing: border-box;
        box-shadow:0px 0px 3px 0px rgba(45, 66, 58, 0.35);
        border-radius:5px;
        .title{
            color: #455A64;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .coin-t{
            display: flex;
            align-items: center;
            .p{
                width: 25%;
                min-width: 200px;
                color: #777777;
                font-size: 16px;
                height: 40px;
                line-height: 40px;
            }
            .f{
                padding-left: 20px;
                box-sizing: border-box;
            }
        }
        .coin-i{
            .i{
                width: 25%;
                min-width: 200px;
                color: #455A64;
                font-size: 26px;
                height: 60px;
                line-height: 60px;
                font-family: "Microsoft JhengHei UI Light";
            }
            .f{
                color: #455A64;
                font-size: 26px;
                font-family: 微软雅黑;
                position: relative;
                padding-left: 20px;
                box-sizing: border-box;
            }
            .f:after{
                display: block;
                content: '';
                position: absolute;
                top: 1px;
                left: 0;
                width: 5px;
                height: 58px;
            }
        }
        .titan{
            .f:after{
                background: #1E88E5;
            }
        }
        .usdt{
            .f:after{
                background: #745AF2;
            }
        }
        .eth{
            .f:after{
                background: #26C6DA;
            }
        }
    }

    .chart{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        .user{
            box-sizing: border-box;
            width:calc(50% - 15px);
            min-width: 350px;
            height: 460px;
            box-shadow:0px 0px 3px 0px rgba(45, 66, 58, 0.35);
            border-radius:5px;
        }
    }

</style>