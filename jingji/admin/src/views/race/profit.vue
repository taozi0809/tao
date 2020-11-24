<template>
    <div class="profit">
        <div class="header">
            <div class="item">
                <div class="t">平台盈亏值：</div>
                <div class="v">
                    <el-select v-model="Profit" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in ProfitOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="t">赛事状态：</div>
                <div class="v">
                    <el-select v-model="Status" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in StatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="r">
               <div class="r1">
                   <div class="t">代理抽水：</div>
                   <div class="v">{{agent}}</div>
               </div>
               <div class="r1">
                   <div class="t">体总抽水：</div>
                   <div class="v">{{sports}}</div>
               </div>
                <div class="r1">
                    <div class="t">平台盈亏总额：</div>
                    <div class="v" :class="platformProfit>=0?'z':'f'">{{platformProfit}}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="MatchName" label="赛事昵称" width="200"></el-table-column>
                <el-table-column prop="MatchID" label="昵称ID" width="150"></el-table-column>
                <el-table-column prop="" label="开赛条件" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.StartType==1">满{{scope.row.LimitPlayer}}人开赛</span>
                        <span v-if="scope.row.StartType==2||scope.row.StartType==3">{{scope.row.LimitPlayer}}人</span>
                    </template>
                </el-table-column>
                <el-table-column prop="UseMatch" label="使用场数" width="120"></el-table-column>
                <el-table-column prop="SignFee" label="单人报名金额" width="120"></el-table-column>
                <el-table-column prop="TotalSignFee" label="报名总额" width="120"></el-table-column>
                <el-table-column prop="TotalAward" label="用户获得总额" width="120"></el-table-column>
                <el-table-column prop="AgentPercent" label="代理抽水金额" width="120"></el-table-column>
                <el-table-column prop="SportsPercent" label="体总抽水总额" width="120"></el-table-column>
                <el-table-column prop="PlatformProfit" label="平台盈亏额" width="120"></el-table-column>
                <el-table-column prop="ItemAward" label="赠送奖励" width="200"></el-table-column>
                <el-table-column prop="Status" label="赛事状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Status==0">上架中</span>
                        <span v-if="scope.row.Status==1">上架中</span>
                        <span v-if="scope.row.Status==2">上架中</span>
                        <span v-if="scope.row.Status==3">已下架</span>
                        <span v-if="scope.row.Status==4">已删除</span>
                        <span v-if="scope.row.Status==5">已结束</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getMatchProfit()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getMatchProfit} from "../../service/api/api";

    export default {
        data(){
            return{
                Profit:0,
                Status:null,
                per:10,
                page:1,
                ProfitOptions:[
                    {
                        value:0,
                        label:'全部'
                    },
                    {
                        value:1,
                        label:'正'
                    },
                    {
                        value:2,
                        label:'负'
                    },
                ],
                StatusOptions:[
                    {
                        value:null,
                        label:"全部"
                    },
                    {
                        value:0,
                        label:"上架"
                    },
                    {
                        value:3,
                        label:"下架"
                    },
                    {
                        value:5,
                        label:"结束"
                    },

                ],

                list:[],
                count:0,
                loading:false,
                agent:0,
                sports:0,
                platformProfit:0,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.getMatchProfit()
        },
        methods:{
            change(){
                this.getMatchProfit()
            },
            getMatchProfit(){
                this.loading=true
                getMatchProfit(this.Profit,this.Status,this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("盈亏列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                        this.agent=res.agent
                        this.sports=res.sports
                        this.platformProfit=res.platformProfit
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        .item{
            display: flex;
            align-items: center;
            margin-right: 30px;
        }
        .r{
            display: flex;
            align-items: center;
            position: absolute;
            right: 0px;
            .r1{
                display: flex;
                align-items: center;
                margin-right: 20px;
                .t{
                    font-size: 14px;
                    color: #909399;
                }
                .v{
                    font-size: 14px;
                }
                .z{
                    color: #409EFF;
                }
                .f{
                    color: #F56C6C;
                }
            }
        }
    }
</style>
