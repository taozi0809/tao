<template>
    <div class="video-list">
        <el-table :data="videoBaseCtoModelList" style="width: 100%" height="600">
            <el-table-column type="index" :index="getIndex"   width="60"></el-table-column>
            <el-table-column label="电视剧名称" min-width="200">
                <template slot-scope="scope">
                    <p>{{scope.row.videoName | isNameFilter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="是否热门">
                <template slot-scope="scope">
                    <p>{{scope.row.isRecommend | isFilter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="是否VIP" >
                <template slot-scope="scope">
                    <p>{{scope.row.isVip | isFilter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="下载次数" >
                <template slot-scope="scope">
                    <p>{{scope.row.downloadTimes | timesFilter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="播放次数" >
                <template slot-scope="scope">
                    <p>{{scope.row.playTimes | timesFilter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="收藏次数" >
                <template slot-scope="scope">
                    <p>{{scope.row.likeTimes | timesFilter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="点击率" >
                <template slot-scope="scope">
                    <p>{{scope.row.clickTimes | timesFilter}}</p>
                </template>
            </el-table-column>

            <!--<el-table-column prop="scores" label="分数" ></el-table-column>-->
            <el-table-column prop="frameRate" label="帧率" ></el-table-column>
            <el-table-column prop="limitLevel" label="限制等级" ></el-table-column>
            <el-table-column label="更新时间" min-width="150">
                <template slot-scope="scope">
                    <p>{{scope.row.updateTime | timestampToTime}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleToDetails(scope.row)">详情</el-button>
                    <el-button size="mini" type="primary" @click="handleAddVideo(scope.row)">添加子集</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination  background layout="total, prev, pager, next, jumper" :total="countNum" :page-size="pageSize"
                        :current-page.sync="currentPage" @current-change="handleChangePage"></el-pagination>
    </div>
</template>
<script>
    import {videoBaseList,videoBaseDelete} from "../../service/api";
    import { Message} from 'element-ui';
    import { MessageBox } from 'element-ui';
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                currentPage:1,
                pageSize:50,
            }
        },
        computed:{
            ...mapState(['videoBaseCtoModelList','countNum']),
            getIndex(){
                return (this.currentPage - 1) * this.pageSize +1
            },

        },
        created:function(){
            this.getVideoBaseList(null,this.currentPage)
        },
        methods:{
            ...mapMutations(['VIDEOBASECTOMODELLIST','VIDEODETAILS','COUNTNUM']),
            handleAddVideo(item){
                this.$router.push({
                    name:'addTvs',
                    params:{
                        id:item.id,
                    },
                })
            },
            getVideoBaseList(videoName,currentPage){
                videoBaseList('DRAMA',videoName,currentPage,this.pageSize).then(res=>{
                    console.log('电视剧基本信息',res)
                    if(res.code==='0'){
                        this.VIDEOBASECTOMODELLIST(res.data.videoBaseCtoModelList)
                        this.COUNTNUM(res.data.countNum)
                    }
                })
            },
            handleDelete(id){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    videoBaseDelete(id).then(res=>{
                        console.log('删除视频',res)
                        if(res.code==='0'){
                            this.getVideoBaseList(null,this.currentPage)
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            handleToDetails(e){
                this.$router.push({
                    name:'tvDetails',
                    params:{
                        id:e.id
                    },
                })
            },
            handleChangePage(){
                this.getVideoBaseList(this.videoName,this.currentPage)
            },
        }
    }
</script>
<style lang="scss" scoped>
    .video-list{
        width: 100%;
        position: absolute;
        top:100px;
        bottom: 0;
        left:0;
        box-sizing: border-box;
        padding:0 10px;

    }
</style>