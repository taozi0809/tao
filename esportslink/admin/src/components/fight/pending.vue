<template>
    <div class="list">
        <el-table :data="list" border style="width: 100%" v-loading="loading"
                  element-loading-text="加载中" element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0.6)" height="700">
            <el-table-column type="index" :index="getIndex" width="60"></el-table-column>

            <el-table-column property="platformNo" label="约站编号" width="180"></el-table-column>
            <el-table-column property="gameName" label="约战游戏类型" width="180"></el-table-column>
            <el-table-column property="serverName" label="大区" width="180"></el-table-column>
            <el-table-column label="创建时间-结束时间" width="300">
                <template slot-scope="scope">
                    {{scope.row.createTime | timestampToTime1}} - {{scope.row.endTime | timestampToTime1}}
                </template>
            </el-table-column>
            <el-table-column property="name" label="玩家" width="180">
                <template slot-scope="scope">
                    {{scope.row.originateUserInfoDtoModel===null?'暂无信息':scope.row.originateUserInfoDtoModel.phoneNumber===null?'暂无信息':scope.row.originateUserInfoDtoModel.phoneNumber}} <br>
                    {{scope.row.joinUserInfoDtoModel===null?'暂无信息':scope.row.joinUserInfoDtoModel.phoneNumber===null?'暂无信息':scope.row.joinUserInfoDtoModel.phoneNumber}}
                </template>
            </el-table-column>
            <el-table-column property="" label="赛果" width="180">
                <template slot-scope="scope">
                    {{scope.row.playeraResult==0?'已上传':'未上传'}} <br>
                    {{scope.row.playerbResult==0?'已上传':'未上传'}}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showJudgment(scope.row)">判定胜负</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="platformList(status,null,null,pageNum,pageSize)"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalNum">
        </el-pagination>

        <el-dialog
                title="胜负判定"
                :visible.sync="isJudgment"
                width="600"
                :modal-append-to-body="false"
                :before-close="judgmentClose">
            <div class="judgment">
                <div class="top">
                    <div class="judgment-name">
                        <div class="name">房间名称：</div>
                        <div class="des">{{judgment.title}}</div>
                    </div>
                    <div class="judgment-des">
                        <div class="name">房间描述：</div>
                        <div class="des">{{judgment.remark}}</div>
                    </div>
                </div>
                <div class="content">
                    <div class="l">
                        <div class="phoneNumber">{{judgment.originateUserInfoDtoModel.phoneNumber}}</div>
                        <div class="id">游戏ID：{{judgment.originateUserInfoDtoModel.nickName}}</div>
                        <div class="result">
                            <img :src="judgment.originateResultListCtoModel.userPlatformResultCtoModelList.length==0
                            ?'':judgment.originateResultListCtoModel.userPlatformResultCtoModelList[0].photoUrl" alt="">
                        </div>
                        <div class="btn">
                            <el-button size="small" style="width: 100%;" v-if="judgment.result!=0" @click="judgment.result=0">获胜</el-button>
                            <el-button type="primary" size="small" style="width: 100%;" v-if="judgment.result==0" @click="judgment.result=0">获胜</el-button>
                        </div>
                        <div class="radio"><el-checkbox v-model="judgment.playeraResult">上传错误或未上传赛果</el-checkbox></div>
                    </div>
                    <div class="r">
                        <div class="phoneNumber">{{judgment.joinUserInfoDtoModel===null?'暂无信息':judgment.joinUserInfoDtoModel.phoneNumber}}</div>
                        <div class="id">游戏ID：{{judgment.joinUserInfoDtoModel===null?'暂无信息':judgment.joinUserInfoDtoModel.nickName}}</div>
                        <div class="result">
                            <img :src="judgment.joinResultListCtoModel.userPlatformResultCtoModelList.length==0
                            ?'':judgment.joinResultListCtoModel.userPlatformResultCtoModelList[0].photoUrl" alt="">
                        </div>
                        <div class="btn">
                            <el-button size="small" style="width: 100%;" v-if="judgment.result!=1" @click="judgment.result=1">获胜</el-button>
                            <el-button type="primary" size="small" style="width: 100%;" v-if="judgment.result==1" @click="judgment.result=1">获胜</el-button>
                        </div>
                        <div class="radio"><el-checkbox v-model="judgment.playerbResult">上传错误或未上传赛果</el-checkbox></div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer footer">
                <el-button size="small" plain type="warning" @click="platformDetermine">判定胜负</el-button>
                <el-button size="small" plain type="warning" @click="platformDetermineNo">无法判断</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {platformList,platformDetails,platformDetermine} from "../../service/api";
    import {mapState,mapMutations} from 'vuex'

    export default{
        data(){
            return{
                loading:true,
                totalNum:0,
                pageNum:1,
                pageSize:10,
                list:[],
                status:4,
                judgment:{
                    originateResultListCtoModel:{
                        userPlatformResultCtoModelList:[{photoUrl:'',}]
                    },
                    joinResultListCtoModel:{
                        userPlatformResultCtoModelList:[{photoUrl:'',}]
                    },
                    originateUserInfoDtoModel:{
                        phoneNumber:'',
                        nickName:'',
                    },
                    joinUserInfoDtoModel:{
                        phoneNumber:'',
                        nickName:'',
                        userPlatformResultCtoModelList:[{photoUrl:'',}]
                    },
                },
                isJudgment:false,
                win:'',
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created(){
            this.platformList(this.status,null,null,this.pageNum,this.pageSize)
        },
        methods:{
            ...mapMutations(['FIGHTFIRSTNUM']),
            platformList(status,result,gameName,pageNum,pageSize){
                this.loading=true
                this.FIGHTFIRSTNUM('')
                platformList(status,result,gameName,pageNum,pageSize).then(res=>{
                    console.log('待处理',res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.data.userPlatformCtoModelList
                        this.totalNum=res.data.totalNum
                        this.FIGHTFIRSTNUM(res.data.totalNum)
                    }
                })
            },
            showJudgment(row){
                this.isJudgment=true
                platformDetails(row.id).then(res=>{
                    console.log('对战详情',res)
                    if(res.code==0){
                        this.judgment=res.data
                    }
                })
            },
            platformDetermine(){
                let result=this.judgment.result
                if(result==0||result==1){
                    let resultType=''
                    let ta=''
                    let tb=''
                    this.judgment.playeraResult==0||this.judgment.playeraResult==1?ta=this.judgment.playeraResult:this.judgment.playeraResult?ta=1:ta=0
                    this.judgment.playerbResult==0||this.judgment.playerbResult==1?tb=this.judgment.playerbResult:this.judgment.playerbResult?tb=1:tb=0
                    if(ta==0&&tb==0){resultType=0}
                    if(ta==0&&tb==1){resultType=2}
                    if(ta==1&&tb==0){resultType=1}
                    if(ta==1&&tb==1){resultType=3}
                    platformDetermine(this.judgment.id,result,resultType).then(res=>{
                        console.log('判断对战胜负',res)
                        if(res.code==0){
                            this.isJudgment=false
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.platformList(this.status,null,null,this.pageNum,this.pageSize)
                        }else{
                            this.$message({
                                type: 'error',
                                message:res.message
                            })
                        }
                    })
                }else{
                        this.$message({
                            type: 'error',
                            message:'请选择获胜方'
                        })
                    return;
                }






            },
            platformDetermineNo(){
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    platformDetermine(this.judgment.id,2,3).then(res=>{
                        console.log('判断对战胜负',res)
                        this.isJudgment=false
                        if(res.code==0){
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.platformList(this.status,null,null,this.pageNum,this.pageSize)
                        }else{
                            this.$message({
                                type: 'error',
                                message:res.message
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                    this.isJudgment=false
                });
            },
            judgmentClose(){this.isJudgment=false}
        }
    }
</script>

<style lang="scss" scoped>
    .judgment{
        width: 100%;
        max-height: 633px;
        .top{
            box-sizing: border-box;
            overflow: hidden;
            max-height: 140px;
            .judgment-name{
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 20px;
                display:flex;
                align-items: center;
                .name{
                    color: #333;
                    font-size: 14px;
                }
                .des{
                    color: #333;
                    font-size: 14px;
                }
            }
            .judgment-des{
                width: 100%;
                box-sizing: border-box;
                .name{
                    color: #333;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                .des{
                    color: #333;
                    font-size: 14px;
                    line-height: 1.5;
                }
            }
        }
        .content{
            display: flex;
            align-items: center;
            border-top: 1px solid rgba(0,0,0,.1);
            margin-top: 20px;
            padding-top: 10px;
            .l,.r{
                width: 50%;
                box-sizing: border-box;
                .phoneNumber,.id{
                    color: #333;
                    font-size: 14px;
                    margin-bottom: 10px;
                    height: 20px;
                    line-height: 20px;
                }
                .result{
                    width: 260px;
                    height: 146px;
                    overflow: hidden;
                    box-sizing: border-box;
                    border: 1px solid red;
                    margin-bottom: 20px;
                    img{
                        width: 100%;
                    }

                }
                .btn{
                    width: 260px;
                    margin-bottom: 20px;
                }
                .radio{

                }

            }
            .r{}
        }
    }
</style>

<style lang="scss">
    .list{
        .footer{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>