<template>
    <div class="finance">
        <div class="top">
            <div class="t">财务总览</div>
            <div class="time">
                <Time @selectTime="onSelectTime"/>
            </div>
        </div>
        <div class="row">
            <div class="item">
                <span><img src="../../assets/images/overview/1.png" alt=""></span>
                <div class="data">{{wxpay>0?wxpay:0}}</div>
                <div class="name">总充值金额（CNY）</div>
            </div>
            <div class="item" v-if="gameName==0">
                <span><img src="../../assets/images/overview/2.png" alt=""></span>
                <div class="data">{{redpacket>0?redpacket:0}}</div>
                <div class="name">总发放红包金额（CNY）</div>
            </div>
        </div>
        <div class="chart">
            <div class="user">
                <FinanceChart/>
            </div>
        </div>
    </div>
</template>

<script>
    import Time from '../../components/time/Time'
    import {wxpaySum,redpacketSum} from "../../service/api/api";
    import FinanceChart from '../../components/chart/FinanceChart'
    import {mapState} from "vuex";
    export default {
        components:{Time,FinanceChart},
        data(){
            return{
                wxpay:'',
                redpacket:'',
            }
        },
        computed:{
            ...mapState(['gameName']),
        },
        methods:{
            onSelectTime(time){
                this.wxpaySum(time[0],time[1])
                this.redpacketSum(time[0],time[1])
            },
            wxpaySum(start,end){
                wxpaySum(start,end).then(res=>{
                    console.log('总充值金额',res)
                    if(res.errcode==2000){
                        this.wxpay=res.data
                    }
                })
            },
            redpacketSum(start,end){
                redpacketSum(start,end).then(res=>{
                    console.log('总发放红包金额',res)
                    if(res.errcode==2000){
                        this.redpacket=res.data
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .finance{
        box-sizing: border-box;
        padding: 20px;
        .top{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 20px;
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
            margin-bottom: 20px;
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

        .chart{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .user{
                box-sizing: border-box;
                width:100%;
                min-width: 350px;
                height: 460px;
                box-shadow:0px 0px 3px 0px rgba(45, 66, 58, 0.35);
                border-radius:5px;
            }
        }
    }
</style>