<template>
    <div class="recharge">
        <div class="header">
            <div class="l">
                <div class="m">
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

        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700">
                <el-table-column type="index" :index="getInIndex" width="60" label="序号"></el-table-column>
                <el-table-column prop="date" label="日期" width="150"></el-table-column>
                <el-table-column prop="cashoutPlayers" label="提现人数" width="120"></el-table-column>
                <el-table-column prop="cashoutAmount" label="提现金额" width="120"></el-table-column>
                <el-table-column prop="cashoutSuccessPlayers" label="提现成功人数" width="120"></el-table-column>
                <el-table-column prop="cashoutSuccessAmount" label="提现成功金额" width="120"></el-table-column>
                <el-table-column prop="cashoutYestoday" label="提现金额昨日环比" width="140"></el-table-column>
                <el-table-column prop="cashoutLastWeek" label="提现金额上周环比" width="140"></el-table-column>
                <el-table-column prop="cashoutLastMonth" label="提现金额上月环比"></el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getCashoutDetail()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>


    import {getBeforeToday, getToday} from "../../util/tools/startEndTime";
    import {getCashoutDetail} from "../../service/api/api";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                list:[],
                page:1,
                per:10,
                count:0,

            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getCashoutDetail()
        },
        methods:{
            change(){
                this.getCashoutDetail()
            },
            getCashoutDetail(){
                getCashoutDetail(this.time[0],this.time[1],this.page,this.per).then(res=>{
                    console.log("提现明细界面",res)
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
    @import "../../assets/css/header";

    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .s{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 600px !important;
        .s1{
            width: 290px;
        }
    }
</style>
