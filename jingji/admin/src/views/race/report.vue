<template>
    <div class="report">
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
        <div class="all">
            <div class="item item1">
                <div class="data">{{all.AllSignPlayer>0?all.AllSignPlayer:0}}</div>
                <div class="name">总参赛人数</div>
            </div>
            <div class="item item2">
                <div class="data">{{all.AllSignFee>0?all.AllSignFee:0}}</div>
                <div class="name">总报名金额</div>
            </div>
            <div class="item item3">
                <div class="data">{{all.AllAward>0?all.AllAward:0}}</div>
                <div class="name">总奖励金额</div>
            </div>
            <div class="item item4">
                <div class="data">{{all.AllLast>0?all.AllLast:0}}</div>
                <div class="name">总剩余金额</div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="600" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column label="日期" width="150">
                    <template slot-scope="scope">
                        {{scope.row.RecordTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="allSign" label="参赛人数" width="120"></el-table-column>
                <el-table-column label="报名费用" width="120">
                    <template slot-scope="scope">
                        ¥ {{scope.row.allSignFee}}
                    </template>
                </el-table-column>
                <el-table-column prop="allSignFee" label="报名点卷" width="120"></el-table-column>
                <el-table-column prop="awardNum" label="奖励人数" width="120"></el-table-column>
                <el-table-column label="奖励金额" width="120">
                    <template slot-scope="scope">
                        ¥ {{scope.row.allMoney}}
                    </template>
                </el-table-column>
<!--                <el-table-column prop="allCoupon" label="奖励点卷" width="120"></el-table-column>-->
                <el-table-column prop="awardList" label="奖励道具" width="150"></el-table-column>
<!--                <el-table-column prop="awardNum" label="奖励数量" width="150"></el-table-column>-->
                <el-table-column label="剩余金额">
                    <template slot-scope="scope">
                        ¥ {{scope.row.lastMoney}}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="matchReport($route.params.id)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {getToday,getBeforeToday,timeToTimestamp} from "../../util/tools/startEndTime";
    import {matchReport} from "../../service/api/api";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                condition:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                all:"",
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.matchReport(this.$route.params.id)
        },
        methods:{
            change(){
                this.matchReport(this.$route.params.id)
            },
            matchReport(MatchID){
                this.loading=true
                matchReport(MatchID, this.time[0],this.time[1],this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("赛事报表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                        this.all=res.all
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";
    .all{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap:wrap;
        align-items: center;
        padding: 0 10px;
        .item{
            width: 230px;
            height: 130px;
            position: relative;
            margin-right: 20px;
            overflow: hidden;
            border-radius:5px;
            margin-bottom: 10px;
            .data{
                font-size: 40px;
                color: #fff;
                position: relative;
                display: block;
                box-sizing: border-box;
                padding: 0 10px;
                height: 80px;
                line-height: 80px;
            }
            .name{
                color: #fff;
                font-size: 18px;
                position: relative;
                box-sizing: border-box;
                padding: 0 10px;
            }
        }
        .item1{
            background: url("../../assets/images/home/1.png");
            background-size: 100% 100%;
        }
        .item2{
            background: url("../../assets/images/home/2.png");
            background-size: 100% 100%;
        }
        .item3{
            background: url("../../assets/images/home/3.png");
            background-size: 100% 100%;
        }
        .item4{
            background: url("../../assets/images/home/4.png");
            background-size: 100% 100%;
        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
</style>
