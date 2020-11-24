<template>
    <div class="videoTop">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="list">
            <el-table :data="videoBaseCtoModelList" style="width: 100%" height="600">
                <el-table-column type="index" :index="getIndex"  width="60"></el-table-column>
                <el-table-column label="电影名称" min-width="200">
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
                <el-table-column label="操作" fixed="right" min-width="210">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="videoBaseTopping(scope.row.id,0)">置顶</el-button>
                        <el-button size="mini" type="danger" @click="videoBaseTopping(scope.row.id,1)">取消置顶</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination  background layout="total, prev, pager, next, jumper" :total="countNum" :page-size="pageSize"
                            :current-page.sync="currentPage" @current-change="handleChangePage"></el-pagination>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {videoBaseTopping,videoBaseOrderTopping} from "../../service/api";
    import { Message} from 'element-ui';


    export default {
        components:{Breadcrumb,},
        data(){
            return{
                currentPage:1,
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/videoManage',
                        name:'电影管理'
                    },
                    {
                        path:'/videoTop',
                        name:'电影置顶'
                    },
                ],
                videoBaseCtoModelList:[],
                countNum:0,
                pageSize:50,
            }
        },
        computed:{
            getIndex(){
                return (this.currentPage - 1) * this.pageSize +1
            },

        },
        created:function(){
            this.getVideoBaseOrderTopping(this.currentPage)
        },
        methods:{
            handleChangePage(){
                this.getVideoBaseOrderTopping(this.currentPage)
            },
            getVideoBaseOrderTopping(currentPage){
                videoBaseOrderTopping('MOVIE',currentPage,this.pageSize).then(res=>{
                    console.log('置顶列表',res)
                    if(res.code==0){
                        this.videoBaseCtoModelList=res.data.videoBaseCtoModelList
                        this.countNum=res.data.countNum
                    }
                })
            },
            videoBaseTopping(id,num){
                videoBaseTopping(id,num).then(res=>{
                    console.log('置顶/取消置顶',res)
                    if(res.code==0){
                        Message({message:'操作成功', type: 'success', duration:'1500'})
                        this.getVideoBaseOrderTopping(this.currentPage)
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
            }
        }
    }
</script>


