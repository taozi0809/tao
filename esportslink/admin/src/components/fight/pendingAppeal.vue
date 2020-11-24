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
<!--                <template slot-scope="scope">-->
<!--                    {{scope.row.originateUserInfoDtoModel===null?'暂无信息':scope.row.originateUserInfoDtoModel.phoneNumber===null?'暂无信息':scope.row.originateUserInfoDtoModel.phoneNumber}} <br>-->
<!--                    {{scope.row.joinUserInfoDtoModel===null?'暂无信息':scope.row.joinUserInfoDtoModel.phoneNumber===null?'暂无信息':scope.row.joinUserInfoDtoModel.phoneNumber}}-->
<!--                </template>-->
                <template slot-scope="scope">
                    <div class="cell-phonenumber">
                        <div class="phone1">
                            {{scope.row.originateUserInfoDtoModel.phoneNumber}}
                            <span class="wl" :class="scope.row.result==0?'wl-red':''" v-if="scope.row.result==0||scope.row.result==1">{{scope.row.result==0?'胜':'负'}}</span>
                        </div>
                        <div class="phone2">
                            {{scope.row.joinUserInfoDtoModel===null?'暂无信息':scope.row.joinUserInfoDtoModel.phoneNumber}}
                            <span class="wl" :class="scope.row.result==1?'wl-red':''" v-if="scope.row.result==0||scope.row.result==1">{{scope.row.result==1?'胜':'负'}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="申诉剩余时间" width="200">
                <template slot-scope="scope">
                    {{scope.row.expireTime | timestampToTime2}}
                </template>
            </el-table-column>
            <el-table-column property="" label="赛果">
                <template slot-scope="scope">
                    {{scope.row.playeraResult==0?'已上传':'未上传'}} <br>
                    {{scope.row.playerbResult==0?'已上传':'未上传'}}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showJudgment(scope.row)">查看详情</el-button>
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
                            <el-button :type="judgment.result==0?'primary':''" size="small" style="width: 100%;">获胜</el-button>
                        </div>
                    </div>
                    <div class="r">
                        <div class="phoneNumber">{{judgment.joinUserInfoDtoModel===null?'暂无信息':judgment.joinUserInfoDtoModel.phoneNumber}}</div>
                        <div class="id">游戏ID：{{judgment.joinUserInfoDtoModel===null?'暂无信息':judgment.joinUserInfoDtoModel.nickName}}</div>
                        <div class="result">
                            <img :src="judgment.joinResultListCtoModel.userPlatformResultCtoModelList.length==0
                            ?'':judgment.joinResultListCtoModel.userPlatformResultCtoModelList[0].photoUrl" alt="">
                        </div>
                        <div class="btn">
                            <el-button :type="judgment.result==1?'primary':''" size="small" style="width: 100%;">获胜</el-button>
                        </div>
                    </div>
                </div>
            </div>

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
                status:5,
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
            ...mapMutations(['FIGHTFIRSTBNUM']),
            platformList(status,result,gameName,pageNum,pageSize){
                this.loading=true
                this.FIGHTFIRSTBNUM('')
                platformList(status,result,gameName,pageNum,pageSize).then(res=>{
                    console.log('待申诉',res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.data.userPlatformCtoModelList
                        this.totalNum=res.data.totalNum
                        this.FIGHTFIRSTBNUM(res.data.totalNum)
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
        .cell-phonenumber{
            .phone1,.phone2{
                display: flex;
                align-items: center;
                .wl{
                    margin-left: 10px;
                    width: 20px;
                    height: 20px;
                    display: block;
                    background: #575C61;
                    color: #fff;
                    border-radius: 50%;
                    overflow: hidden;
                    text-align: center;
                    line-height: 20px;
                }
                .wl-red{
                    background: #FF2424;
                }
            }

        }
    }
</style>