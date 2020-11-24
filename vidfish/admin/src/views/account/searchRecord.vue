<template>
    <div class="account">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="head">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input v-model="inputUserId" placeholder="请输入用户id" clearable @input="handleUserId">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="form-box">
            <el-table :data="userList" style="width: 100%" height="600">
                <el-table-column type="index" :index="getIndex" width="100"></el-table-column>
                <!--<el-table-column prop="userId" label="用户id" min-width="100"></el-table-column>-->
                <el-table-column prop="area" label="国家" min-width="100"></el-table-column>
                <el-table-column prop="content" label="内容" min-width="250"></el-table-column>
                <el-table-column prop="count" label="次数" min-width="100"></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="250"></el-table-column>

                <el-table-column label="时间" min-width="140">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
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
    import {searchRecordList} from "../../service/api";


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
                        path:'/userManage',
                        name:'搜索记录'
                    },
                ],
                userList:[],
                inputUserId:'',

                currentPage:1,
                countNum:0,
                userList1:[],
                pageSize:50,
            }
        },
        computed:{
            getIndex(){
                return (this.currentPage - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.getSearchRecordList(null,this.currentPage,this.pageSize)
        },
        methods:{
            getSearchRecordList(userId,pageNum,pageSize){
                searchRecordList(userId,pageNum,pageSize).then(res=>{
                    console.log('搜索列表',res)
                    if(res.code==='0'){
                        this.countNum = res.data.totalNum
                        this.userList = res.data.searchRecordCtoModelList
                        this.userList1 = res.data.searchRecordCtoModelList

                    }
                })
            },
            handleUserId(){
                this.getSearchRecordList(this.inputUserId,null,null)
            },

            handleChangePage(){
                this.getSearchRecordList(null,this.currentPage,this.pageSize)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .account{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .head{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding-left: 10px;
        /*box-sizing: border-box;*/
        /*border: 1px solid red;*/
    }
    .form-box{
        padding:0 10px;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        top:100px;
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
</style>