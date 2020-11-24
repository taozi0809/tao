<template>
    <div class="analysis">
        <div class="con1">
            <div class="l">
                <div class="l1">
                    <div class="name">今日新增用户</div>
                    <div class="num">{{data.NewToday}}</div>
                    <div class="per">
                        <div class="n">同比</div>
                        <div class="v">{{data.NewSameCompare}}</div>
                        <div class="jt" v-if="data.NewSameCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                        <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>

                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">昨日新增用户：{{data.NewYestoday}}</div>
                            <div style="padding-bottom: 15px;">前7日新增用户总数：{{data.NewLast7Days}}</div>
                            <div style="padding-bottom: 15px;">前30日新增用户总数：{{data.NewLast30Days}}</div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/l1.png" alt=""></div>
                    </el-popover>

                </div>
                <div class="l1">
                    <div class="name">今日活跃用户</div>
                    <div class="num">{{data.ActiveToday}}</div>
                    <div class="per">
                        <div class="n">同比</div>
                        <div class="v">{{data.ActiveCompare}}</div>
                        <div class="jt" v-if="data.ActiveCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                        <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">昨日活跃用户：{{data.ActiveYestoday}}</div>
                            <div style="padding-bottom: 15px;">前7日活跃用户总数：{{data.Active7Days}}</div>
                            <div style="padding-bottom: 15px;">前30日活跃用户总数：{{data.Active30Days}}</div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/l2.png" alt=""></div>
                    </el-popover>
                </div>
                <div class="l1">
                    <div class="name">新用户次日留存率(7日平均)</div>
                    <div class="num">{{data.KeepAnv7today}}</div>
                    <div class="per">
                        <div class="n">同比</div>
                        <div class="v">{{data.KeepSameCompare}}</div>
                        <div class="jt" v-if="data.KeepSameCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                        <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">新用户次日留存率：新增用户中次日登录用户数/新增用户数*100% 简单来说，就是有多少新用户第二天继续登录软件</div>
                            <div style="padding-bottom: 15px;">昨日新用户次日留存率：{{data.KeepYestoday}}</div>
                            <div style="padding-bottom: 15px;">新用户7日留存率：{{data.KeepLast7Days}}</div>
                            <div style="padding-bottom: 15px;">新用户30日留存率：{{data.KeepLast30Days}}</div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/l3.png" alt=""></div>
                    </el-popover>
                </div>
                <div class="l1">
                    <div class="name">点券赠送总额</div>
                    <div class="num">{{data.CouponAwardTotal}}</div>
                    <div class="per">
                        <div class="n">同比</div>
                        <div class="v">{{data.CouponAwardCompare}}</div>
                        <div class="jt" v-if="data.CouponAwardCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                        <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">今日点券赠送：{{data.CouponAwardToday}}</div>
                            <div style="padding-bottom: 15px;">昨日点券赠送：{{data.CouponAwardYestoday}}</div>
                            <div style="padding-bottom: 15px;">前7日点券赠送：{{data.CouponAward7Days}}</div>
                            <div style="padding-bottom: 15px;">前30日点券赠送：{{data.CouponAward30Days}}</div>
                            <div style="padding-bottom: 15px;"></div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/l4.png" alt=""></div>
                    </el-popover>
                </div>
            </div>
            <div class="r">
                <div class="r1">
                    <div class="r2">
                        <div class="name">充值总额</div>
                        <div class="num">{{data.ChargeTotal}}</div>
                        <div class="per">
                            <div class="n">同比</div>
                            <div class="v">{{data.ChargeCompare}}</div>
                            <div class="jt" v-if="data.ChargeCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                            <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                        </div>
                    </div>
                    <div class="r2">
                        <div class="name">提现总额</div>
                        <div class="num">{{data.CashoutTotal}}</div>
                        <div class="per">
                            <div class="n">同比</div>
                            <div class="v">{{data.CashoutCompare}}</div>
                            <div class="jt" v-if="data.CashoutCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                            <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                        </div>
                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">今日盈亏额：{{data.PlatformProfitToday}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">今日累计充值金额：{{data.ChargeToday}}</div>
                            <div style="padding-bottom: 15px;">今日累计提现金额：{{data.CashoutToday}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">昨日累计充值金额：{{data.ChargeYestoday}}</div>
                            <div style="padding-bottom: 15px;">昨日累计提现金额：{{data.CashoutYestoday}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">前7日累计充值金额：{{data.Charge7Days}}</div>
                            <div style="padding-bottom: 15px;">前7日累计提现金额：{{data.Cashout7Days}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">前30日累计充值金额：{{data.Charge30Days}}</div>
                            <div style="padding-bottom: 15px;">前30日累计提现金额：{{data.Cashout30Days}}</div>
                            <div style="padding-bottom: 15px;"></div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/r1.png" alt=""></div>
                    </el-popover>
                </div>
                <div class="r1">
                    <div class="r2">
                        <div class="name">点券消耗总额</div>
                        <div class="num">{{data.CouponUseTotal}}</div>
                        <div class="per">
                            <div class="n">同比</div>
                            <div class="v">{{data.CouponUseCompare}}</div>
                            <div class="jt" v-if="data.CouponUseCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                            <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                        </div>
                    </div>
                    <div class="r2">
                        <div class="name">奖金发放总额</div>
                        <div class="num">{{data.TotalAwardTotal}}</div>
                        <div class="per">
                            <div class="n">同比</div>
                            <div class="v">{{data.TotalAwardCompare}}</div>
                            <div class="jt" v-if="data.TotalAwardCompare>=0"><img src="../../assets/images/data/sjt.png" alt=""></div>
                            <div class="jt" v-else><img src="../../assets/images/data/xjt.png" alt=""></div>
                        </div>
                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">今日点券消耗总额：{{data.CouponUseToday}}</div>
                            <div style="padding-bottom: 15px;">今日奖金发放总额：{{data.TotalAwardToday}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">昨日点券消耗总额：{{data.CouponUseYestoday}}</div>
                            <div style="padding-bottom: 15px;">昨日奖金发放总额：{{data.TotalAwardYestoday}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">前7日点券消耗总额：{{data.CouponUse7Days}}</div>
                            <div style="padding-bottom: 15px;">前7日奖金发放总额：{{data.TotalAward7Days}}</div>
                            <div style="padding-bottom: 15px;"></div>
                            <div style="padding-bottom: 15px;">前30日点券消耗总额：{{data.CouponUse30Days}}</div>
                            <div style="padding-bottom: 15px;">前30日奖金发放总额：{{data.TotalAward30Days}}</div>
                            <div style="padding-bottom: 15px;"></div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/r2.png" alt=""></div>
                    </el-popover>
                </div>
                <div class="rba">
                    <div class="rb1">
                        <div class="name">累计用户</div>
                        <div class="num">{{data.TotalPlayers}}</div>
                    </div>
                    <div class="rb1">
                        <div class="name">实名人数</div>
                        <div class="num">{{data.TotalRealNamePlayers}}</div>
                    </div>
                </div>
                <div class="rbb">
                    <div class="rb1">
                        <div class="name">代理人数</div>
                        <div class="num">{{data.TotalAgents}}</div>
                    </div>
                    <div class="rb1">
                        <div class="name">累计赛事消耗场次</div>
                        <div class="num">{{data.MatchUseTotal}}</div>
                    </div>
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover">
                        <div class="icondes">
                            <div style="padding-bottom: 15px;">今日赛事消耗场次：{{data.MatchUseToday}}</div>
                            <div style="padding-bottom: 15px;">昨日赛事消耗场次：{{data.MatchUseYestoday}}</div>
                            <div style="padding-bottom: 15px;">前7日赛事消耗场次：{{data.MatchUse7Days}}</div>
                            <div style="padding-bottom: 15px;">前30日赛事消耗场次：{{data.MatchUse30Days}}</div>
                            <div style="padding-bottom: 15px;"></div>
                        </div>
                        <div class="logo" slot="reference"><img src="../../assets/images/data/r3.png" alt=""></div>
                    </el-popover>
                </div>
            </div>
        </div>
        <div class="con2">
            <div class="ct">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="新增用户" name="first"></el-tab-pane>
                    <el-tab-pane label="活跃用户" name="second"></el-tab-pane>
                    <el-tab-pane label="累计用户" name="third"></el-tab-pane>
                    <el-tab-pane label="充值总额/提现总额" name="fourth"></el-tab-pane>
                    <el-tab-pane label="赛事消耗场次" name="fifth"></el-tab-pane>
                    <el-tab-pane label="新用户次日留存率" name="sixth"></el-tab-pane>
                </el-tabs>
                <div class="r">
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
            <div class="cb">
                <ve-line :data="chartData" v-loading="loading1"></ve-line>
            </div>
        </div>
        <div class="con3">
            <div class="ct">
                <el-tabs v-model="activeName2" @tab-click="handleClick2">
                    <el-tab-pane label="充值金额/提现金额" name="first"></el-tab-pane>
                    <el-tab-pane label="点券赠送数量/消耗点券数量/奖金发放金额" name="second"></el-tab-pane>
                </el-tabs>
                <div class="r">
                    <el-date-picker
                            v-model="time2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="change2">
                    </el-date-picker>
                </div>
            </div>
            <div class="cb">
                <ve-histogram :data="chartData2" v-loading="loading2"></ve-histogram>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAnalysisFirstView,getAnalysisTotalMap,getAnalysisBarMap} from "../../service/api/api";
    import {getBeforeToday, getToday} from "../../util/tools/startEndTime";

    export default {
        data(){
            return{
                data:{},

                activeName:"first",
                time:[getBeforeToday(),getToday()],
                chartData: {
                    columns: ['日期', '新增用户'],
                    rows: []
                },

                activeName2:"first",
                time2:[getBeforeToday(),getToday()],
                chartData2: {
                    columns: ['日期', '充值金额','提现金额'],
                    rows: []
                },

                loading1:true,
                loading2:true
            }
        },
        created() {
            this.getAnalysisFirstView()
            this.getAnalysisTotalMap()
            this.getAnalysisBarMap()
        },
        methods:{
            change(){
                this.getAnalysisTotalMap()
            },
            change2(){
                this.getAnalysisBarMap()
            },
            handleClick(){
                this.getAnalysisTotalMap()
            },
            handleClick2(){
                this.getAnalysisBarMap()
            },
            getAnalysisFirstView(){
                getAnalysisFirstView().then(res=>{
                    console.log("数据分析",res)
                    if(res.code==0){
                        this.data=res.data
                    }
                })
            },
            getAnalysisTotalMap(){
                this.loading1=true
                let ReqType=''
                switch (this.activeName) {
                    case "first":
                        ReqType=1
                        this.chartData.columns=['日期', '新增用户']
                        break;
                    case "second":
                        ReqType=2
                        this.chartData.columns=['日期', '活跃用户']
                        break;
                    case "third":
                        ReqType=3
                        this.chartData.columns=['日期', '累计用户']
                        break;
                    case "fourth":
                        ReqType=4
                        this.chartData.columns=['日期', '充值总额','提现总额']
                        break;
                    case "fifth":
                        ReqType=5
                        this.chartData.columns=['日期', '赛事消耗场次']
                        break;
                    case "sixth":
                        ReqType=6
                        this.chartData.columns=['日期', '新用户次日留存率']
                        break;
                }
                getAnalysisTotalMap(this.time[0],this.time[1],ReqType).then(res=>{
                    console.log("数据分析折线图",res)
                    this.loading1=false
                    if(res.code==0){
                        if(
                            this.activeName=='first'&&ReqType==1 ||
                            this.activeName=='second'&&ReqType==2 ||
                            this.activeName=='third'&&ReqType==3 ||
                            this.activeName=='fourth'&&ReqType==4 ||
                            this.activeName=='fifth'&&ReqType==5 ||
                            this.activeName=='sixth'&&ReqType==6

                        ){
                            this.chartData.rows=[]
                        }else{
                            return
                        }
                        switch (this.activeName) {
                            case "first":
                                var arr= res.data
                                for(let i in arr){
                                    this.chartData.rows.push({
                                        '日期':Object.keys(arr[i])[0],
                                        '新增用户': Object.values(arr[i])[0]
                                    })
                                }
                                break;
                            case "second":
                                var arr= res.data
                                for(let i in arr){
                                    this.chartData.rows.push({
                                        '日期':Object.keys(arr[i])[0],
                                        '活跃用户': Object.values(arr[i])[0]
                                    })
                                }
                                break;
                            case "third":
                                var arr= res.data
                                for(let i in arr){
                                    this.chartData.rows.push({
                                        '日期':Object.keys(arr[i])[0],
                                        '累计用户': Object.values(arr[i])[0]
                                    })
                                }
                                break;
                            case "fourth":
                                var arr1 = res.data[0].Charge
                                var arr2 = res.data[0].Cashout
                                for(let i in arr1){
                                    this.chartData.rows.push({
                                        '日期':Object.keys(arr1[i])[0],
                                        '充值总额': Object.values(arr1[i])[0],
                                        '提现总额': Object.values(arr2[i])[0]
                                    })
                                }
                                break;
                            case "fifth":
                                var arr= res.data
                                for(let i in arr){
                                    this.chartData.rows.push({
                                        '日期':Object.keys(arr[i])[0],
                                        '赛事消耗场次': Object.values(arr[i])[0]
                                    })
                                }
                                break;
                            case "sixth":
                                var arr= res.data
                                for(let i in arr){
                                    this.chartData.rows.push({
                                        '日期':Object.keys(arr[i])[0],
                                        '新用户次日留存率': Object.values(arr[i])[0]
                                    })
                                }
                                break;
                        }



                    }
                })
            },
            getAnalysisBarMap(){
                this.loading1=true
                let ReqType=''
                switch (this.activeName2) {
                    case "first":
                        ReqType=1
                        this.chartData2.columns=['日期', '充值金额','提现金额']
                        break;
                    case "second":
                        ReqType=2
                        this.chartData2.columns=['日期', '点券赠送数量','消耗点券数量','奖金发放金额']
                        break;
                }
                getAnalysisBarMap(this.time2[0],this.time2[1],ReqType).then(res=>{
                    console.log("数据分析柱状图",res)
                    this.loading1=false
                    if(res.code==0){

                        if(
                            this.activeName=='first'&&ReqType==1 ||
                            this.activeName=='second'&&ReqType==2
                        ){
                            this.chartData2.rows=[]
                        }else{
                            return
                        }

                        switch (this.activeName2) {
                            case "first":
                                var arr1= res.data[0].Charge
                                var arr2= res.data[0].Cashout
                                for(let i in arr1){
                                    this.chartData2.rows.push({
                                        '日期':Object.keys(arr1[i])[0],
                                        '充值金额': Object.values(arr1[i])[0],
                                        '提现金额': Object.values(arr2[i])[0],
                                    })
                                }
                                break;
                            case "second":
                                var arr1= res.data[0].CouponAward
                                var arr2= res.data[0].CouponUse
                                var arr3= res.data[0].TotalAward
                                for(let i in arr1){
                                    this.chartData2.rows.push({
                                        '日期':Object.keys(arr1[i])[0],
                                        '点券赠送数量': Object.values(arr1[i])[0],
                                        '消耗点券数量': Object.values(arr2[i])[0],
                                        '奖金发放金额': Object.values(arr3[i])[0],
                                    })
                                }
                                break;
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .con1{
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px;
        .l,.r{
            width: calc(50% - 10px);
            background: #fff;
            border-radius: 5px;
            padding: 20px;
            box-sizing: border-box;

        }
        .l{
            display: flex;
            flex-wrap: wrap;
            .l1{
                width:50%;
                box-sizing: border-box;
                position: relative;
                .name{
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 10px;
                }
                .num{
                    font-size: 20px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 15px;
                }
                .per{
                    display: flex;
                    align-items: center;
                    margin-bottom: 40px;
                    .n{
                        color: #909399;
                        font-size: 14px;
                        margin-right: 6px;
                    }
                    .v{
                        color: #333;
                        font-size: 14px;
                    }
                    .jt{
                        width:20px;
                        img{
                            width: 100%;
                        }
                    }
                }
                .logo{
                    position: absolute;
                    top: 0;
                    right:40px;
                    width:30px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .r{
            display: flex;
            flex-wrap: wrap;
            .r1{
                width:50%;
                box-sizing: border-box;
                display: flex;
                position: relative;

                .r2{
                    width: 50%;
                    box-sizing: border-box;
                    .name{
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .num{
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 15px;
                    }
                    .per{
                        display: flex;
                        align-items: center;
                        margin-bottom:0px;
                        .n{
                            color: #909399;
                            font-size: 14px;
                            margin-right: 6px;
                        }
                        .v{
                            color: #333;
                            font-size: 14px;
                        }
                        .jt{
                            width:20px;
                            img{
                                width: 100%;
                            }
                        }
                    }
                }
                .logo{
                    position: absolute;
                    top: 0;
                    right:40px;
                    width:30px;
                    img{
                        width: 100%;
                    }
                }
            }
            .rba{
                display: flex;
                position: relative;
                width:50%;
                /*border: 1px solid red;*/
                box-sizing: border-box;
                .rb1{
                    width:50%;
                    .name{
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    .num{
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 15px;
                    }
                }

            }
            .rbb{
                width: 50%;
                position: relative;
                /*border: 1px solid red;*/
                box-sizing: border-box;
                display: flex;
                .rb1{
                    width:50%;
                    .name{
                        font-size: 14px;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    .num{
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 15px;
                    }
                }
                .logo{
                    position: absolute;
                    top: 0;
                    right:40px;
                    width:30px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }

    .con2 {
        box-sizing: border-box;
        width: 100%;
        padding: 0 20px;
        .ct{
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            padding:20px;
            position: relative;
            padding-bottom: 0;
            .r{
                position: absolute;
                top: 10px;
                right: 20px;
            }
        }
        .cb{
            background: #fff;
            width: 100%;
            height: 400px;
        }
    }
    .con3{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        height: 600px;
        .ct{
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            padding:20px;
            position: relative;
            padding-bottom: 0;
            .r{
                position: absolute;
                top: 10px;
                right: 20px;
            }
        }
        .cb{
            background: #fff;
            width: 100%;
            height: 400px;
        }
    }
</style>
