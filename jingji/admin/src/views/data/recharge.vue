<template>
    <div class="match">
        <div class="header">
            <div class="l">
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
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>

                <el-table-column prop="Date" label="日期" width="180"></el-table-column>
                <el-table-column prop="Money5" label="5元" width="120"></el-table-column>
                <el-table-column prop="Money10" label="10元" width="120"></el-table-column>
                <el-table-column prop="Money20" label="20元" width="120"></el-table-column>
                <el-table-column prop="Money50" label="50元" width="120"></el-table-column>
                <el-table-column prop="Money100" label="100元" width="120"></el-table-column>
                <el-table-column prop="AllOrderCount" label="总订单数" width="120"></el-table-column>
                <el-table-column prop="TotalCharge" label="总额"></el-table-column>
            </el-table>

            <el-pagination
                    @current-change="getAnalysisCharge()"
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
    import {getAnalysisCharge} from "../../service/api/api";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                list:[],
                page:1,
                per:10,
                count:0,
                loading:false,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getAnalysisCharge()
        },
        methods:{
            change(){
                this.getAnalysisCharge()
            },
            getAnalysisCharge(){
                this.loading=true
                getAnalysisCharge(this.time[0],this.time[1],this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("充值额度分析",res)
                    if(res.code==0){
                        this.list=res.data
                        this.count=res.total
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .l{
            display: flex;
            align-items: center;
            .l1{
                margin-left: 20px;
            }
        }
        .r{
            width: 300px;
        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 20px;
    }
</style>
