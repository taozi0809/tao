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
                <el-table-column prop="CouponUse10" label="0-10奖金" width="120"></el-table-column>
                <el-table-column prop="CouponUse20" label="11-20奖金" width="120"></el-table-column>
                <el-table-column prop="CouponUse50" label="21-50奖金" width="120"></el-table-column>
                <el-table-column prop="CouponUse200" label="51-200奖金" width="120"></el-table-column>
                <el-table-column prop="CouponUse500" label="201-500奖金" width="120"></el-table-column>
                <el-table-column prop="CouponUse500+" label="500奖金以上" width="120"></el-table-column>
                <el-table-column prop="CouponUsePlayersCount" label="获得奖金人数"></el-table-column>
            </el-table>

            <el-pagination
                    @current-change="getAnalysisAward()"
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
    import {getAnalysisAward} from "../../service/api/api";

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
            this.getAnalysisAward()
        },
        methods:{
            change(){
                this.getAnalysisAward()
            },
            getAnalysisAward(){
                this.loading=true
                getAnalysisAward(this.time[0],this.time[1],this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("用户赛事奖金获得分布分析界面",res)
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
