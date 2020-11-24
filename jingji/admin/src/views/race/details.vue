<template>
    <div class="details">
        <div v-if="$route.path=='/race/details'">
            <div class="header">
                <div class="l">
                    <div class="m">
                        <el-select v-model="MatchType" placeholder="请选择" @change="change">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
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
                <div class="s">
                    <div class="s1"><el-input placeholder="赛事ID" prefix-icon="el-icon-search" v-model="MatchID" @input="change"></el-input></div>
                    <div class="s1"><el-input placeholder="用户ID" prefix-icon="el-icon-search" v-model="AccountID" @input="change"></el-input></div>
                </div>

            </div>
            <div class="list">
                <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                          element-loading-text="加载中"
                          element-loading-background="rgba(255, 255, 255, .5)">
                    <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                    <el-table-column prop="MatchID" label="赛事ID,场数" width="250">
                        <template slot-scope="scope">
<!--                            <span v-if="scope.row.MatchSource==1">{{scope.row.MatchID.substring(0,12)}} {{ scope.row.MatchID.substring(12,20)}}</span>-->
                            <span v-if="scope.row.MatchSource==1">{{scope.row.SonMatchID.substring(0,12)}} {{ scope.row.SonMatchID.substring(12,20)}}</span>
                            <span v-if="scope.row.MatchSource!=1">{{scope.row.SonMatchID}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="赛事级别" width="120">
                        <template slot-scope="scope">
                            {{scope.row.MatchLevel | MatchLevelToStr}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="MatchName" label="赛事昵称" width="200"></el-table-column>
                    <el-table-column label="单人报名费" width="120">
                        <template slot-scope="scope">
                            {{scope.row.EnterFee}}点券
                        </template>
                    </el-table-column>
                    <el-table-column prop="RoundNum" label="对局副数" width="120"></el-table-column>
                    <el-table-column label="开赛时间" width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.CreateTime | timestampToTime1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.EndTime | timestampToTime1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开赛条件" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.StartType==1">满{{scope.row.LimitPlayer}}人开赛</span>
                            <span v-if="scope.row.StartType==2||scope.row.StartType==3">{{scope.row.LimitPlayer}}人</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="晋级条件">
                        <template slot-scope="scope">
                            {{scope.row.Eliminate.toString()}}
                        </template>
                    </el-table-column>

                    <!--                <el-table-column prop="MatchType" label="赛事类型" width="120"></el-table-column>-->
                    <!--                <el-table-column prop="Recommend" label="赛事说明" width="200"></el-table-column>-->

                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="$router.push({name:'race_detail',params:{id:scope.row.SonMatchID}})">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="matchList()"
                        :current-page.sync="page"
                        :page-size="per"
                        layout="total, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {getToday,getBeforeToday,timeToTimestamp} from "../../util/tools/startEndTime";
    import {matchList} from "../../service/api/api";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                MatchID:"",
                AccountID:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                options: [{
                    value: '奖金赛',
                    label: '奖金赛'
                }, {
                    value: '快速赛',
                    label: '快速赛'
                }, {
                    value: '海选赛',
                    label: '海选赛'
                }, {
                    value: '天梯赛',
                    label: '天梯赛'
                }],
                MatchType: '海选赛',
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.matchList()
        },
        methods:{
            change(){
                this.matchList()
            },
            matchList(){
                this.loading=true
                matchList(this.MatchID, parseInt(this.AccountID),this.MatchType,this.time[0],this.time[1],this.page,this.per,).then(res=>{
                    this.loading=false
                    console.log("赛事列表",res)
                    if(res.code==0){
                         this.list=res.list
                        this.count=res.total
                    }
                })
            }
        },
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
