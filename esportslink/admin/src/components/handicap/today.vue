<template>
    <div class="match-list">
        <el-table :data="list" border style="width: 100%" v-loading="loading"
                  element-loading-text="加载中" element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0.6)" height="700"
                  @row-click="showDetails">
            <el-table-column type="index" :index="getIndex" width="60"></el-table-column>
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
            <el-table-column property="rollingStatDtoModel.sealTotal" label="已封盘"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
<!--                    <el-button type="text" size="small" @click="batchSeal(scope.row)">手动封盘</el-button>-->
                    <el-button type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="matchList(type,pageNum,pageSize)"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalNum">
        </el-pagination>
    </div>
</template>

<script>
    import {matchList,batchSeal} from "../../service/api";
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                loading:true,
                pageNum:1,
                pageSize:10,
                list:[],
                totalNum:0,
                type:0,
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created() {
            this.matchList(this.type,this.pageNum,this.pageSize)
        },
        methods:{
            matchList(type,pageNum,pageSize){
                this.loading=true
                matchList(type,pageNum,pageSize).then(res=>{
                    console.log('今天',res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.data.matchScoreCtoModelList
                        this.totalNum=res.data.totalNum
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
                        console.log('封盘',res)
                        if(res.code==0){
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
            showDetails(row){
                this.$router.push({
                    path: '/handicap_details',
                    query: {
                        matchId:row.matchId,
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
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
</style>
