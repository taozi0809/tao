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
                <el-table-column prop="CouponUse10" label="0-10点券" width="120"></el-table-column>
                <el-table-column prop="CouponUse20" label="11-20点券" width="120"></el-table-column>
                <el-table-column prop="CouponUse50" label="21-50点券" width="120"></el-table-column>
                <el-table-column prop="CouponUse200" label="51-200点券" width="120"></el-table-column>
                <el-table-column prop="CouponUse500" label="201-500点券" width="120"></el-table-column>
                <el-table-column prop="CouponUse500+" label="500点券以上" width="120"></el-table-column>
                <el-table-column prop="CouponUsePlayersCount" label="使用点券人数"></el-table-column>
            </el-table>

            <el-pagination
                    @current-change="getAnalysisCouponUse()"
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
    import {getAnalysisCouponUse} from "../../service/api/api";

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
            this.getAnalysisCouponUse()
        },
        methods:{
            change(){
                this.getAnalysisCouponUse()
            },
            getAnalysisCouponUse(){
                this.loading=true
                getAnalysisCouponUse(this.time[0],this.time[1],this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("用户使用点券分布分析界面",res)
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
