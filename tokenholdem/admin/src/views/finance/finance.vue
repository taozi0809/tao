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
                <div class="data">{{usdt.USDTSall}}</div>
                <div class="name">USDT总购买数量</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/2.png" alt=""></span>
                <div class="data">{{usdt.USDTSell}}</div>
                <div class="name">USDT总出售数量</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/3.png" alt=""></span>
                <div class="data">{{gact.GACTExpend}}</div>
                <div class="name">GACT总兑出数量</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/6.png" alt=""></span>
                <div class="data">{{gact.GACTObtain}}</div>
                <div class="name">GACT总兑换数量</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Time from '../../components/time/Time'
    import {redchargeCount,redemptionCount} from "../../service/api/api";

    export default {
        components:{Time},
        data(){
            return{
                usdt:{},
                gact:{},
            }
        },
        methods:{
            onSelectTime(time){
                this.redchargeCount(time[0],time[1])
                this.redemptionCount(time[0],time[1])
            },
            redchargeCount(start,end){
                redchargeCount(start,end).then(res=>{
                    console.log('usdt总充值数和总兑换数',res)
                    if(res.errcode==2000){
                        this.usdt=res.data
                    }
                })
            },
            redemptionCount(start,end){
                redemptionCount(start,end).then(res=>{
                    console.log('gact总充值数和总兑换数',res)
                    if(res.errcode==2000){
                        this.gact=res.data
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
    }
</style>