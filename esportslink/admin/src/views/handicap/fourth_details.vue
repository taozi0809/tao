<template>
    <div class="quiz-details">
        <div class="back"><el-page-header @back="goBack" content="竞猜详情"></el-page-header></div>
        <div class="top">
            <el-table :data="list" border style="width: 100%">
                <el-table-column label="状态/开始时间" width="120">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==1">正在直播</div>
                        <div v-if="scope.row.status!=1">{{scope.row.startTime | timestampToTime}}</div>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="比赛" width="180"></el-table-column>
                <el-table-column property="bo" label="赛制" width="60"></el-table-column>
                <el-table-column label="队伍及比分状态" width="300">
                    <template slot-scope="scope">
                        <div class="details">
                            <div class="l">
                                <span class="logo-img"><img :src="scope.row.teamaLogo" alt=""></span>
                                <div class="name">{{scope.row.teamaName}}</div>
                            </div>
                            <div class="c">
                                <div class="status" v-if="scope.row.status==0">VS</div>
                                <div class="status" v-if="scope.row.status==1 ||scope.row.status==2">{{scope.row.teamaScore}}-{{scope.row.teambScore}}</div>
                            </div>
                            <div class="r">
                                <span class="logo-img"><img :src="scope.row.teambLogo" alt=""></span>
                                <div class="name">{{scope.row.teambName}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="rollingStatDtoModel.rollingTotal" label="总盘" width="80"></el-table-column>
                <el-table-column property="rollingStatDtoModel.openTotal" label="开盘" width="80"></el-table-column>
                <el-table-column property="rollingStatDtoModel.quizMoneyTotal" label="总金额" width="80"></el-table-column>
                <el-table-column property="rollingStatDtoModel.quizNum" label="总单数"></el-table-column>
<!--                <el-table-column fixed="right" label="操作" width="100">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="text" size="small" @click="batchSeal(scope.row)">手动封盘</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
        </div>
        <div class="quiz-list">
            <el-table :data="quizList" border style="width: 100%;" v-loading="loading"
                      element-loading-text="加载中" element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(255, 255, 255, 0.6)" height="600">
                <el-table-column type="index" :index="getIndex" width="60"></el-table-column>

                <el-table-column property="betId" label="盘口编号" width="100"></el-table-column>
                <el-table-column property="boardNum" label="盘口归属" width="100">
                    <template slot-scope="scope">
                        {{scope.row.boardNum | boardNumToName}}
                    </template>
                </el-table-column>
                <el-table-column property="title" label="盘口名称" width="180"></el-table-column>
                <el-table-column property="name" label="盘口/赔率" width="440">
                    <template slot-scope="scope">
                        <div class="details">
                            <div class="l">
                                <div class="name">{{scope.row.teamaName}}</div>
                                <div class="odds">@{{scope.row.teamaOdds}}</div>
                            </div>
                            <div class="c">
                                VS
                            </div>
                            <div class="r">
                                <div class="name">{{scope.row.teambName}}</div>
                                <div class="odds">@{{scope.row.teambOdds}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>


                <el-table-column property="name" label="是否正常" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.operateType!=2&&scope.row.operateType!=3">{{scope.row.operateType | operateTypeToName2}}</span>
                        <span v-if="scope.row.operateType==2" style="color: #F56C6C;">{{scope.row.operateType | operateTypeToName2}}</span>
                        <span v-if="scope.row.operateType==3" style="color: #E6A23C;">{{scope.row.operateType | operateTypeToName2}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="状态" width="120">
                    <template slot-scope="scope">
                        {{scope.row.quizType | quizTypeToName}}
                    </template>
                </el-table-column>
                <el-table-column property="name" label="是否手动判定">
                    <template slot-scope="scope">
                        <div style="color: #E6A23C;" v-if="scope.row.isDetermine!=0">否</div>
                        <div style="color: #67C23A;" v-if="scope.row.isDetermine==0">是</div>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogVisible=true,dialogVisibleData=scope.row">手动判定</el-button>
                        <el-button type="text" size="small" @click="isRecordList=true,recordListData=scope.row,recordList('0')">注单统计</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="rollingList(id,boardNum,pageNum,pageSize)"
                    :current-page.sync="pageNum"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>

            <el-dialog
                    :modal-append-to-body='false'
                    title="手动判定胜负"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <div class="manual-result">
                    <div class="name">{{dialogVisibleData.boardNum | boardNumToName}}</div>
                    <div class="name">{{dialogVisibleData.title}}</div>
                    <div class="btn" style="display: flex;align-items: center;justify-content: space-between;">
                        <el-button class="btn" @click="dialogVisibleResult=0" style="width:45%;">左选项</el-button>
                        <el-button class="btn" @click="dialogVisibleResult=1" style="width:45%;">右选项</el-button>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="rollingUpdate">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                  </span>
            </el-dialog>

            <el-dialog
                    :modal-append-to-body='false'
                    :title="recordListData.title"
                    :visible.sync="isRecordList"
                    width="50%"
                    :before-close="recordListClose">
                <div class="record-list">
                    <el-tabs v-model="activeName" @tab-click="recordClick">
                        <el-tab-pane label="左选项" name="0">
                            <div class="record-card">
                                <div class="z-head">
                                    <span class="label">总金额</span>
                                    <span class="value">{{quizRecordCtoModel.totalMoney}}</span>
                                    <span class="label">总单数</span>
                                    <span class="value">{{quizRecordCtoModel.totalNum}}</span>
                                </div>
                                <el-table :data="quizRecordCtoModelList" border style="width: 100%;" height="400">
                                    <el-table-column type="index" :index="getRecordIndex" width="60"></el-table-column>

                                    <el-table-column property="quizNo" label="订单编号" width="140"></el-table-column>
                                    <el-table-column label="购买时间" width="160">
                                        <template slot-scope="scope">
                                            {{scope.row.createTime | timestampToTime1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column property="phoneNumer" label="购买账号" width="100"></el-table-column>
                                    <el-table-column property="odds" label="购买时赔率" width="100"></el-table-column>
                                    <el-table-column property="money" label="购买金额"></el-table-column>
                                </el-table>
                                <el-pagination
                                        @current-change="recordList('0')"
                                        :current-page.sync="recordPageNum"
                                        :page-size="pageSize"
                                        layout="prev, pager, next, jumper"
                                        :total="recordTotalNum">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="右选项" name="1">
                            <div class="record-card">
                                <div class="z-head">
                                    <span class="label">总金额</span>
                                    <span class="value">{{quizRecordCtoModel.totalMoney}}</span>
                                    <span class="label">总单数</span>
                                    <span class="value">{{quizRecordCtoModel.totalNum}}</span>
                                </div>
                                <el-table :data="quizRecordCtoModelList" border style="width: 100%;" height="400">
                                    <el-table-column type="index" :index="getRecordIndex" width="60"></el-table-column>

                                    <el-table-column property="quizNo" label="订单编号" width="140"></el-table-column>
                                    <el-table-column label="购买时间" width="160">
                                        <template slot-scope="scope">
                                            {{scope.row.createTime | timestampToTime1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column property="phoneNumer" label="购买账号" width="100"></el-table-column>
                                    <el-table-column property="odds" label="购买时赔率" width="100"></el-table-column>
                                    <el-table-column property="money" label="购买金额"></el-table-column>
                                </el-table>
                                <el-pagination
                                        @current-change="recordList('1')"
                                        :current-page.sync="recordPageNum"
                                        :page-size="pageSize"
                                        layout="prev, pager, next, jumper"
                                        :total="recordTotalNum">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-dialog>


        </div>
    </div>
</template>

<script>
    import {rollingList,batchSeal,matchDetails,rollingUpdate,recordList} from "../../service/api";
    import { Message } from 'element-ui';

    export default {
        data(){
            return{
                pageSize:10,
                pageNum:1,
                matchId:'',
                boardNum:null,
                list:[],
                quizList:[],
                loading:true,
                totalNum:0,
                id:'',
                dialogVisible: false,
                dialogVisibleData:{},
                dialogVisibleResult:-1,

                isRecordList:false,
                recordListData:{},
                recordPageNum:1,
                quizRecordCtoModel:{},
                quizRecordCtoModelList:[],
                activeName:'0',
                recordTotalNum:0,
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
            getRecordIndex(){
                return (this.recordPageNum - 1) * this.pageSize +1
            },
        },
        created(){
            this.id = JSON.parse(this.$route.query.matchId)
            this.rollingList(this.id,null,this.pageNum,this.pageSize)
            this.matchDetails(this.id)
        },
        methods:{
            rollingList(matchId,boardNum,pageNum,pageSize){
                this.loading=true
                rollingList(matchId,boardNum,pageNum,pageSize).then(res=>{
                    console.log('竞猜列表',res)
                    this.loading=false
                    if(res.code==0){
                        this.quizList=res.data.rollingCtoModelList
                        this.totalNum=res.data.totalNum
                    }
                })
            },
            matchDetails(id){
                matchDetails(id).then(res=>{
                    console.log('比赛详情',res)
                    this.loading=false
                    if(res.code==0){
                        var arr=[]
                        arr.push(res.data)
                        this.list=arr
                    }
                })
            },
            batchSeal(row){
                this.$confirm('确定封盘?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    batchSeal(null,row.matchId).then(res=>{
                        console.log('手动封盘',res)
                        if(res.code==0){
                            this.matchDetails(this.id)
                            this.rollingList(this.id,null,this.pageNum,this.pageSize)
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            })
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            rollingUpdate(){
                if(this.dialogVisibleResult==0||this.dialogVisibleResult==1){

                    this.$confirm('确认判定?确定后无法修改', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        rollingUpdate(this.dialogVisibleData.betId,this.dialogVisibleData.teamaOdds,this.dialogVisibleData.teambOdds,this.dialogVisibleData.title,this.dialogVisibleResult).then(res=>{
                            console.log('手动修改注单胜负',res)
                            if(res.code==0){
                                this.dialogVisible=false
                                this.matchDetails(this.id)
                                this.rollingList(this.id,null,this.pageNum,this.pageSize)
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                })
                            }
                        })
                    }).catch(() => {
                        this.dialogVisible=false
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '请选择右/右选项'
                    })
                }

            },
            handleClose(){this.dialogVisible=false},
            recordListClose(){this.isRecordList=false},
            goBack(){this.$router.push({path:'/handicap'})},
            recordClick(){
                this.recordPageNum=1
                this.recordList(this.activeName)
            },
            recordList(quizType){
                recordList(null,null,null,quizType,null,null,null,this.recordPageNum,this.pageSize).then(res=>{
                    console.log('查询用户注单列表',res)
                    if(res.code==0){
                        this.quizRecordCtoModel=res.data
                        this.quizRecordCtoModelList=res.data.quizRecordCtoModelList
                        this.recordTotalNum=res.data.totalNum
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .quiz-details{
        box-sizing: border-box;
        padding: 10px 20px;
        .status-red{
            color:#ff2424 ;
        }
        .back{
            margin-bottom: 20px;
        }
        .top{
            margin-bottom: 20px;
            .details{
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                .l{
                    width: 40%;
                    height: 100%;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
                    .name{
                        margin-left: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                .c{
                    width: 20%;
                    height: 100%;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    text-align: center;
                }
                .r{
                    display: flex;
                    align-items: center;
                    width: 40%;
                    height: 100%;
                    box-sizing: border-box;
                    flex-direction: row-reverse;
                    padding-right: 10px;
                    .name{
                        margin-right: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                .logo-img{
                    flex-shrink: 0;
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    display: block;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .quiz-list{
            .details{
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                .l{
                    width: 45%;
                    height: 100%;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    .name{
                        margin-left: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .odds{
                        width: 60px;
                        flex-shrink: 0;
                    }
                }
                .c{
                    width: 10%;
                }
                .r{
                    display: flex;
                    align-items: center;
                    width: 45%;
                    height: 100%;
                    box-sizing: border-box;
                    /*flex-direction: row-reverse;*/
                    .name{
                        margin-right: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .odds{
                        width: 60px;
                        flex-shrink: 0;
                    }
                }
            }
        }
        .manual-result{
            .name{margin-bottom: 20px}
        }
        .record-card{
            .z-head{
                margin-bottom: 25px;
                margin-top: 10px;
                .label{
                    font-size: 21px;
                    margin-right: 10px;
                }
                .value{
                    font-size: 18px;
                    margin-right: 40px;
                }
            }
        }
    }
</style>