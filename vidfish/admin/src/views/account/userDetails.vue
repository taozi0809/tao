<template>
    <div class="userDetails">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <section class="tabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="点击记录" name="first">
                    <div class="form-box">
                        <el-table :data="clickList" style="width: 100%" height="100%" @filter-change="clickFilterChange">
                            <el-table-column type="index" :index="clickIndex" width="80"></el-table-column>
                            <el-table-column prop="videoName" label="视频名称" width="200"></el-table-column>
                            <el-table-column label="集数"  width="80">
                                <template slot-scope="scope">
                                    <p>{{scope.row.episode+1}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="点击时间"  width="150">
                                <template slot-scope="scope">
                                    <p>{{scope.row.createTime | timestampToTime}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination  background layout="prev, pager, next" :total="clickCountNum" class="zdy-pagination" :current-page.sync="clickCurrentPage" @current-change="clickChangePage"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="播放记录" name="second">
                    <div class="form-box">
                        <el-table :data="playList" style="width: 100%" height="100%" @filter-change="playFilterChange">
                            <el-table-column type="index" :index="playIndex" width="80"></el-table-column>
                            <el-table-column prop="videoName" label="视频名称" width="200"></el-table-column>
                            <el-table-column label="集数"  width="80">
                                <template slot-scope="scope">
                                    <p>{{scope.row.episode}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="点击时间"  width="150">
                                <template slot-scope="scope">
                                    <p>{{scope.row.createTime | timestampToTime}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination  background layout="prev, pager, next" :total="playCountNum" class="zdy-pagination" :current-page.sync="playCurrentPage" @current-change="playChangePage"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="购买记录" name="third">
                    <div class="form-box">
                        <el-table :data="payList" style="width: 100%" height="100%" @filter-change="payFilterChange">
                            <el-table-column type="index" :index="payIndex" width="80"></el-table-column>
                            <el-table-column prop="paymentId" label="订单号" width="200"></el-table-column>
                            <el-table-column label="卡别"  width="80">
                                <template slot-scope="scope">
                                    <p>{{scope.row.productId | productIdToName}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付时间"  width="150">
                                <template slot-scope="scope">
                                    <p>{{scope.row.createTime | timestampToTime}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态"  width="150">
                                <template slot-scope="scope">
                                    <p>{{scope.row.status | payStatusToName}}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination  background layout="prev, pager, next" :total="payCountNum" class="zdy-pagination" :current-page.sync="payCurrentPage" @current-change="payChangePage"></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {clickRecordList,playbackRecords,detrimentList} from "../../service/api";

    export default {
        components:{Breadcrumb},
        data(){
            return{
                activeName: 'first',
                clickCurrentPage:1,
                clickCountNum:0,
                playCurrentPage:1,
                playCountNum:0,
                payCurrentPage:1,
                payCountNum:0,

                clickList:[],
                playList:[],
                payList:[],
            }
        },
        computed:{
            clickIndex(){
                return (this.clickCurrentPage - 1) * 10 +1
            },
            playIndex(){
                return (this.playCurrentPage - 1) * 10 +1
            },
            payIndex(){
                return (this.payCurrentPage - 1) * 10 +1
            },
        },
        created:function(){
            this.id = this.$route.params.id
            this.idCode = this.$route.params.idCode

            this.breadcrumb=[
                {
                    path:'/index',
                    name:'首页'
                },
                {
                    path:'/userManage',
                    name:'用户管理'
                },
                {
                    path:`/userDetails/${this.id}`,
                    name:'用户详情'
                },
            ]
            clickRecordList(this.id).then(res=>{
                console.log('点击记录：',res)
                if(res.code==0){
                    this.clickList = res.data.clickRecordCtoModelList
                }

            })
            playbackRecords(this.id).then(res=>{
                console.log('播放记录：',res)
                if(res.code==0){
                    this.playList = res.data.playBackRecordCtoModelList
                }
            })
            detrimentList(this.idCode).then(res=>{
                console.log('购买记录：',res)
                if(res.code==0){
                    this.payList = res.data.detrimentRecordCtoModelList
                }
            })
        },
        methods:{
            clickFilterChange(){},
            clickChangePage(){},
            playFilterChange(){},
            playChangePage(){},
            payFilterChange(){},
            payChangePage(){},
        },

    }
</script>
<style lang="scss" scoped>
    .tabs{
        padding:0 10px;
        box-sizing: border-box;
        width: 100%;
    }
    .el-table__body-wrapper{
        position: relative;
    }
    .form-box{
        width: 100%;
        height: 600px;
        /*border: 1px solid red;*/
    }
</style>