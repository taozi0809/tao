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
                <el-table-column property="rollingStatDtoModel.sealTotal" label="已封盘" width="80"></el-table-column>
                <el-table-column property="rollingStatDtoModel.quizMoneyTotal" label="总金额" width="80"></el-table-column>
                <el-table-column property="rollingStatDtoModel.quizNum" label="总单数"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="batchSeal(scope.row,'手动封盘')">手动封盘</el-button>
                    </template>
                </el-table-column>
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
                <el-table-column property="name" label="状态" width="100">
                    <template slot-scope="scope">
                        {{scope.row.status | statusToName}}
                    </template>
                </el-table-column>
                <el-table-column property="name" label="是否手动封盘">
                    <template slot-scope="scope">
                        <div style="color: #E6A23C;" v-if="scope.row.isManual==1">否</div>
                        <div style="color: #67C23A;" v-if="scope.row.isManual==0">是</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="batchSeal(scope.row,'封盘')">封盘</el-button>
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
        </div>
    </div>
</template>

<script>
    import {rollingList,batchSeal,matchDetails} from "../../service/api";
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
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
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
            batchSeal(row,type){
                this.$confirm('确定封盘?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(type=='手动封盘'){
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
                    }
                    if(type=='封盘'){
                        batchSeal(row.betId,null).then(res=>{
                            console.log('封盘',res)
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
                    }


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            goBack(){this.$router.push({path:'/handicap'})},
        }
    }
</script>

<style lang="scss" scoped>
    .quiz-details{
        box-sizing: border-box;
        padding: 10px 20px;
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
    }


</style>

<!--<style lang="scss">-->
<!--    .quiz-details{-->
<!--        .has-gutter{-->
<!--            .cell{-->
<!--                text-align: center;-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->