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
                <div class="l1"><el-button type="primary" @click="handleClick1">参赛时长</el-button></div>
                <div class="l1"><el-button type="primary" @click="handleClick2">参赛场数</el-button></div>
            </div>
            <div class="r">
                <div class="r1">
                    <el-input placeholder="代理ID筛选" prefix-icon="el-icon-search" v-model.number="AgentID" @input="change"></el-input>
                </div>
                <div class="r2">
                    <div class="t">实时参赛人数：</div>
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
                <el-table-column prop="MatchPlayerCount" label="参赛用户" width="120"></el-table-column>
                <el-table-column prop="MatchUse" label="赛事消耗场次" width="120"></el-table-column>
                <el-table-column prop="AnverageMatchCount" label="人均参赛场次" width="120"></el-table-column>
                <el-table-column prop="AnverageMatchTime" label="人均参赛时长" width="120"></el-table-column>
                <el-table-column prop="AllSignFee" label="赛事点券消耗" width="120"></el-table-column>
                <el-table-column prop="AllAward" label="奖金发放金额" width="120"></el-table-column>
                <el-table-column prop="MaxSameTimePlayers" label="最高同时参赛人数"></el-table-column>
            </el-table>

            <el-pagination
                    @current-change="getAnalysisMatch()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="参赛时长"
                    center
                    :before-close="handleClose1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="900px">
                <div class="dialog-con">
                    <el-table :data="listDialog" style="width: 100%;margin-bottom: 10px;" border height="560">

                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="date" label="日期" width="120"></el-table-column>
                        <el-table-column prop="value.0" label="1-5分钟" width="100"></el-table-column>
                        <el-table-column prop="value.1" label="5-10分钟" width="100"></el-table-column>
                        <el-table-column prop="value.2" label="10-15分钟" width="100"></el-table-column>
                        <el-table-column prop="value.3" label="15-30分钟" width="100"></el-table-column>
                        <el-table-column prop="value.4" label="30-60分钟" width="100"></el-table-column>
                        <el-table-column prop="value.5" label="60-120分钟" width="100"></el-table-column>
                        <el-table-column prop="value.6" label="120-240分钟" width="120"></el-table-column>
                        <el-table-column prop="value.7" label="240分钟以上" width="120"></el-table-column>
                        <el-table-column prop="num" label="参赛人数" width="100"></el-table-column>

                    </el-table>
                </div>
            </el-dialog>

        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="参赛场数"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="900px">
                <div class="dialog-con">
                    <el-table :data="listDialog" style="width: 100%;margin-bottom: 10px;" border height="560">
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="date" label="日期" width="120"></el-table-column>
                        <el-table-column prop="value.0" label="1-5场" width="100"></el-table-column>
                        <el-table-column prop="value.1" label="6-10场" width="100"></el-table-column>
                        <el-table-column prop="value.2" label="11-15场" width="100"></el-table-column>
                        <el-table-column prop="value.3" label="16-20场" width="100"></el-table-column>
                        <el-table-column prop="value.4" label="21-30场" width="100"></el-table-column>
                        <el-table-column prop="value.5" label="31-50场" width="100"></el-table-column>
                        <el-table-column prop="value.6" label="50场以上" width="120"></el-table-column>
                        <el-table-column prop="num" label="参赛人数" width="100"></el-table-column>

                    </el-table>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import {getBeforeToday, getToday} from "../../util/tools/startEndTime";
    import {getAnalysisMatch} from "../../service/api/api";

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

                isDialog1:false,
                isDialog2:false,
                listDialog:[],
                online:0,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getAnalysisMatch()
        },
        methods:{
            change(){
                this.getAnalysisMatch()
            },
            handleClick1(){
                let arr=[]
                for(let i in this.list){
                    arr.push({
                        value:this.list[i].MatchTimeSection,
                        date:this.list[i].Date,
                        num:this.list[i].MatchPlayerCount
                    })
                }
                this.listDialog=arr
                this.isDialog1=true
            },
            handleClick2(){
                let arr=[]
                for(let i in this.list){
                    arr.push({
                        value:this.list[i].MatchCountSection,
                        date:this.list[i].Date,
                        num:this.list[i].MatchPlayerCount
                    })
                }
                this.listDialog=arr
                this.isDialog2=true
            },
            handleClose1(){
                this.isDialog1=false
            },
            handleClose2(){
                this.isDialog2=false
            },
            getAnalysisMatch(){
                this.loading=true
                getAnalysisMatch(this.time[0],this.time[1],this.page,this.per,parseInt(this.AgentID)).then(res=>{
                    this.loading=false
                    console.log("赛事分析",res)
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
