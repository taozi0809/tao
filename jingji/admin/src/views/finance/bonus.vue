<template>
    <div class="recharge">
        <div class="header">
            <div class="l">
                <div class="m">
                    <el-input placeholder="赛事ID" prefix-icon="el-icon-search" v-model="MatchID" @input="change"></el-input>
                </div>
                <div class="m">
                    <el-input placeholder="赛事昵称" prefix-icon="el-icon-search" v-model="MatchName" @input="change"></el-input>
                </div>
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
                <el-table-column prop="matchID" label="赛事昵称ID" width="180"></el-table-column>
                <el-table-column prop="matchName" label="赛事昵称" width="180"></el-table-column>
                <el-table-column prop="allSign" label="报名总人数" width="120"></el-table-column>
                <el-table-column prop="allSignFee" label="报名消耗点券" width="120"></el-table-column>
                <el-table-column prop="playerAward" label="用户获得奖励"></el-table-column>


            </el-table>
            <el-pagination
                    @current-change="getMatchAwardPreview()"
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
    import {getMatchAwardPreview,} from "../../service/api/api";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                list:[],
                page:1,
                per:10,
                count:0,
                MatchID:"",
                MatchName:"",

            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getMatchAwardPreview()

        },
        methods:{
            change(){
                this.getMatchAwardPreview()
            },

            getMatchAwardPreview(){
                getMatchAwardPreview(this.time[0],this.time[1],this.page,this.per,this.MatchID,this.MatchName).then(res=>{
                    console.log("赛事奖金总览界面",res)
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
