<template>
    <div class="overview">
        <div class="top">
           <div class="t">数据总览</div>
           <div class="time">
               <Time @selectTime="onSelectTime"/>
           </div>
        </div>
        <div class="row">
            <div class="item">
                <span><img src="../../assets/images/overview/1.png" alt=""></span>
                <div class="data">{{data.NewUserNum}}</div>
                <div class="name">新增用户</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/2.png" alt=""></span>
                <div class="data">{{data.ActiveUserNum}}</div>
                <div class="name">总活跃用户</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/3.png" alt=""></span>
                <div class="data">{{data.OnlineUserNum}}</div>
                <div class="name">当前在线用户</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/6.png" alt=""></span>
                <div class="data">{{data.TotalUserNum}}</div>
                <div class="name">累计用户</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/4.png" alt=""></span>
                <div class="data">{{data.TotalProfit}}</div>
                <div class="name">总盈利（GACT）</div>
            </div>
            <div class="item">
                <span><img src="../../assets/images/overview/5.png" alt=""></span>
                <div class="data">{{data.TotalTax}}</div>
                <div class="name">总抽水（GACT）</div>
            </div>

        </div>
        <div class="chart">
            <div class="user">
                <UserChart/>
            </div>
            <div class="user">
                <ProfitChart/>
            </div>
        </div>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'
    import {pastDaily} from "../../service/api/api";
    import Time from '../../components/time/Time'
    import UserChart from '../../components/chart/UserChart'
    import ProfitChart from '../../components/chart/ProfitChart'

    export default {
        components:{Time,UserChart,ProfitChart},
        data(){
            return{
                data:{}
            }
        },
        methods:{
            onSelectTime(time){
                this.pastDaily(time[0],time[1])
            },
            pastDaily(start,end){
                pastDaily(start,end).then(res=>{
                    console.log('数据总览',res)
                    if(res.errcode==2000){
                        this.data=res.data
                    }else{
                        this.data={
                            NewUserNum:0,
                            ActiveUserNum:0,
                            OnlineUserNum:0,
                            TotalUserNum:0,
                            TotalProfit:0,
                            TotalTax:0,
                        }
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .overview{
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
                width:calc(50% - 15px);
                min-width: 350px;
                height: 460px;
                box-shadow:0px 0px 3px 0px rgba(45, 66, 58, 0.35);
                border-radius:5px;
            }
        }
    }
</style>