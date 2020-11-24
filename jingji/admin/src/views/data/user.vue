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
            <div class="r">
                <div class="r1">
                    <el-input placeholder="代理ID筛选" prefix-icon="el-icon-search" v-model.number="AgentID" @input="change"></el-input>
                </div>
                <div class="r2">
                    <div class="t">实时在线人数：</div>
                    <div class="v">{{online}}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>

                <el-table-column prop="Date" label="日期" width="180"></el-table-column>
                <el-table-column prop="TotalPlayers" label="累计用户" width="120"></el-table-column>
                <el-table-column prop="RealPlayers" label="实名用户总数" width="120"></el-table-column>
                <el-table-column prop="LoginPlayers" label="登录用户数" width="120"></el-table-column>
                <el-table-column prop="ActivePlayers" label="活跃用户" width="120"></el-table-column>
                <el-table-column prop="ARPU" label="活跃ARPU" width="120"></el-table-column>
                <el-table-column prop="TotalCharge" label="充值金额" width="120"></el-table-column>
                <el-table-column prop="ChargeCount" label="充值人数" width="120"></el-table-column>
                <el-table-column prop="ARPPU" label="充值ARPPU" width="120"></el-table-column>
                <el-table-column prop="MatchCount" label="参赛用户" width="120"></el-table-column>
                <el-table-column prop="MaxPlayers" label="最高在线人数" width="120"></el-table-column>
            </el-table>

            <el-pagination
                    @current-change="getAnalysisPlayers()"
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
    import {getAnalysisPlayers} from "../../service/api/api";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                list:[],
                page:1,
                per:10,
                count:0,
                AgentID:null,
                loading:false,
                online:0,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getAnalysisPlayers()
        },
        methods:{
            change(){
                this.getAnalysisPlayers()
            },
            getAnalysisPlayers(){
                this.loading=true
                getAnalysisPlayers(this.time[0],this.time[1],this.page,this.per,parseInt(this.AgentID)).then(res=>{
                    this.loading=false
                    console.log("用户分析",res)
                    if(res.code==0){
                        this.list=res.data
                        this.count=res.total
                        this.online=res.online
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
            width: 480px;
            display: flex;
            align-items: center;
            .r1{
                width:300px;
                margin-right: 20px;
            }
            .r2{
                display: flex;
                align-content: center;
                flex-shrink: 0;
                justify-content: flex-end;
                box-sizing: border-box;
                width: 150px;
                .t{
                    font-size: 14px;
                    color: #909399;
                }
                .v{
                    font-size: 14px;
                }
            }
        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 20px;
    }
</style>
