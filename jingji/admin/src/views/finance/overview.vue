<template>
    <div class="overview">
        <div class="home-con">
            <div class="item item0">
                <div class="item-box">
                    <div class="name">剩余金额</div>
                    <div class="data">{{data.TotalLast>0?data.TotalLast:0}}</div>
                    <div class="ratio">
                        <div class="l">周环比
                            <div :class="parseInt(data.lastMoneyLastWeek)>=0?'z':'f'"></div>
                            {{data.lastMoneyLastWeek}}</div>
                        <div class="r">日环比
                            <div :class="parseInt(data.lastMoneyYestoday)>=0?'z':'f'"></div>
                            {{data.lastMoneyYestoday}}</div>
                    </div>
                    <div class="bot">今日剩余金额 <span>￥{{data.toadyLastMoney>0?data.toadyLastMoney:0}}</span></div>

                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">计算公式：剩余金额=总参赛消耗点券-总奖金发放金额</div>
                            <div style="padding-bottom: 15px;">昨日环比=（昨日剩余金额-前日剩余金额）/前日剩余金额×%</div>
                            <div style="padding-bottom: 15px;">上周环比=（上周剩余金额-上上周剩余金额）/上上周剩余金额×%</div>
                        </div>
                        <div class="icon" slot="reference"><img src="../../assets/images/finance/icon1.png" alt=""></div>
                    </el-popover>

                </div>
            </div>
            <div class="item item1">
                <div class="item-box">
                    <div class="name">总充值金额</div>
                    <div class="data">{{data.TotalCharge>0?data.TotalCharge/100:0}}</div>
                    <div class="ratio">
                        <div class="l">周环比
                            <div :class="parseInt(data.TotalChargeLastWeek)>=0?'z':'f'"></div>
                            {{data.TotalChargeLastWeek}}</div>
                        <div class="r">日环比
                            <div :class="parseInt(data.TotalChargeYestoday)>=0?'z':'f'"></div>
                            {{data.TotalChargeYestoday}}</div>
                    </div>
                    <div class="bot">今日充值金额 <span>￥{{data.todayTotalCharge>0?data.todayTotalCharge:0}}</span></div>

                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">昨日环比=（昨日总充值金额-前日总充值金额）/前日总充值金额×%</div>
                            <div style="padding-bottom: 15px;">上周环比=（上周总充值金额-上上周总充值金额）/上上周总充值金额×%</div>
                        </div>
                        <div class="icon" slot="reference"><img src="../../assets/images/finance/icon1.png" alt=""></div>
                    </el-popover>
                </div>
            </div>
            <div class="item item3">
                <div class="item-box">
                    <div class="name">总奖金发放金额（税前）</div>
                    <div class="data">{{data.TotalAward>0?data.TotalAward:0}}</div>
                    <div class="ratio">
                        <div class="l">周环比
                            <div :class="parseInt(data.allMoneyLastWeek)>=0?'z':'f'"></div>
                            {{data.allMoneyLastWeek}}</div>
                        <div class="r">日环比
                            <div :class="parseInt(data.allMoneyYestoday)>=0?'z':'f'"></div>
                            {{data.allMoneyYestoday}}</div>
                    </div>
                    <div class="bot">今日奖金发放金额 <span>￥{{data.toadyAllMoney>0?data.toadyAllMoney:0}}</span></div>

                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">昨日环比=（昨日总奖金发放金额-前日总奖金发放金额）/前日总奖金发放金额×%</div>
                            <div style="padding-bottom: 15px;">上周环比=（上周总奖金发放金额-上上周总奖金发放金额）/上上周总奖金发放金额×%</div>
                        </div>
                        <div class="icon" slot="reference"><img src="../../assets/images/finance/icon1.png" alt=""></div>
                    </el-popover>
                </div>
            </div>
            <div class="item item4">
                <div class="item-box">
                    <div class="name">总提现金额</div>
                    <div class="data">{{data.TotalCashout>0?data.TotalCashout:0}}</div>
                    <div class="ratio">
                        <div class="l">周环比
                            <div :class="parseInt(data.cashoutLastWeek)>=0?'z':'f'"></div>
                            {{data.cashoutLastWeek}}</div>
                        <div class="r">日环比
                            <div :class="parseInt(data.cashoutYestoday)>=0?'z':'f'"></div>
                            {{data.cashoutYestoday}}</div>
                    </div>
                    <div class="bot">今日提现金额 <span>￥{{data.todayCashout>0?data.todayCashout:0}}</span></div>

                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">昨日环比=（昨日总提现金额-前日总提现金额）/前日总提现金额×%</div>
                            <div style="padding-bottom: 15px;">上周环比=（上周总提现金额-上上周总提现金额）/上上周总提现金额×%</div>
                        </div>
                        <div class="icon" slot="reference"><img src="../../assets/images/finance/icon1.png" alt=""></div>
                    </el-popover>
                </div>
            </div>
        </div>

        <div class="chart-con">
            <div class="h-t">
               <div class="h-t-l">
                   <el-tabs v-model="activeName" @tab-click="handleClick">
                       <el-tab-pane label="今日" name="first"></el-tab-pane>
                       <el-tab-pane label="昨日" name="fifth"></el-tab-pane>
                       <el-tab-pane label="上周" name="sixth"></el-tab-pane>
                       <el-tab-pane label="本周" name="second"></el-tab-pane>
                       <el-tab-pane label="本月" name="third"></el-tab-pane>
                       <el-tab-pane label="全年" name="fourth"></el-tab-pane>
                   </el-tabs>
               </div>
               <div class="h-t-r">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="change">
                    </el-date-picker>
                </div>
            </div>
            <div class="c-c">
                <div class="l">
                    <ve-histogram :data="chartData1" :extend="extend1"></ve-histogram>
                </div>
                <div class="r">
                    <div class="r-t">赛事奖金发放占比（税后）</div>
                    <ve-pie :data="chartData2"></ve-pie>
                    <div class="r-b">
                        <div class="r-b1" v-for="item in chartData2.rows">
                            <div class="name">{{item.name}}:</div>
                            <div class="value">￥{{item.value}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="chart-con2">
            <div class="l">
                <div class="h-t">道具类型</div>
                <div class="c-c">
<!--                    <div class="c-l">-->
<!--                        <ve-line :data="chartData3" :settings="chartSettings3" height="250px" :extend="extend3"></ve-line>-->
<!--                    </div>-->
<!--                    <div class="c-r">-->
<!--                        <ve-line :data="chartData4" :settings="chartSettings4" height="250px" :extend="extend4"></ve-line>-->
<!--                    </div>-->

                    <ve-line :data="chartData6" :settings="chartSettings6" height="250px" :extend="extend6"></ve-line>

                </div>
                <div class="list">
                    <el-table :data="list"
                              @sort-change="changeTable"
                              style="width: 100%;margin-bottom: 10px;" border height="300">
                        <el-table-column type="index" :index="getInIndex" width="60" label="排名"></el-table-column>
                        <el-table-column prop="_id" label="道具类型" width="200"></el-table-column>
                        <el-table-column prop="all" label="购买次数" width="150" :sortable="'custom'"></el-table-column>
                        <el-table-column prop="weekRaise" label="周涨幅" :sortable="'custom'"></el-table-column>
                    </el-table>
                    <div class="list-r">
                        <el-pagination
                                @current-change="getItemUseList()"
                                :current-page.sync="page"
                                :page-size="per"
                                layout="total, prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="r">
                <div class="h-t">提现金额次数占比</div>
                <div class="c-c">
                    <div class="c-c-t">
                        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick2">
                            <el-tab-pane label="总提现金额" name="first"></el-tab-pane>
                            <el-tab-pane label="昨日" name="second"></el-tab-pane>
                            <el-tab-pane label="上周" name="third"></el-tab-pane>
                            <el-tab-pane label="本周" name="fourth"></el-tab-pane>
                            <el-tab-pane label="上月" name="fifth"></el-tab-pane>
                            <el-tab-pane label="本月" name="sixth"></el-tab-pane>
                            <el-tab-pane label="全年" name="seventh"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <ve-ring :data="chartData5"></ve-ring>
                    <div class="c-c-b">
                        <div class="c-c-bt">提现总金额</div>
                        <div class="c-c-bv">￥{{total}}</div>
                    </div>
                    <div class="c-c-bot">
                        <div class="c-c-bot1" v-for="item in chartData5.rows">
                            <span class="qq"></span>
                            <div class="name">{{item.name}}</div>
                            <div class="percent">{{item.percent}}</div>
                            <div class="value">￥{{item.oneTotal}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {getFisrtViewMap,getMatchPercentMap,getFirstViewData,getWeekBuyAndUse,getItemUseList,getTotalCashoutPercent} from "../../service/api/api";
    import {getBeforeToday, getToday} from "../../util/tools/startEndTime";

    export default {
        data(){
            this.extend1={
                'xAxis.0.axisLabel.fontSize':'11',
            }
            this.chartSettings3 = {
                stack: { '每日购买点券数': ['每日购买点券数']},
                area: true,
                yAxisType:[]
            }

            this.chartSettings4 = {
                stack: { '每日消耗点券数': ['每日消耗点券数']},
                area: true
            }
            this.chartSettings6 = {
                stack: { '点券数': ['每日购买点券数','每日消耗点券数']},
                area: true,
                yAxisType:[]
            }
            this.extend3={
                'yAxis.0.show': false,
            }
            this.extend4={
                'yAxis.0.show': false,

            }
            this.extend6={
                'yAxis.0.show': false,
            }
            return{
                data:{},
                MapPeriod:1,
                activeName:"first",
                activeName2:"first",
                chartData1: {
                    columns: ['日期', '剩余金额', '充值金额', '奖金发放金额','提现金额'],
                    rows: []
                },
                chartData2: {
                    columns: ['name','value'],
                    rows: []
                },

                start:"",
                end:"",
                time:[getBeforeToday(),getToday()],

                chartData3:{
                    columns: ['日期', '每日购买点券数',],
                    rows: []
                },
                chartData4:{
                    columns: ['日期', '每日消耗点券数',],
                    rows: []
                },
                chartData6:{
                    columns: ['日期', '每日购买点券数','每日消耗点券数'],
                    rows: []
                },
                page:1,
                per:5,
                sort:1,
                list:[],
                count:0,

                MapPeriod2:1,
                chartData5:{
                    columns: ['name', 'value'],
                    rows: []
                },
                total:0,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getFirstViewData()
            this.getFisrtViewMap()
            this.getMatchPercentMap()
            this.getWeekBuyAndUse()
            this.getItemUseList()
            this.getTotalCashoutPercent()
        },
        methods:{
            handleClick(tab, event){
                switch (this.activeName) {
                    case "first":
                        this.MapPeriod=1
                        break;
                    case "second":
                        this.MapPeriod=2
                        break;
                    case "third":
                        this.MapPeriod=3
                        break;
                    case "fourth":
                        this.MapPeriod=4
                        break;
                    case "fifth":
                        this.MapPeriod=5
                        break;
                    case "sixth":
                        this.MapPeriod=6
                        break;
                }
                this.getFisrtViewMap()
            },
            handleClick2(tab, event){
                switch (this.activeName2) {
                    case "first":
                        this.MapPeriod2=1
                        break;
                    case "second":
                        this.MapPeriod2=2
                        break;
                    case "third":
                        this.MapPeriod2=3
                        break;
                    case "fourth":
                        this.MapPeriod2=4
                        break;
                    case "fifth":
                        this.MapPeriod2=5
                        break;
                    case "sixth":
                        this.MapPeriod2=6
                        break;
                    case "seventh":
                        this.MapPeriod2=7
                        break;
                }
                this.getTotalCashoutPercent()
            },
            change(){
                this.getMatchPercentMap()
            },
            changeTable(column){
                switch (column.prop) {
                    case 'all':
                       if(column.order=='ascending'){
                            this.sort=2
                       } else if(column.order=='descending'){
                           this.sort=1
                       }else{
                           this.sort=1
                       }
                        break;
                    case 'weekRaise':
                        if(column.order=='ascending'){
                            this.sort=4
                        } else if(column.order=='descending'){
                            this.sort=3
                        }else{
                            this.sort=1
                        }
                        break;
                }
                this.getItemUseList()
            },
            getFirstViewData(){
                getFirstViewData().then(res=>{
                    console.log("首页",res)
                    if(res.code==0){
                        this.data=res.data
                    }
                })
            },
            getFisrtViewMap(){
                getFisrtViewMap(this.MapPeriod).then(res=>{
                    console.log("总盈利图",res)
                    if(res.code==0){
                        let arr= res.data
                        this.chartData1.rows=[]
                        for(let i in arr){
                            this.chartData1.rows.push({
                                '日期':arr[i].period,
                                // '日期':`${parseInt(i)*2}~${(parseInt(i)+1)*2}`,
                                '剩余金额': arr[i].lastMoney,
                                '充值金额': arr[i].totalCharge,
                                '奖金发放金额': arr[i].allMoney,
                                '提现金额':arr[i].cashout
                            })
                        }
                    }
                })
            },
            getMatchPercentMap(){
                getMatchPercentMap(this.time[0],this.time[1]).then(res=>{
                    console.log("赛事奖金发放占比图",res)
                    if(res.code==0){
                        let arr= res.data
                        this.chartData2.rows=[]
                        for(let i in arr){
                            this.chartData2.rows.push({
                                'name':arr[i]._id,
                                'value': arr[i].all,
                            })
                        }
                    }
                })
            },
            getWeekBuyAndUse(){
                getWeekBuyAndUse().then(res=>{
                    console.log("每日购买/每日消耗点券数",res)
                    if(res.code==0){
                        let arr1= res.buy
                        let arr2= res.use
                        this.chartData3.rows=[]
                        this.chartData4.rows=[]
                        this.chartData6.rows=[]
                        for(let i in arr1){
                            for(let j in arr1[i]){
                                this.chartData3.rows.push({
                                    '日期':j,
                                    '每日购买点券数': arr1[i][j],
                                })
                            }
                        }
                        for(let i in arr2){
                            for(let j in arr2[i]){
                                this.chartData4.rows.push({
                                    '日期':j,
                                    '每日消耗点券数': arr2[i][j],
                                })
                            }
                        }
                        for(let i in arr2){
                            for(let j in arr2[i]){
                                this.chartData6.rows.push({
                                    '日期':j,
                                    '每日购买点券数': arr1[i][j],
                                    '每日消耗点券数': arr2[i][j],
                                })
                            }
                        }
                    }
                })
            },

            getTotalCashoutPercent(){
                getTotalCashoutPercent(this.MapPeriod2).then(res=>{
                    console.log("提现金额次数占比",res)
                    if(res.code==0){
                        let arr= res.data
                        this.chartData5.rows=[]
                        for(let i in arr){
                            this.chartData5.rows.push({
                                'name':arr[i]._id,
                                'value': arr[i].count,
                                'percent': arr[i].percent,
                                'oneTotal': arr[i].oneTotal,
                            })
                            this.total = arr[i].total
                        }
                    }
                })
            },
            getItemUseList(){
                getItemUseList(this.page,this.per,this.sort).then(res=>{
                    console.log("列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .overview{
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
                width:300px;
                height:200px;
                position: relative;
                margin-bottom: 20px;
                margin-right: 20px;
                background: #fff;
                border-radius: 15px;
                padding: 20px;
                box-sizing: border-box;
                .item-box{
                    position: relative;
                    .name{
                        color: #909399;
                        font-size: 14px;
                        position: relative;
                        box-sizing: border-box;
                        margin-bottom: 10px;
                    }
                    .data{
                        font-size:40px;
                        color: #333;
                        position: relative;
                        display: block;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                    }
                    .ratio{
                        font-size:14px;
                        color: #909399;
                        position: relative;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        height: 40px;
                        line-height: 40px;
                        border-bottom: 1px solid #EBEEF5;
                        margin-bottom: 15px;
                        .l,.r{
                            width: 50%;
                            display: flex;
                            align-items: center;
                            flex-shrink: 0;
                            .z{
                                position:relative;
                                width: 0;
                                height: 0;
                                border-width: 0 6px 6px;
                                border-style: solid;
                                border-color: transparent transparent #F56C6C;
                                margin: 0 6px;
                            }
                            .f{
                                position: relative;
                                top:3px;
                                width: 0;
                                height: 0;
                                /*border-top: 6px solid #2196f3;*/
                                border-top: 6px solid #19d4ae;
                                border-right: 6px solid transparent;
                                border-bottom: 6px solid transparent;
                                border-left: 6px solid transparent;
                                margin: 0 6px;
                            }
                        }
                    }
                    .bot{
                        font-size:14px;
                        color: #333;
                        position: relative;
                        box-sizing: border-box;
                        span{
                            padding-left: 3px;
                        }
                    }
                    .icon{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width:20px;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
        .chart-con{
            width:calc(100% - 40px);
            margin:0 auto ;
            padding:10px 20px;
            box-sizing: border-box;
            background: #fff;
            height: 500px;
            .h-t{
                position: relative;
                height: 80px;
                .h-t-l{
                    height: 60px;
                    line-height: 60px;
                }
                .h-t-r{
                    position: absolute;
                    right: 0;
                    top: 5px;
                }
            }
            .c-c{
                width: 100%;
                display: flex;
                .l{
                    width:70%;
                    /*border: 1px solid red;*/
                }
                .r{
                    width: 30%;
                   position: relative;
                    .r-t{
                        box-sizing: border-box;
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        padding-left: 20px;
                    }
                    .r-b{
                        position: absolute;
                        bottom: 25px;
                        right: 0;
                        width: calc(100% - 40px);
                        min-width: 360px;
                        height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin: 0 auto;
                        .r-b1{
                            display: flex;
                            align-items: center;
                            margin-top: 10px;
                            flex-shrink: 0;
                            .name{
                                font-size: 14px;
                            }
                            .value{
                                color: #333;
                                font-size: 14px;
                            }
                        }
                        .r-b1:nth-child(1){
                            .name{
                                color:#19d4ae ;
                            }
                        }
                        .r-b1:nth-child(2){
                            .name{
                                color:#5ab1ef ;
                            }
                        }
                        .r-b1:nth-child(3){
                            .name{
                                color:#fa6e86 ;
                            }
                        }
                    }
                }
            }

        }
        .chart-con2{
            width:calc(100% - 40px);
            margin:0 auto ;
            height: 900px;
            box-sizing: border-box;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            .l,.r{
                width: calc(50% - 10px);
                overflow: hidden;
                background: #fff;
                height:710px;
                box-sizing: border-box;
                padding: 20px;
                padding-top: 0;
                .h-t{
                    box-sizing: border-box;
                    font-size: 14px;
                    font-weight: bold;
                    height: 60px;
                    line-height: 60px;
                    border-bottom: 1px solid #EBEEF5;
                }
            }
            .l{
                /*.c-c{*/
                /*    box-sizing: border-box;*/
                /*    padding: 20px 0;*/
                /*    display: flex;*/
                /*    justify-content: space-between;*/
                /*    .c-l,.c-r{*/
                /*        width: calc(50% - 30px);*/
                /*    }*/
                /*}*/
                .c-c{
                    box-sizing: border-box;
                    padding: 20px 0;
                    width: 100%;
                }
                .list{
                    .list-r{
                        text-align: right;
                    }
                }
            }
            .r{
                .c-c{
                    box-sizing: border-box;
                    padding: 20px 0;
                    position: relative;
                    .c-c-t{
                        display: flex;
                        justify-content: center;
                        margin-bottom: 30px;
                    }
                    .c-c-b{
                        width: 130px;
                        height: 100px;
                        /*border: 1px solid red;*/
                        position: absolute;
                        left: 50%;
                        top: calc(50% + 40px);
                        transform: translate(-50%,-50%);
                        .c-c-bt{
                            font-size: 14px;
                            color: #909399;
                            text-align: center;
                            margin-top:30px;
                        }
                        .c-c-bv{
                            font-size: 20px;
                            font-weight: bold;
                            color: #333;
                            text-align: center;
                            margin-top: 15px;
                        }
                    }
                    .c-c-bot{
                        position: absolute;
                        margin: 0 auto;
                        /*border: 1px solid red;*/
                        bottom: -120px;
                        left:20px;
                        .c-c-bot1{
                            display: flex;
                            align-items: center;
                            margin-bottom: 20px;
                            .qq{
                                width: 8px;
                                height: 8px;
                                border-radius: 50%;
                                overflow: hidden;
                                margin-right: 6px;
                            }
                            .name{
                                font-size: 14px;
                                width: 200px;
                            }
                            .percent{
                                font-size: 14px;
                                color: #909399;
                                width: 200px;
                            }
                            .value{
                                font-size: 14px;
                                width: 200px;
                            }
                        }
                        .c-c-bot1:nth-child(1){.qq{background: #19d4ae}}
                        .c-c-bot1:nth-child(2){.qq{background: #5ab1ef}}
                        .c-c-bot1:nth-child(3){.qq{background: #fa6e86}}
                        .c-c-bot1:nth-child(4){.qq{background: #ffb980}}
                        .c-c-bot1:nth-child(5){.qq{background: #0067a6}}
                        .c-c-bot1:nth-child(6){.qq{background: #c4b4e4}}
                    }
                }
            }

        }
    }
</style>

<style lang="scss">
    .overview{
        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            border-bottom-color: #E4E7ED;
        }
    }
</style>
