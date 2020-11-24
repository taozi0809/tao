<template>
    <div class="proxy">
        <div class="header">
            <div class="l">
                <div class="l1"><el-input placeholder="推广姓名" prefix-icon="el-icon-search" v-model="Name" @input="searchExamineAgent"></el-input></div>
                <div class="l1"><el-input placeholder="联系方式" prefix-icon="el-icon-search" v-model="Phone" @input="searchExamineAgent" maxLength='11'></el-input></div>
            </div>
            <div class="s">

            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="AccountID" label="创建人ID" width="120"></el-table-column>
                <el-table-column prop="Name" label="创建人姓名" width="150"></el-table-column>
                <el-table-column prop="ApplyName" label="姓名" width="150"></el-table-column>
                <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                <el-table-column prop="ApplySrc" label="申请来源" width="120"></el-table-column>
                <el-table-column label="申请类型" width="120">
                    <template slot-scope="scope">
                       {{scope.row.ApplyType}}
                    </template>
                </el-table-column>
                <el-table-column label="申请状态" width="120">
                    <template slot-scope="scope">
                        <span :class="scope.row.ApplyStatus==1?'c1'
                        :scope.row.ApplyStatus==2?'c2'
                        :scope.row.ApplyStatus==3?'c3'
                        :scope.row.ApplyStatus==4?'c4':''">{{scope.row.ApplyStatus | statusToStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="a6" label="申请时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.ApplyTime |timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="a7" label="处理时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.DealTime |timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Dealer" label="处理人"></el-table-column>

                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="auditStatusClick(scope.row)" v-if="scope.row.ApplyStatus==2">操作</el-button>
                        <el-button type="primary" size="small" @click="auditStatusClick(scope.row)" v-else>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getExamineAgents()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="推广详情"
                    :visible.sync="isDialogAudit"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l">
                            <div class="t">姓名：</div>
                            <div class="v">{{agent.ApplyName}}</div>
                        </div>
                        <div class="r">
                            <div class="t">联系方式：</div>
                            <div class="v">{{agent.Phone}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">申请来源：</div>
                            <div class="v">{{agent.ApplySrc}}</div>
                        </div>
                        <div class="r">
                            <div class="t">申请时间：</div>
                            <div class="v">{{agent.ApplyTime | timestampToTime1}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">申请类型：</div>
                            <div class="v">{{agent.ApplyType}}</div>
                        </div>
                        <div class="r">
                            <div class="t">推荐推广：</div>
                            <div class="v">{{agent.AccountID}}</div>
                        </div>
                    </div>
                    <div class="item" v-if="agent.ApplyStatus!=2">
                        <div class="l">
                            <div class="t">审核人：</div>
                            <div class="v">{{agent.Dealer}}</div>
                        </div>
                        <div class="r">

                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">微信号：</div>
                            <div class="v">{{agent.WechatNum}}</div>
                        </div>
                        <div class="r">
                            <div class="t">地区：</div>
                            <div class="v">{{agent.Location}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l" style="display: flex;align-items: center;">
                            <div class="t"><el-checkbox v-model="AgentFeeOpt" :disabled="agent.ApplyStatus!=2">无需授权费（仅限招商中心创建的推广使用一次）</el-checkbox></div>
                        </div>

                    </div>

                    <div class="item5" v-if="agent.ApplyStatus==3">
                        <div class="jj">拒绝原因</div>
                        <el-input
                                type="textarea"
                                :rows="5"
                                resize="none"
                                placeholder="请输入拒绝原因"
                                v-model="agent.DenyReason">
                        </el-input>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="examineAgentClick(agent.OrderID,agent.ApplyAccountID,3,DenyReason)" :disabled="agent.ApplyStatus!=2">拒 绝</el-button>
                    <el-button type="primary" @click="examineAgentClick(agent.OrderID,agent.ApplyAccountID,1,DenyReason,AgentFeeOpt)" :disabled="agent.ApplyStatus!=2">通 过</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="拒绝原因"
                    :visible.sync="isDialogAudit2"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <el-input
                            type="textarea"
                            :rows="5"
                            resize="none"
                            placeholder="请输入拒绝原因"
                            v-model="DenyReason">
                    </el-input>
                </div>
                <div class="f">
                    <el-button type="primary" @click="examineAgent(agent.OrderID,agent.ApplyAccountID,3,DenyReason)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui"
    import {getExamineAgents, examineAgent, searchExamineAgent, searchOneAgent} from "../../service/api/api";

    export default {
        data(){
            return{
                Name:"",
                Phone:"",
                list:[],
                count:0,
                loading:false,
                page:1,
                per:10,
                isDialogAudit:false,
                isDialogAudit2:false,
                agent:{},
                DenyReason:"",
                AgentFeeOpt:false,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.getExamineAgents()
        },
        methods:{
            handleClose(){
                this.isDialogAudit=false
                this.isDialogAudit2=false
                this.AgentFeeOpt=false
            },
            auditStatusClick(i){
                this.agent=i
                this.isDialogAudit=true
            },
            examineAgentClick(OrderID,AccountID,Opt,DenyReason,AgentFeeOpt){
                if(Opt==3){
                    this.isDialogAudit2=true
                }else{
                    this.examineAgent(OrderID,AccountID,Opt,DenyReason,AgentFeeOpt)
                }
            },
            getExamineAgents(){
                this.loading=true
                getExamineAgents(this.page,this.per).then(res=>{
                    console.log("推广审核列表",res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.agent
                        this.count=res.total
                    }
                })
            },
            examineAgent(OrderID,AccountID,Opt,DenyReason,AgentFeeOpt){
                examineAgent(OrderID,AccountID,Opt,DenyReason,AgentFeeOpt?1:0).then(res=>{
                    console.log("审核推广",res)
                    if(res.code==0){
                        this.getExamineAgents()
                        Message.success("操作成功")
                        this.handleClose()
                    }
                })
            },
            searchExamineAgent(){
                if(!!this.Name||!!this.Phone){
                    searchExamineAgent(this.Name,this.Phone).then(res=>{
                        console.log("搜索推广",res)
                        if(res.code==0){
                            if(!!res.agent.AccountID){
                                this.list=[]
                                this.list.push(res.agent)
                                this.count=1
                            }else{
                                this.list=[]
                                this.count=0
                            }
                        }
                    })
                }else{
                    this.getExamineAgents()
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 20px;
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
        padding: 0 20px;
        margin-top: 20px;
        .c1{
            color: #409EFF;
        }
        .c2{
            color: #E6A23C;
        }
        .c3{
            color:#F56C6C ;
        }
        .c4{
            color: #909399;
        }
    }
    .dialog-box{
        .dialog-con{
            .item{
                width: 100%;
                display: flex;
                align-items: center;
                height: 60px;
                .l,.r{
                    display: flex;
                    align-items: center;
                    width: 300px;
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
            .item3{
                .l{
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
            .item5{
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
