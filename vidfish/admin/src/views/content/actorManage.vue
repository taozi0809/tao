<template>
    <div class="addActor">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="actor-head">
            <el-button type="primary" class="add" @click="handleAddActor">新增</el-button>
            <div class="box">
                <el-input v-model="actorName" placeholder="请输入关键词搜索" clearable @input="handleChange">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>

        <div class="actor-list">
            <el-table :data="actorList" style="width: 100%" height="600" id="table">
                <el-table-column  type="index" :index="getIndex" width="50"></el-table-column>
                <el-table-column label="演员头像" width="100">
                    <template slot-scope="scope">
                        <span class="head-img"><img :src="scope.row.photoUrl" alt=""></span>
                    </template>
                </el-table-column>
                <el-table-column prop="lang" label="语言环境" width="100"></el-table-column>
                <el-table-column prop="actorName" label="演员名称" width="150"></el-table-column>
                <el-table-column prop="actorDesc" label="演员描述" ></el-table-column>
                <!--<el-table-column prop="actorArea" label="演员所属国家" width="150"></el-table-column>-->
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleActor(scope.row)">详情</el-button>
                        <el-button size="mini" type="danger" @click="handleActorDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination  background layout="total, prev, pager, next, jumper" :total="countNum" :page-size="pageSize"
                            :current-page.sync="pageSum" @current-change="handleChangePage"></el-pagination>
        </div>


    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message,MessageBox} from 'element-ui';
    import {performerList,performerDelete} from "../../service/api";

    export default {
        components:{Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/actorManage',
                        name:'内容管理'
                    },
                    {
                        path:'/actorManage',
                        name:'演员管理'
                    },
                ],
                actorList: [],
                actorName:'',
                pageSum:1,
                pageSize:50,
                countNum:0,
            }
        },
        computed:{
            getIndex(){
                return (this.pageSum - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.getPerformerList(null,null,'0',this.pageSum,this.pageSize)
        },
        methods:{
            getPerformerList(actorName,lang,flag,pageSum,pageSize){
                performerList(actorName,lang,flag,pageSum,pageSize).then(res=>{
                    console.log('演员列表',res)
                    if(res.code==='0'){
                        this.countNum = res.data.countNum
                        let arr = res.data.performerCtoModelList
                        let arr1 = []
                        for(let i in arr){
                            arr1.push(arr[i])
                        }
                        this.actorList = arr1
                    }
                })
            },
            handleAddActor(){
                this.$router.push('/addActor')
            },
            handleChange(){
                if(this.actorName==''||this.actorName==undefined||this.actorName==undefined){this.actorName=null}

                this.getPerformerList(this.actorName,null,'1')
            },
            handleActor(e){
                this.$router.push({
                    path: '/actorDetails',
                    query: {
                        id: e.id,
                        lang:e.lang
                    }
                })
            },
            handleActorDelete(e){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    performerDelete(e.id).then(res=>{
                        console.log('删除演员',res)
                        if(res.code==='0'){
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                            this.getPerformerList(null,null,'1')
                        }else{
                            Message({
                                message:res.message,
                                type: 'success',
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
            handleChangePage(){
                this.getPerformerList(null,null,'0',this.pageSum,this.pageSize)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .actor-head{
        width: 100%;
        height: 60px;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .head-img{
        width: 30px;
        display: block;
        height: 30px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .actor-list{
        width: 100%;
        position: absolute;
        top:100px;
        bottom: 100px;
        left:0;
        box-sizing: border-box;
        padding:0 10px;

    }
</style>
<style lang="scss">
    .actor-head{
        .add{
            width:150px;
        }
        .box{
            .el-input{
                width: 30%;
                min-width: 300px;
            }
            .search{
                margin-left: 20px;
            }
        }
    }
    .el-table{
        width: 100%;
        height: 100%;
    }
    #table{
        .cell{
            overflow: hidden ;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
</style>