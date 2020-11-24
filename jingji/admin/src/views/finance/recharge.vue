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
                <el-table-column prop="chargePlayers" label="充值人数" width="120"></el-table-column>
                <el-table-column prop="chargeCounts" label="充值次数" width="120"></el-table-column>
                <el-table-column prop="chargeAmount" label="充值金额" width="120"></el-table-column>
                <el-table-column prop="chargeYestoday" label="充值金额昨日环比" width="140"></el-table-column>
                <el-table-column prop="chargeLastWeek" label="充值金额上周环比" width="140"></el-table-column>
                <el-table-column prop="chargeLastMonth" label="充值金额上月环比" width="140"></el-table-column>
                <el-table-column prop="chargeTypePercent" label="商品类型占比 ( 前三 )"></el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getChargeDetail()"
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
    import {getChargeDetail} from "../../service/api/api";

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
            this.getChargeDetail()
        },
        methods:{
            change(){
                this.getChargeDetail()
            },
            getChargeDetail(){
                getChargeDetail(this.time[0],this.time[1],this.page,this.per).then(res=>{
                    console.log("充值明细",res)
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
