<template>
    <div class="authority">
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
                        :picker-options="pickerOptions">
                </el-date-picker>
            </div>
        </div>
        <div class="list">
            <el-tabs v-model="Status" type="border-card" @tab-click="changeStatus">
                <el-tab-pane label="全部" name="0">
                    <div class="list0">
                        <el-table :data="list0" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading0"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex0" width="50"></el-table-column>

                            <el-table-column prop="Amount" label="申请提现金额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="提现前余额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Cash>=0?scope.row.Cash/100:scope.row.Cash}}
                                </template>
                            </el-table-column>

                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ApplyWay" label="申请路径" width="100"></el-table-column>
                            <el-table-column label="申请状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间" width="150px">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Amount" label="审核结果">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.Status==2">已通过</span>
                                    <span v-if="scope.row.Status==3">{{scope.row.Reason}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @current-change="getCashOutList()"
                            :current-page.sync="page0"
                            :page-size="per"
                            layout="total, prev, pager, next, jumper"
                            :total="count0">
                    </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未审核" name="1">
                    <div class="list1">
                        <el-table :data="list1" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading1"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex1" width="50"></el-table-column>

                            <el-table-column prop="Amount" label="申请提现金额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="提现前余额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Cash>=0?scope.row.Cash/100:scope.row.Cash}}
                                </template>
                            </el-table-column>

                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ApplyWay" label="申请路径" width="100"></el-table-column>
                            <el-table-column label="申请状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间" width="150px">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Amount" label="审核结果">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.Status==2">已通过</span>
                                    <span v-if="scope.row.Status==3">{{scope.row.Reason}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="getCashOutList()"
                                :current-page.sync="page1"
                                :page-size="per"
                                layout="total, prev, pager, next, jumper"
                                :total="count1">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已通过" name="2">
                    <div class="list2">
                        <el-table :data="list2" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading2"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex2" width="50"></el-table-column>

                            <el-table-column prop="Amount" label="申请提现金额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="提现前余额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Cash>=0?scope.row.Cash/100:scope.row.Cash}}
                                </template>
                            </el-table-column>

                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ApplyWay" label="申请路径" width="100"></el-table-column>
                            <el-table-column label="申请状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间" width="150px">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Amount" label="审核结果">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.Status==2">已通过</span>
                                    <span v-if="scope.row.Status==3">{{scope.row.Reason}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="getCashOutList()"
                                :current-page.sync="page2"
                                :page-size="per"
                                layout="total, prev, pager, next, jumper"
                                :total="count2">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未通过" name="3">
                    <div class="list3">
                        <el-table :data="list3" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading3"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex3" width="50"></el-table-column>

                            <el-table-column prop="Amount" label="申请提现金额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="提现前余额" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Cash>=0?scope.row.Cash/100:scope.row.Cash}}
                                </template>
                            </el-table-column>

                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ApplyWay" label="申请路径" width="100"></el-table-column>
                            <el-table-column label="申请状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间" width="150px">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Amount" label="审核结果">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.Status==2">已通过</span>
                                    <span v-if="scope.row.Status==3">{{scope.row.Reason}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="getCashOutList()"
                                :current-page.sync="page3"
                                :page-size="per"
                                layout="total, prev, pager, next, jumper"
                                :total="count3">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>


<script>
    import {getCashOutList,examineCashOut} from "../../service/api/api";
    import {formateDate} from "../../util/tools/date";
    import {Message} from "element-ui"

    export default {
        data(){
            return{
                Status:0,
                time:"",
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                list0:[],
                list1:[],
                list2:[],
                list3:[],
                count0:0,
                count1:0,
                count2:0,
                count3:0,
                page0:1,
                page1:1,
                page2:1,
                page3:1,
                per:10,
                loading0:false,
                loading1:false,
                loading2:false,
                loading3:false,

            }
        },
        computed:{
            getInIndex0(){
                return (this.page0 - 1) * this.per +1
            },
            getInIndex1(){
                return (this.page1 - 1) * this.per +1
            },
            getInIndex2(){
                return (this.page2 - 1) * this.per +1
            },
            getInIndex3(){
                return (this.page3 - 1) * this.per +1
            },
        },
        created() {
            let end = new Date();
            let start = new Date();
            start=start.getTime() - 3600 * 1000 * 24 * 30
            end=end.getTime()
            this.time=[start, end]

            this.getCashOutList()
        },

        methods:{
            changeStatus(){
                this.getCashOutList()
            },
            getCashOutList(){
                let pageName = 'page'+this.Status
                getCashOutList(parseInt(this.Status),this[pageName],this.per,formateDate(new Date(this.time[0]),"yyyy-MM-dd"),formateDate(new Date(this.time[1]),"yyyy-MM-dd")).then(res=>{
                    console.log("提现明细列表",res)
                    if(res.code==0){
                        let listName = 'list'+this.Status
                        this[listName] = res.list
                        let countName = "count"+this.Status
                        this[countName] = res.total
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .l{
            display: flex;
            align-items: center;
            .l1{
                width: 250px;
                margin-right: 20px;
            }
        }
    }
    .list{
        box-sizing: border-box;
        width: 100%;
        padding: 0 10px;
        margin-top: 10px;
        .list0,.list1,.list2,.list3{
            height: 750px;
        }
    }
    .dialog-box{
        .dialog-con{

            .item{
                width: 100%;
                display: flex;
                align-items: center;
                height: 60px;
                .l,.c,.r{
                    display: flex;
                    align-items: center;
                    width:33%;
                    .t{
                        flex-shrink: 0;
                    }
                    .v{
                        flex-shrink: 0;
                        width: 180px;
                    }
                }
            }
            .item2{
                .l,.r{
                    display: flex;
                    align-items: center;
                    height: 40px;
                }
            }
            .item-title{
                text-align: center;
                height: 80px;
                line-height: 80px;
                font-size: 20px;
            }
            .item3{
                width: 100%;
                .jj{
                    font-size: 20px;
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                }
            }
        }
        .f{
            margin-top:50px;
            display: flex;
            align-items: center;
            justify-content:space-around;
        }
    }
</style>
