<template>
    <div class="authority">
        <div class="header">
            <div class="l">
                <el-date-picker
                        @change="change"
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
                        <el-table :data="list0" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading1"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex0" width="50"></el-table-column>

                            <el-table-column prop="Name" label="姓名" width="120"></el-table-column>
                            <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                            <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                            <el-table-column prop="WeekMatchs" label="本周参赛次数" width="120"></el-table-column>
                            <el-table-column prop="MonthMatchs" label="本月参赛次数" width="120"></el-table-column>
                            <el-table-column prop="GroupCount" label="群总人数" width="100"></el-table-column>
                            <el-table-column label="提现金额" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="examineCashOutClick(scope.row)" v-if="scope.row.Status==1">审核</el-button>
                                    <el-button type="primary" size="small" @click="examineCashOutClick1(scope.row)" v-else>查看</el-button>
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

                            <el-table-column prop="Name" label="姓名" width="120"></el-table-column>
                            <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                            <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                            <el-table-column prop="WeekMatchs" label="本周参赛次数" width="120"></el-table-column>
                            <el-table-column prop="MonthMatchs" label="本月参赛次数" width="120"></el-table-column>
                            <el-table-column prop="GroupCount" label="群总人数" width="100"></el-table-column>
                            <el-table-column label="提现金额" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="examineCashOutClick(scope.row)" v-if="scope.row.Status==1">审核</el-button>
                                    <el-button type="primary" size="small" @click="examineCashOutClick1(scope.row)" v-else>查看</el-button>
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

                            <el-table-column prop="Name" label="姓名" width="120"></el-table-column>
                            <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                            <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                            <el-table-column prop="WeekMatchs" label="本周参赛次数" width="120"></el-table-column>
                            <el-table-column prop="MonthMatchs" label="本月参赛次数" width="120"></el-table-column>
                            <el-table-column prop="GroupCount" label="群总人数" width="100"></el-table-column>
                            <el-table-column label="提现金额" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="examineCashOutClick1(scope.row)">查看</el-button>
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

                            <el-table-column prop="Name" label="姓名" width="120"></el-table-column>
                            <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                            <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                            <el-table-column prop="WeekMatchs" label="本周参赛次数" width="120"></el-table-column>
                            <el-table-column prop="MonthMatchs" label="本月参赛次数" width="120"></el-table-column>
                            <el-table-column prop="GroupCount" label="群总人数" width="100"></el-table-column>
                            <el-table-column label="提现金额" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请时间" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.Status==1?'未审核':scope.row.Status==2?'已通过':scope.row.Status==3?'未通过':''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Dealer" label="审核人" width="120"></el-table-column>
                            <el-table-column label="审核时间">
                                <template slot-scope="scope">
                                    {{scope.row.DealTime | timestampToTime1}}
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="examineCashOutClick1(scope.row)">查看</el-button>
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
        <div class="dialog-box">
            <el-dialog
                    title="提现审核"
                    :visible.sync="isDialogManagement"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l">
                            <div class="t">提现金额：</div>
                            <div class="v">{{agent.Amount>=0?agent.Amount/100:agent.Amount}}</div>
                        </div>
                        <div class="c">
                            <div class="t">已提现金额：</div>
                            <div class="v"></div>
                        </div>
                        <div class="r">
                            <div class="t">已提现次数：</div>
                            <div class="v">{{agent.CashCount}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">账号ID：</div>
                            <div class="v">{{agent.AccountID}}</div>
                        </div>
                        <div class="c">
                            <div class="t">姓名：</div>
                            <div class="v">{{agent.Name}}</div>
                        </div>
                        <div class="r">
                            <div class="t">手机号：</div>
                            <div class="v">{{agent.Phone}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">推广类型：</div>
                            <div class="v">{{agent.AgentType}}</div>
                        </div>
                        <div class="c">
                            <div class="t">推广期限：</div>
                            <div class="v"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">游戏ID：</div>
                            <div class="v"></div>
                        </div>
                        <div class="c">
                            <div class="t">游戏昵称：</div>
                            <div class="v"></div>
                        </div>
                        <div class="r">
                            <div class="t">游戏绑定手机：</div>
                            <div class="v"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">收款银行：</div>
                            <div class="v">{{agent.BankName}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">银行卡号：</div>
                            <div class="v">{{agent.BankID}}</div>
                        </div>
                    </div>
                    <div class="item item2">
                        <el-checkbox v-model="GroupCount">微信群已满500人</el-checkbox>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="examineCashOutDialog(3,GroupCount,Reason,agent.OrderID)" :disabled="agent.Status!=1">拒 绝</el-button>
                    <el-button type="primary" @click="examineCashOut(2,GroupCount,Reason,agent.OrderID)" :disabled="agent.Status!=1">通 过</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="查看详情"
                    :visible.sync="isDialogManagement1"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l">
                            <div class="t">提现金额：</div>
                            <div class="v">{{agent.Amount>=0?agent.Amount/100:agent.Amount}}</div>
                        </div>
                        <div class="c">
                            <div class="t">已提现次数：</div>
                            <div class="v">{{agent.CashCount}}</div>
                        </div>
                        <div class="r">
                            <div class="t">手机号：</div>
                            <div class="v">{{agent.Phone}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">推广类型：</div>
                            <div class="v">{{agent.AgentType}}</div>
                        </div>
                        <div class="c">
                            <div class="t">申请时间：</div>
                            <div class="v">{{agent.CreateTime | timestampToTime1}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">审核人：</div>
                            <div class="v">{{agent.Dealer}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">收款银行：</div>
                            <div class="v">{{agent.BankName}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">银行卡号：</div>
                            <div class="v">{{agent.BankID}}</div>
                        </div>
                    </div>
                    <div class="item3" v-if="agent.Status==3">
                        <div class="jj">拒绝原因</div>
                        <el-input
                                type="textarea"
                                :rows="5"
                                resize="none"
                                placeholder="请输入拒绝原因"
                                v-model="agent.Reason">
                        </el-input>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" :disabled="true">拒 绝</el-button>
                    <el-button type="primary" :disabled="true">通 过</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="拒绝原因"
                    :visible.sync="isDialogManagement2"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose2">
                <div class="dialog-con">
                    <div class="item3">
                        <el-input
                                type="textarea"
                                :rows="5"
                                resize="none"
                                placeholder="请输入拒绝原因"
                                v-model="Reason">
                        </el-input>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="examineCashOut(3,GroupCount,Reason,agent.OrderID)">确 认</el-button>
                </div>
            </el-dialog>
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
                isDialogManagement:false,
                agent:{},
                Reason:"",
                GroupCount:false,

                isDialogManagement1:false,
                isDialogManagement2:false,
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
            change(){
                this.getCashOutList()
            },
            handleClose(){
                this.isDialogManagement=false
                this.isDialogManagement1=false
                this.GroupCount=false
                this.Reason=""
            },
            handleClose2(){
                this.isDialogManagement2=false
            },
            changeStatus(){
                this.getCashOutList()
            },
            examineCashOutClick(i){
                this.isDialogManagement=true
                this.agent=i
            },
            examineCashOutClick1(i){
                this.isDialogManagement1=true
                this.agent=i
            },
            examineCashOutDialog(){
                this.isDialogManagement2=true
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
            examineCashOut(Opt,GroupCount,Reason,OrderID){
                examineCashOut(Opt,GroupCount?500:50,Reason,OrderID).then(res=>{
                    console.log("审核操作",res)
                    if(res.code==0){
                        this.getCashOutList()
                        Message.success("操作成功")
                        this.handleClose()
                        this.handleClose2()
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
